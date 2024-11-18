import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    product:[{
        type: mongoose.ObjectId,
        ref: 'products'
    }],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: 'users'
    },
    status:{
        type: String,
        default: 'Not_Process',
        enum: ['Not_Process','Process','Delivered','Canceled']
    }

},{timestamps: true})
                                                                                                                    
export default mongoose.model('orders', orderSchema);