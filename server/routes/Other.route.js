import express from "express";
import { contact, courseRequest, getDashboardStats } from "../controllers/Other.controller.js";
import { authorizedAdmin, isAuthenticated } from "../middlewares/Auth.js";

const router = express.Router();

//contact form
router.route('/contact').post(contact);

//Request for a Course
router.route('/courserequest').post(courseRequest);

//Get Admin Dashbord stats
router.route('/admin/stats').get(isAuthenticated,authorizedAdmin,getDashboardStats);

export default router;
