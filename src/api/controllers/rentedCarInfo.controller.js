import { RentedCarInfo,Car,User } from "../models/index.js";

const rentedCarInfoControllers = {
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
}
export default rentedCarInfoControllers;