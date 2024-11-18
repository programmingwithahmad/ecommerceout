import { comparepassword, hashpassword } from "../helpers/authHelper.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const {name, email, password, phone, address} = req.body
        //validations
        if(!name){
            return res.status(404).send({message:'Name is required'})
        }
        if(!email){
            return res.status(404).send({message:'Email is required'})
        }
        if(!password){
            return res.status(404).send({message:'Password is required'})
        }
        if(!phone){
            return res.status(404).send({message:'Phone is required'})
        }
        if(!address){
            return res.status(404).send({message:'Address is required'}) 
        }
        //check
        const existingUser = await userModel.findOne({email})
        //existingUser
        if(existingUser){
            return res.status(200).send({success:false, message:'Already register, Please login'})
        }
        //registration
        const hashedpassword = await hashpassword(password);
        const newUser = await new userModel({name, email, phone, address, password: hashedpassword}).save();
        res.status(200).send({success:true, message:'User Register successfully', newUser})

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in registration',error
        })
    }     
};

        //login
        export const loginController = async(req, res) => {
        try {
             const {email, password} = req.body;
             //validations
             if(!email || !password){
                res.status(404).send({success: false, message: 'Invalid email or password'})
             }
             //check
             const user = await userModel.findOne({email})
             if(!user){
               return res.status(404).send({success: false, message: 'Email is not registered'})
             }
             const match = await comparepassword(password, user.password)
            if(!match){
                return res.status(404).send({success: false, message: 'Invalid password'})
            }
            //Token
            const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET_KEY,{expiresIn: '7d'})
            res.status(200).send({
                success:true, 
                message:'Login successfully', 
                user:{
                    name:user.name,
                    email:user.email,
                    phone:user.phone,
                    address:user.address,
                    role:user.role
                },
                token})
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success: false,
                message: 'Error in login',error})
        }
        }


        //test Controller
        export const testController = (req, res) => {
            res.send({message: 'Protected routes'})
        }

        //Update Profile
       export const updateProfileController = async(req, res) => {
        try {
            const {name, phone, address} = req.body
            const updating = await userModel.findByIdAndUpdate(req.user._id, {
                name: name || req.user.name,
                phone: phone || req.user.phone,
                address: address || req.user.address
            }, {new:true})
            res.status(200).send({success: true, message: 'Profile updated successfully', updating})
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success: false,
                message: 'Error in updating profile',error
            })
        }

       }

       // Get user orders in dashboard
export const getOrdersController = async(req, res) => {
    try {
        const ordered = await orderModel.find({buyer: req.user._id}).populate('product', '-photo').populate('buyer', 'name');
        res.status(200).send({success: true, message: 'Orders fetched', ordered})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting orders',error
        })
    }
}


       // Get All orders in admin dashboard
export const getAllOrdersController = async(req, res) => {
    try {
        const ordered = await orderModel.find({}).populate('product', '-photo').populate('buyer').sort({createdAt:-1});
        res.status(200).send({success: true, message: 'Orders fetched', ordered})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting orders',error
        })
    }
}

// order status updating

export const updateOrderStatusController = async(req, res) => {
    try {
        const {orderId, status} = req.body
        const updated = await orderModel.findByIdAndUpdate(orderId, {status}, {new:true})
        res.status(200).send({success: true, message: 'Order status updated successfully', updated})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in updating order status',error
        })
    }
}


// get all users in Admin Dashboard
export const getAllUsersController = async(req, res) => {
    try {
        const users = await userModel.find({}).select('-password');
        res.status(200).send({success: true, message: 'Users fetched', users})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting users',error
        })
    }
}