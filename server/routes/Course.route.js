import express from 'express'
import { createCourse, getAllCourses } from '../controllers/Course.controller.js';

const router = express.Router();

//Get All courses without lectures
router.route('/courses').get(getAllCourses);

//create a new courses only admin
router.route('/createcourses').post(createCourse);

export default router