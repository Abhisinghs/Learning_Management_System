//import express 
import express from 'express'
import { config } from 'dotenv';
import course from './routes/Course.route.js'

//set path of config file
config({
    path:'./config/config.env'
})

//make instance of express
const app = express();

// importing & using routes
app.use('/api/v1',course);


//export module so other can use 
export default app;