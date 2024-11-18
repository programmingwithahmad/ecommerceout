import mongoose from "mongoose";
import colors from "colors";
const connectDB = async (req, res) => {
    try {
        const abc = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected To Mongodb Database ${abc.connection.host}`.bgMagenta.white);
    } catch (err) {
        console.log(`Error in Mongodb ${err}`.bgRed.white);
    }
}
export default connectDB;  