import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import { OTP } from '../helpers/sendmail.js';
import { hashpassword } from '../helpers/authHelper.js';


//Protected Routes Token base
export const requiresignin = (req, res, next) => {
    try {
        
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]
        const decode = JWT.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decode
        next()
    }catch (error) {
        console.log(error);
    }

}

//Only for admin access
export const isAdmin = async(req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role !== 1){
            return res.status(401).send({success: false, message:'Unauthorized Access'});
        }
        else{
            next()
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({success: false, message:'Error in Admin middleware',error });
    }
}


//Get Email for forgot password
export const forgotpassword = async(req, res, next) => {
  try {
    const {email} = req.body
    if (!email) {
        return res.status(400).send({
            success: false,
            message: 'Please provide an email'
        })
    }
    const data = await userModel.findOne({email})
    console.log(data)
    if(!data){
         return res.status(400).send({success: false, message: 'Email not found, Please Register'})
        }
        else{
            req.data = data
            next()
        }
  } catch (error) { 
    console.log(error);
    res.status(500).send({
        success: false,
        message: 'Error in forgot password',error
    })
  }
}


//helper
export const helper = (req, res, next) => {
    console.log(req.data)
    next()
}

//Password OTP
export const otpforpassword = (req, res) => {
try {
    const { userotp} =req.body
    console.log(OTP)
    if (!userotp) {
        return res.status(400).send({
            success: false,
            message: 'Please provide a OTP'
        })
    }else if(userotp === OTP){
        res.status(200).send({
            success: true,
            message: 'OTP verified'
        })
    }else{
        return res.status(400).send({
            success: false,
            message: 'Invalid OTP'
        })
    }
} catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: 'Error in OTP Process',error
    })
}
}


//changepassword Password
export const changepassword = async(req, res) => {
try {
    console.log(req.data)
    const { email, password } = req.body
   
   const abc = await userModel.findOne({email})
   const hashedpassword = await hashpassword(password);
   console.log(abc)
    const update = await userModel.findByIdAndUpdate(abc._id, {password: hashedpassword})
if(update){
    res.status(200).send({success: true, message: 'Password updated successfully'})
}
} catch (error) {
    console.log(error)
    res.status(500).send({
        success: false,
        message: 'Error in forgot password',error
    })
}
}

