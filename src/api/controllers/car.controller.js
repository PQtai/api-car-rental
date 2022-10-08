import { Car , Genre } from "../models/index.js";

const carControllers = {
    // [Get]/car
    index : async (req, res, next) => {
        try {
            const cars = await Car.find({}).populate('genre','label');
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
    // [Get]/car/:id
    show : async (req, res, next) => {
        try {
            const car = await Car.findOne({_id:req.params.id}).populate('genre','label');
            res.status(201).json(car);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    // [delete]/car/:id
    delete : async (req, res, next) => {
        try {
            await Car.findByIdAndDelete({_id:req.params.id});
            res.status(201).json("Delete successfully");
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    //// [update]car/:id/edit
    update : async (req, res, next) => {
        try {
           const updateCar =  await Car.findOneAndUpdate({_id:req.params.id},req.body,{
                new: true
              });
            res.status(201).json(updateCar);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
}
export default carControllers;
