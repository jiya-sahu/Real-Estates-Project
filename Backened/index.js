import express from 'express'
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import userroutes from './routes/user.routes.js'
import authroutes from './routes/auth.routes.js'


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

mongoose.connect(process.env.DB_CONNECT).then(()=>{
    console.log("connected to db");
    
}).catch((err)=>{
    console.log(err);
    
});



app.use('/user',userroutes);

app.use('/signup',authroutes);

app.listen(3000,()=>{
    console.log("server started at port 3000");
    
})

