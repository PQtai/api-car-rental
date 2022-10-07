import mongoose from 'mongoose';
const {Schema} = mongoose;
const GenreSchema = new Schema({
    label : {type: String , required: true , unique: true},
    cars : [
        {type : mongoose.Schema.Types.ObjectId , required : true , ref : 'Car'},
    ],
},{timestamps: true});
const Genre = mongoose.model('Genre', GenreSchema);
export  {Genre , GenreSchema};