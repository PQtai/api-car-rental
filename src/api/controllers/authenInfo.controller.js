import { User, AuthenInfo } from "../models/index.js";

const authenInfoControllers = {
     // [Get]/authenInfo
    index : async (req, res, next) => {
        try {
            const authenInfos = await AuthenInfo.find({});
            res.status(200).json(authenInfos);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    // [Post]/authenInfo/create
    create : async (req, res, next) => {
        try {
            const newAuthenInfo = await AuthenInfo.create(req.body);
            const saveAuthenInfo = await newAuthenInfo.save();
            if(req.user.id){
                const user = await User.findById(req.user.id);
                await user.updateOne({authenInfo : saveAuthenInfo});
            }
            res.status(201).json(saveAuthenInfo);
        } catch (error) {
            res.status(422).json(error.message);
        }
    }
}
export default authenInfoControllers;