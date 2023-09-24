//import course modal
import Course  from '../models/Course.modal.js'

async function getAllCourses(req,resp,next){
    const courses=await Course.find();
    resp.status(200).json({
        success:true,
        courses
    })
}

export {
    getAllCourses,
}