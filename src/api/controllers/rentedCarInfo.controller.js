import { RentedCarInfo,Car,User } from "../models/index.js";

const rentedCarInfoControllers = {
     // [Get]/rentedCarInfo
    index : async (req, res, next) => {
        try {
            const rentedCarInfos = await RentedCarInfo.find({}).populate('car_id').populate('user_id');
            res.status(200).json(rentedCarInfos);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    // [Post]/rentedCarInfo/create
    create : async (req, res, next) => {
        try {
            const newRentedCarInfo = await RentedCarInfo.create(req.body);
            const saveRentedCarInfo = await newRentedCarInfo.save();
            if(req.body.user_id){
                const user = await User.findById(req.body.user_id);
                await user.updateOne({$push : {rentedCars : saveRentedCarInfo._id}})
            }
            if(req.body.car_id){
                await Car.findOneAndUpdate(
                    {_id:req.body.car_id},
                    {available : false},
                    {new: true}
                );
            }
            res.status(201).json(saveRentedCarInfo);
        } catch (error) {
            res.status(422).json(error.message);
        }
    },
    // [Get]/rentedCarInfo/:id
    show : async (req, res, next) => {
        try {
            const rentedCarInfo = await RentedCarInfo.findOne({_id:req.params.id}).populate('car_id').populate('user_id');
            res.status(200).json(rentedCarInfo);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
}
export default rentedCarInfoControllers;