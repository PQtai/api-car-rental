import jwt from "jsonwebtoken";
const authMiddleware = {
    verifyToken: (req , res , next) => {
        const token = req.headers.token;
        if(token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESSTOKEN_KEY,(err , user)=>{
                if(err) {
                    res.status(403).json(err);
                    return;
                }
                req.user = user;
                next();
            })
        }else{
            res.status(401).json("You're not authenticated")
        }
    },

    //auth admin
    authIsAdmin : (req , res , next) => {
        authMiddleware.verifyToken(req , res , ()=>{
            if(req.user.id === req.params.id || req.user.isAdmin){
                next();
            }else{
                res.status(403).json("You are not authorized to do this");
            }
        });
    }
}
export default authMiddleware;