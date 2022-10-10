import { User } from "../models/index.js";

const userControllers = {
    index : async (req, res, next)=>{
        try {
            const users = await User.find({});
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    // [Get]/user/:id
    show : async (req, res, next) => {
        try {
            const user = await User.findOne({_id:req.params.id});
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
}
export default userControllers;