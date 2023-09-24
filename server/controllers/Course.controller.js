//import course modal
import { catchAsynError } from '../middlewares/catchAsynError.js'
import Course  from '../models/Course.modal.js'

const getAllCourses = catchAsynError(async function getAllCourses(req,resp,next){
    const courses=await Course.find();
    resp.status(200).json({
        success:true,
        courses
    })
})

export {
    getAllCourses,
}