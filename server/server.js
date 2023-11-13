// import app 
import app from './app.js';
import { connectToDb } from './config/database.js';
import cloudinary from 'cloudinary';
import Razorpay from 'razorpay';
import NodeCron from "node-cron";
import stats from './models/Stats.modal.js';

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

NodeCron.schedule("0 0 0 1 * *",async()=>{
   try{
    await stats.create({});
   }catch(err){
    console.log(err);
   }
})

app.get('/',(req,resp)=>{
    resp.send("<h1>Working Fine</h1>");
})


//listen server 
app.listen(PORT,()=>{
    
    console.log(`server is listening at ${PORT}`);
})
