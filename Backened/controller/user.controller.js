import listing from "../models/listing.model.js";
import usermodel from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from 'bcryptjs';

export const usercontroller = (req, res) => {
    res.status(200).json("user route is working");
};

export const updateUsercontroller= async(req,res,next)=>{
   
    
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401,"You can only update your own account"))
    }
    try {
       if(req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password,10) 
       }
        const updatedUser = await usermodel.findByIdAndUpdate(req.params.id,{
            $set:{
               username:req.body.username,
               email:req.body.email,
               password:req.body.password,
               avatar : req.body.avatar 
            }
        },{new:true})
       
       const {password , ...rest} = updatedUser._doc;
       res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const deleteuser = async (req,res,next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401,"you can only delete your account"));
    }
    try {
        await usermodel.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json("user deleted successfully");

    } catch (error) {
        next(error);
    }
}

export const getUserListings = async (req,res,next )=>{
    if (req.user.id !== req.params.id){
        return next(errorHandler(401,"You can only view your own listings!"));
    }else{
        try {
            const listings = await listing.find({userRef:req.params.id});
            res.status(200).json(listings);
        } catch (error) {
            next(error);
        }
    }
    
}
