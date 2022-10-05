import { Car , Genre } from "../models/index.js";

const carControllers = {
    // [Get]/car
    index : async (req, res, next) => {
        try {
            const cars = await Car.find({}).populate('genre','name');
            res.status(200).json(cars);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    // [Get]/car/create
    create : async (req, res, next) => {
        try {
            const newCar = await new  Car(req.body);
            const saveCar = await newCar.save();
            if(req.body.genre){
                const genre = await Genre.findById(req.body.genre);
                await genre.updateOne({$push : {cars : saveCar._id}})
            }
            res.status(201).json(saveCar);
        } catch (error) {
            res.status(422).json(error.message);
        }
    },
    // [Get]/car/:slug
    show : async (req, res, next) => {
        try {
            const car = await Car.findOne({_id:req.params.id}).populate('genre','name');
            res.status(201).json(car);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
}
export default carControllers;
