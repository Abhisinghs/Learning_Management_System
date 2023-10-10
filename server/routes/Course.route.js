import express from 'express'
import { createCourse, getAllCourses, getCourseLectures } from '../controllers/Course.controller.js';

const router = express.Router();

//Get All courses without lectures
router.route('/courses').get(getAllCourses);

//create a new courses only admin
router.route('/createcourses').post(createCourse);

//Add lecture  //get lectures  
router.route('/course/:id').get(getCourseLectures).post(
    
); 

//Delete lecture,get course details

//delete lecture, 

export default router