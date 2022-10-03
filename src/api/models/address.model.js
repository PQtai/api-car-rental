import mongoose from 'mongoose';
const {Schema} = mongoose;
const AddressSchema = new Schema({
    name : {type : String , required : true , unique : true, minLength : 3},
    cars :[
        {type : mongoose.Schema.Types.ObjectId , required : true , ref : 'Car'},
    ],
},{timestamps: true})
const Address = mongoose.model('Address', AddressSchema);
export {Address , AddressSchema} ;