import mongoose from "mongoose";

export const connectToDb=async()=>{
   const {connection} = await mongoose.connect(process.env.MONGO_URI);
   console.log(`MongoDb connected with ${connection.host}`);
}