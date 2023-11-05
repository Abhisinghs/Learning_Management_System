import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
    
    users:{
        type:Number,
        default:0
    },
    subscriptions:{
        type:Number,
        default:0
    },
    views:{
        type:Number,
        default:0
    },

    createdAt:{
        type:Date,
        default:Date.now,
    }
})

const stats = mongoose.model("stats",statsSchema);

//export modal
export default stats;