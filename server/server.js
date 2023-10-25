// import app 
import app from './app.js';
import { connectToDb } from './config/database.js';
import cloudinary from 'cloudinary';
import Razorpay from 'razorpay';

const PORT = process.env.PORT|| 8080;

// connent to database
connectToDb();


cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
    api_key:process.env.CLOUDINARY_CLIENT_API,
    api_secret:process.env.CLOUDINARY_CLIENT_SECRET,
})

//configuration of razorpay
export const instance = new Razorpay({
    key_id:process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_API_SECRET,
})


//listen server 
app.listen(PORT,()=>{
    
    console.log(`server is listening at ${PORT}`);
})
