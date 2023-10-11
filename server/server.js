// import app 
import app from './app.js';
import { connectToDb } from './config/database.js';
import cloudinary from 'cloudinary';

const PORT = process.env.PORT|| 8080;

// connent to database
connectToDb();


cloudinary.v2.config({
    cloud_name:process.env.CLOUD_CLIENT_NAME,
    api_key:process.env.CLOUD_CLIENT_API,
    api_secret:process.env.CLOUD_CLIENT_SECRET,
})


//listen server 
app.listen(PORT,()=>{
    
    console.log(`server is listening at ${PORT}`);
})
