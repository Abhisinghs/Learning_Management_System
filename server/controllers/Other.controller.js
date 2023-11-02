import catchAsynError from "../middlewares/catchAsynError";

const contact= catchAsynError(async(req,resp,next)=>{
    resp.status(200).json({
        success:true
    })
})
const courseRequest= catchAsynError(async(req,resp,next)=>{
    resp.status(200).json({
        success:true
    })
})

export {
    contact,
    courseRequest
}