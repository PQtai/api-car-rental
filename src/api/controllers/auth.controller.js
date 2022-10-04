import { User } from "../models/index.js";

const authControllers = {
    // [Get]/auth
    index : async (req, res, next) => {
        try {
            const users = await User.find({});
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    //[Post] /auth/register
    register : async (req, res, next) => {
        try {
            const user = await User.create(req.body);
            //save to DB
            user.save()
                .then(user => res.status(200).json(user))
        } catch (error) {
            res.status(422).json(error);
        }
    },
    //[Post] /auth/login
    login : async(req, res, next) => {
        
    }
}
export default authControllers;
