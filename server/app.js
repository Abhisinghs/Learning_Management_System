//import express 
import express from 'express'
import { config } from 'dotenv';


//set path of config file
config({
    path:'./config/config.env'
})

//make instance of express
const app = express();


//export module so other can use 
export default app;