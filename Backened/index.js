import express from 'express'
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import mongoose from 'mongoose';
import userroutes from './routes/user.routes.js'
import authroutes from './routes/auth.routes.js'
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import listingroutes from './routes/listing.routes.js'

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
  }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({extended:true,limit: '10mb'}));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(fileUpload({
    useTempFiles:true
}));


app.use(cookieParser());
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
  });

mongoose.connect(process.env.DB_CONNECT).then(()=>{
    console.log("connected to db");
    
}).catch((err)=>{
    console.log(err);
    
});



app.use('/api/user',userroutes);

app.use('/api/auth',authroutes);

app.use('/api/listing',listingroutes);



app.use((err , req , res , next)=>{
    const statusCode = err.statusCode||500;
    const message = err.message||"Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})

app.listen(3000,'0.0.0.0',()=>{
    console.log("server started at port 3000");
    
})

