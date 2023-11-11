//import course modal
import catchAsynError from "../middlewares/catchAsynError.js";
import Course from "../models/Course.modal.js";
import stats from "../models/Stats.modal.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

const getAllCourses = catchAsynError(async function getAllCourses(
  req,
  resp,
  next
) {

  const keyword = req.query.keyword || "";
  const category = req.query.category || "";

  const courses = await Course.find({
    title:{
      $regex:keyword,
      $options:"i",
    },
    category:{
      $regex:category,
      $options:"i",
    }
  }).select("-lectures");
  resp.status(200).json({
    success: true,
    courses,
  });
});

const createCourse = catchAsynError(async function getAllCourses(
  req,
  resp,
  next
) {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy)
    return next(new ErrorHandler("Please add all fields", 400));

  try {
    const file = req.file;
    const fileUri = getDataUri(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
    await Course.create({
      title,
      description,
      category,
      createdBy,
      poster: {
        // public_id: "temp",
        // url:"temp",
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      },
    });

    resp.status(200).json({
      success: true,
      message: "Course Created Successfully. You can add lectures now.",
    });
  } catch (err) {
    resp.status(404).json({
      success: false,
      message: `Error while creating course ${err}`,
    });
  }
});

const getCourseLectures = catchAsynError(async function getAllCourses(
  req,
  resp,
  next
) {
 
  const course = await Course.findById(req.params.id);

  if (!course) return next(new ErrorHandler("Course not Found", 404));

  course.views += 1;

  await course.save();
  resp.status(200).json({
    success: true,
    course,
  });
});

const addLecture = catchAsynError(async function getAllCourses(
  req,
  resp,
  next
) {
  const { id } = req.params;
  const { title, description } = req.body;
  // const file = req.file;

  const course = await Course.findById(req.params.id);

  if (!course) return next(new ErrorHandler("Course not Found", 404));

  const file = req.file;
  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content, {
    resource_type: "video",
  });

  course.lectures.push({
    title,
    description,
    video: {
      public_id: mycloud.public_id,
      url:mycloud.secure_url,
    },
  });

  course.numOfVideos = course.lectures.length;
  await course.save();

  resp.status(200).json({
    success: true,
    message: "Lecture added in course successfully",
  });
});



const deleteCourse = catchAsynError(async (req,resp,next) => {
 
  const {id} = req.params;

  const course = await Course.findById(id);

  if(!course) return next(new ErrorHandler("Course not Found",404));

  await cloudinary.v2.uploader.destroy(course.poster.public_id);

  for(let i=0;i<course.lectures.length;i++){
    const singleLecture = course.lectures[i];
    await cloudinary.v2.uploader.destroy(singleLecture.video.public_id,{
      resource_type:"video",
    });
  }

  const del_course = await course.deleteOne({id});
 


  resp.status(200).json({
    success:true,
    message:"Course deleted successfully",
  })
});


const deleteLecture = catchAsynError(async (req,resp,next) => {
 
  const {courseId,lectureId} = req.query;

  const course = await Course.findById(courseId);

  if(!course) return next(new ErrorHandler("Course not Found",404));

  const lecture = course.lectures.find((item) =>{
    if(item._id.toString() === lectureId.toString()) return item;
  });

  await cloudinary.v2.uploader.destroy(lecture.video.public_id,{
    resource_type:"video",
  })

  course.lectures = course.lectures.filter((item)=>{
    if(item._id.toString() !== lectureId.toString()) return item;
  });

  course.numOfVideos = course.lectures.length;

  await course.save();

  resp.status(200).json({
    success:true,
    message:"Course Lecture deleted successfully",
  })
});

Course.watch().on("change",async()=>{
  const Stats = await stats.find({}).sort({createdAt:"desc"}).limit(1);

  const courses = await Course.find({});

  let totalViews= 0;

  for (let i = 0; i < courses.length; i++) {
    totalViews+=courses[i].views;
    
  }

  Stats[0].views = totalViews;
  Stats[0].createdAt= new Date(Date.now());

  await Stats[0].save();
})

export { getAllCourses, createCourse, getCourseLectures, addLecture,deleteCourse,deleteLecture };
