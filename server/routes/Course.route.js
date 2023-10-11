import express from "express";
import {
  addLecture,
  createCourse,
  getAllCourses,
  getCourseLectures,
} from "../controllers/Course.controller.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

//Get All courses without lectures
router.route("/courses").get(getAllCourses);

//create a new courses only admin
router.route("/createcourses").post(singleUpload,createCourse);

//Add lecture  //get lectures
router.route("/course/:id").get(getCourseLectures).post(singleUpload,addLecture);

//Delete lecture,get course details

//delete lecture,

export default router;
