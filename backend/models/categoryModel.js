import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        lowercase: true
    }
    // description: {
    //     type: String,
    //     required: true
    // },
    // parent: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category',
    //     required: true
    // },
    // image: {
    //     type: String,
    //     required: true
    // }
},{timestamps: true})
                                                                                                                    
export default mongoose.model('categories', categorySchema);