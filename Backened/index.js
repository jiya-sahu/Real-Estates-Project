import express from 'express'
const app = express();
<<<<<<< HEAD
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.DB_CONNECT).then(()=>{
    console.log("connected to db");
    
}).catch((err)=>{
    console.log(err);
    
})
=======
>>>>>>> 6c036f0565dc4e90450cd8337021d228bfc03436

app.listen(3000,()=>{
    console.log("server listening at port 3000");
    
<<<<<<< HEAD
})
=======
})
>>>>>>> 6c036f0565dc4e90450cd8337021d228bfc03436
