//import course modal
import catchAsynError from "../middlewares/catchAsynError.js";
import Course from "../models/Course.modal.js";
import getDataUri from "../utils/dataUri.js";
import getDatauri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

const getAllCourses = catchAsynError(async function getAllCourses(
  req,
  resp,
  next
) {
  const courses = await Course.find().select("-lectures");
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
  const courses = await Course.find().select("-lectures");
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



const deleteCourse = catchAsynError(async function getAllCourses(
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

export { getAllCourses, createCourse, getCourseLectures, addLecture,deleteCourse };
