import express from 'express'
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

mongoose.connect(process.env.DB_CONNECT).then(()=>{
    console.log("connected to db");
    
}).catch((err)=>{
    console.log(err);
    
});
app.listen(3000,()=>{
    console.log("server started at port 3000");
    
})