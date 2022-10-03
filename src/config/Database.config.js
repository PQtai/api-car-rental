import mongoose from "mongoose";
const connect = async (url)=>{
    try {
        await mongoose.connect(url);
        console.log('connect db successfully!!!');
    } catch (error) {
        console.log('failed to connect' , error); 
    }
}
export default {connect};