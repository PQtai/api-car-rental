import mongoose from 'mongoose';
const {Schema} = mongoose;
const RentedCarInfoSchema = new Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId , required : true , ref : 'User'},
    car_id : {type : mongoose.Schema.Types.ObjectId , required : true , ref : 'Car'},
    rentDate : {type : Date , required : true},
    returnDate : {type : Date , required : true},
    totalPrice : {type : Number , required : true},
    plight : {type : String , default : 'Vừa đặt'},
},{timestamps: true});
const RentedCarInfo = mongoose.model('RentedCarInfo', RentedCarInfoSchema);
export {RentedCarInfoSchema ,RentedCarInfo } ;