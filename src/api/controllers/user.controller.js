import { User } from "../models/index.js";

const userControllers = {
    index : async (req, res, next)=>{
        try {
            const users = await User.find({});
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}
export default userControllers;