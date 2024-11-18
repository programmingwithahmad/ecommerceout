import nodemailer from 'nodemailer';
import { generate } from 'otp-generator';
import dotenv from 'dotenv';

dotenv.config();

const numb = () => {
    const code = generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false});
    return code;
}
export const OTP = numb()

const transporter = nodemailer.createTransport({
    host: process.env.host,
    port: process.env.emailport,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });




export const mail = async (req, res, next) => {
  try {
       const {email, name} = req.data
       
      // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.user, // sender address
    to: email, // list of receivers
    subject:  `Hello ${name} Your OTP is : ${OTP}`, // Subject line
    text: "", // plain text body
    html: "", // html body
  });
   if(info){
    res.status(200).send({success:true, message:'OTP send to Email',email});
   }
  console.log("Message sent: %s", info.messageId, OTP);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  } catch (error) {
    console.log(error); 
  }
}

