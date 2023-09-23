import express from 'express'
import { getAllCourses } from '../controllers/Course.controller.js';

const router = express.Router();

router.route('/courses').get(getAllCourses);

export default router