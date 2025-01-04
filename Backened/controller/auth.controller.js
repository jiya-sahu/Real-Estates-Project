import usermodel from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async(req,res,next)=>{
    console.log(req.body);
    
   const {username,password,email} = req.body;
   const hashedpassword = bcrypt.hashSync(password,10);
   const newuser = new usermodel({username,password : hashedpassword,email});
   
   //this saving may require some time to as to pause the execution we use await
   try {
    await newuser.save();
    res.status(200).json("User Created Successfully");
   } catch (error) {
        next(error);
   }
   
}


export const signin = async (req,res,next) => {
     const {password , email} = req.body;

     try {
          const validUser = await usermodel.findOne({email});
          if (!validUser) {
               next(errorHandler(404,"User Not Found"));
          }
          const validPassword = bcrypt.compareSync(password,validUser.password);
          if(!validPassword)return next(errorHandler(401,"Wrong Credentials"))
          const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
          const {password:pass , ...rest} = validUser._doc;
          res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);

     } catch (error) {
          next(error)
     }
    

}

export const googleauth = async(req,res,next)=>{
     try {
          const user = await usermodel.findOne({email:req.body.email});
          if (user) {
               const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
               const {password:pass , ...rest} = user._doc;
               res
               .cookie("access_token",token,{httpOnly:true})
               .status(200)
               .json(rest)
          }else{
               const generatedpassword = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
               const hashedpassword = bcrypt.hashSync(generatedpassword,10);
               const newuser = new usermodel({username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8),
                    email:req.body.email, password:hashedpassword , avatar : req.body.photo 
               })

               const token = jwt.sign({id:newuser._id},process.env.JWT_SECRET)
               const {password:pass , ...rest} = newuser._doc;
               res
               .cookie("access_token",token,{httpOnly:true})
               .status(200)
               .json(rest)
          }
         
     } catch (error) {
        next(error);  
     }
}