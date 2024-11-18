import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: {},   //we also use string, but it is better to use "object" because we may be give update functionality after some time in dashboard.
        required: true
    },
    role: {
        type: Number,
        default: 0
    }
},{timestamps:true});
//when new user create then creating time add there.

export default mongoose.model('users' , userSchema);