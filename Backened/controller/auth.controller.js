import usermodel from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const signup = async(req,res)=>{
   
   const {username,password,email} = req.body;
   const hashedpassword = bcrypt.hashSync(password,10);
   const newuser = new usermodel({username,password : hashedpassword,email});
   
   //this saving may require some time to as to pause the execution we use await
   try {
    await newuser.save();
    res.status(200).json("User Created Successfully");
   } catch (error) {
    res.status(500).json(error.message)
   }
   
}