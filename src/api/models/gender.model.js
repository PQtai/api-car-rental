import mongoose from 'mongoose';
const {Schema} = mongoose;
const GenderSchema = new Schema({
    name : {type: String , required: true , unique: true},
    cars : [
        {type : mongoose.Schema.Types.ObjectId , required : true , ref : 'Car'},
    ],
},{timestamps: true});
const Gender = mongoose.model('Gender', GenderSchema);
export default Gender;