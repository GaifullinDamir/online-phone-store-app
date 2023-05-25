import mongoose from 'mongoose';

const phoneSchema = new mongoose.Schema(
    {
        phoneGroup: {
            type:String,
            required:true
        },
        src : {
            type:String,
            required:true
        },
        picW : {
            type:String,
            required:true
        },
        picH : {
            type:String,
            required:true
        },
        phoneName : {
            type:String,
            required:true
        },
        memorySize : {
            type:String,
            required:true
        },
        price : {
            type:String,
            required:true 
        }
    }
);

export default mongoose.model('Phone', phoneSchema);

