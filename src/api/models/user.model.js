import mongoose from 'mongoose';
import { CarSchema} from './car.model.js';
const {Schema} = mongoose;
const UserSchema = new Schema({
    firstName : {
        type : String , 
        required : true , 
        minlenght : 2 
    }, 
    lastName : {
        type : String , 
        required : true , 
        minlenght : 2 
    }, 
    password : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    isAimin : {
        type : Boolean , 
        default : false, 
    },
    car : CarSchema,
    rentedCars : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Car",
        },
    ]
},{timestamps: true});
const User = mongoose.model('User', UserSchema);
export default User;