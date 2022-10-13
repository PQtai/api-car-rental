import { User } from "../models/index.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const refreshTokens = [];
const authControllers = {
    encryption : async (password ) => {
        const saltRounds = await bcrypt.genSalt(10);
        return await bcrypt.hash(password ,saltRounds);
    },
    //Vẫn chưa xử lý chỗ refreshToken khi bị đánh cắp hoặc khi người dùng đăng xuất thì
    //phải xoá refreshToken khỏi dữ liệu không còn sử dụng được nữa Tìm hiểu thằng Redis
    //[Post] /auth/register
    register : async (req, res, next) => {
        try {
            // const saltRounds = await bcrypt.genSalt(10);
            const hashed = await authControllers.encryption(req.body.password);
            const user = await User.create({
                ...req.body,
                password: hashed,
            });
            user.save();
            //login luôn tại đây
            authControllers.login(req, res, next);
        } catch (error) {
            res.status(422).json(error);
        }
    },
    //generate access Token
    generateAccessToken: (user)=>{
        return jwt.sign(
            {
                id : user._id,
                isAdmin : user.isAdmin
            },
            process.env.JWT_ACCESSTOKEN_KEY,
            {expiresIn : "24h"}
        );
    },
    //generate refresh Token
    generateRefreshToken: (user)=>{
        return jwt.sign(
            {
                id : user._id,
                isAdmin : user.isAdmin
            },
            process.env.JWT_REFRESHTOKEN_KEY,
            {expiresIn : "365d"}
        );
    },
    //Store refresh token for cookie
    storeRefreshToken: (res ,refreshToken)=>{
        res.cookie('refreshToken', refreshToken,{
            httpOnly : true,
            secure : true,
            path : '/',
            sameSite : 'strict'
        })
    },
    //[Post] /auth/login
    login : async(req, res, next) => {
        try {
            const user = await User.findOne({email: req.body.email});
            if(!user){
                res.status(404).json("wrong email");
            };
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if(!validPassword){
                res.status(404).json("password is incorrect");
            }
            if(validPassword && user){
                const accessToken = authControllers.generateAccessToken(user);
                const refreshToken = authControllers.generateRefreshToken(user);
                authControllers.storeRefreshToken(res , refreshToken);
                const {password , ...needful} = user.toObject();
                res.status(200).json({...needful , accessToken});
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    reqRefreshToken: (req, res) =>{
        //take refresh token from user
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) res.status(401).json("You're not authenticated");
        if(!refreshTokens.includes(refreshToken)){
            res.status(403).json("Refresh token is not valid");
        } 
        jwt.verify(refreshToken, process.env.JWT_REFRESHTOKEN_KEY,(err , user)=>{
            if(err) res.status(403).json("Token is not valid");  
            refreshTokens = refreshTokens.filter((token)=>{
                token != refreshToken
            });
            //create new refresh token, access token
            const newAccessToken = authControllers.generateAccessToken(user);
            const newRefreshToken = authControllers.generateRefreshToken(user);

            authControllers.storeRefreshToken(res , newRefreshToken);

            res.status(200).json({accessToken: newAccessToken});
        });

    },
    //Log Out
    logout : (req , res)=>{
        try {
            res.clearCookie("refreshToken");
            refreshTokens.filter(token=> token != req.cookies.refreshToken);
            res.status(200).json("Logged out successfully")
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    // [delete]/auth/:id
    delete : async (req, res, next) => {
        try {
            await User.findByIdAndDelete({_id:req.params.id});
            res.status(201).json("Delete successfully");
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    //// [update]auth/:id/edit
    update : async (req, res, next) => {
        try {
        if(req.body.password){
            req.body.password = await authControllers.encryption(req.body.password);
        }
           const updateUser =  await User.findOneAndUpdate({_id:req.params.id},req.body,{
                new: true
              });
            const {password , ...needful} = updateUser.toObject();
            res.status(201).json({...needful});
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
}
export default authControllers;
