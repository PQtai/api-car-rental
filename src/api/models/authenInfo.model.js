import mongoose from 'mongoose';
const {Schema} = mongoose;
const AuthenInfoSchema = new Schema({
    phone : {type : String , required : true},
    gplx : {type : String , required : true},
    dayOfBirth : {type : Date , required : true},
},{timestamps: true});
const AuthenInfo = mongoose.model('AuthenInfo', AuthenInfoSchema);
export { AuthenInfo ,AuthenInfoSchema} ;