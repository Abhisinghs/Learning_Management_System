//import express 
import express from 'express'
import { config } from 'dotenv';
import course from './routes/Course.route.js'
import user from './routes/User.route.js'
import ErrorMiddleware from './middlewares/Error.js'

//set path of config file
config({
    path:'./config/config.env'
})

//make instance of express
const app = express();

// importing & using routes
app.use('/api/v1',course);
app.use('/api/v1',user);


//export module so other can use 
export default app;

app.use(ErrorMiddleware);