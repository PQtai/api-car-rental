import { Car } from "../models/index.js";

const carControllers = {
    // [Get]/car
    index : async (req, res, next) => {
        try {
            const cars = await Car.find({});
            res.status(200).json(cars);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
}
export default carControllers;
