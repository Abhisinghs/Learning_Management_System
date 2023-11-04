//import express 
import express from 'express'
import { config } from 'dotenv';
import course from './routes/Course.route.js'
import user from './routes/User.route.js'
import payment from './routes/Payment.route.js'
import other from './routes/Other.route.js'
import ErrorMiddleware from './middlewares/Error.js'
import cookieParser from 'cookie-parser';

//set path of config file
config({
    path:'./config/config.env'
})

//make instance of express
const app = express();


// using middleware 
app.use(express.json());
app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(cookieParser());
// importing & using routes
app.use('/api/v1',course);
app.use('/api/v1',user);
app.use('/api/v1',payment)
app.use('/api/v1',other)


//export module so other can use 
export default app;

app.use(ErrorMiddleware);