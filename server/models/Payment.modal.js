import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
   
})

const Payment = mongoose.model("Payments",paymentSchema);

//export modal
export default Payment;