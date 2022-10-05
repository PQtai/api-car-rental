import mongoose from 'mongoose';
import {AddressSchema} from './address.model.js';
const {Schema} = mongoose;
const CarSchema = new Schema({
    genre : {type : mongoose.Schema.Types.ObjectId , required : true , ref : 'Genres'},
    name : {type : String, required : true, minLength : 2 },
    unitPrice : {type : Number, required : true},
    insuranceFees : {type : Number, required : true},
    images : [
        {type : String, required : true},
    ],
    slug : {type : String},
    available : {type : Boolean , default : true , required : true},
    description : {type : String, required : true,minLength : 10},
    seats : {type :Number, required : true},
    fuel : {type : String, required : true},
},{timestamps: true})
const Car = mongoose.model('Car', CarSchema);
export {Car , CarSchema} ;