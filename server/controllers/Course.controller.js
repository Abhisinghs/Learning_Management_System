//import course modal
import  catchAsynError  from '../middlewares/catchAsynError.js'
import Course  from '../models/Course.modal.js'
import ErrorHandler from '../utils/errorHandler.js';

const getAllCourses = catchAsynError(async function getAllCourses(req,resp,next){
    const courses=await Course.find().select("-lectures");
    resp.status(200).json({
        success:true,
        courses
    })
})

const createCourse = catchAsynError(async function getAllCourses(req,resp,next){
    const {title,description,category,createdBy} = req.body;

    if(!title || !description || !category || !createdBy) 
       return next(new ErrorHandler("Please add all fields",400));

    // const file = req.file;
    await Course.create({
        title,description,category,createdBy,poster :{
            public_id:"temp",
            url:"temp",
        },
    });

    resp.status(200).json({
        success:true,
        message:"Course Created Successfully. You can add lectures now.",
    })
})

export {
    getAllCourses,
    createCourse
}