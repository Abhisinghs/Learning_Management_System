import catchAsynError from "../middlewares/catchAsynError.js";
import stats from "../models/Stats.modal.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendEmail from "../utils/sendEmail.js";

const contact= catchAsynError(async(req,resp,next)=>{

    const {name,email,message}=req.body;

    if(!name || !email || !message) 
        return next(new ErrorHandler("All Fields are madetory",401));

    const to=process.env.MY_MAIL;

    const subject="Contact From LearnHub";
    const text=`I am ${name} and my Email is ${email}. \n ${message}`;

    await sendEmail(to,subject,text);

    resp.status(200).json({
        success:true,
        message:"Your Message has been sent."
    })
})

const courseRequest= catchAsynError(async(req,resp,next)=>{
    const {name,email,course}=req.body;

    if(!name || !email || !course) 
        return next(new ErrorHandler("All Fields are madetory",401));

    const to=process.env.MY_MAIL;

    const subject="Request for a course on LearnHub";
    const text=`I am ${name} and my Email is ${email}. \n ${course}`;

    await sendEmail(to,subject,text);

    resp.status(200).json({
        success:true,
        message:"Your Request has been sent."
    })
});


//logic for Statics for Dashboard
const getDashboardStats = catchAsynError(async(req,resp,next)=>{
    
    const Stats = await stats.find({}).sort({createdAt:"desc"}).limit(12);

    const statsData= [];

    for (let i = 0; i < Stats.length; i++) {
        statsData.unshift(Stats[i]); 
    }

    const requiredSize= 12-Stats.length;

    for (let i = 0; i < requiredSize; i++) {
        statsData.unshift({
            users:0,
            subscriptions:0,
            views:0,
        })
    }

    //store count in varibles 
    const usersCount = statsData[11].users;
    const subscriptionsCount = statsData[11].subscriptions;
    const viewsCount = statsData[11].views;

    let usersProfit = true,viewsProfit=true,subscriptionsProfit=true;

    let usersPercentage = 0,viewsPercentage=0,subscriptionsPercentage=0;

    //store the information of user,subscription and views 
    if(statsData[10].users==0)  usersPercentage = usersCount*100;
    if(statsData[10].views==0)  viewsPercentage = viewsCount*100;
    if(statsData[10].subscriptions==0)  subscriptionsPercentage = subscriptionsCount*100;
    else{
        const difference = { 
            users:statsData[11].users-statsData[10].users,
            views:statsData[11].views - statsData[10].views,
            subscriptions:statsData[11].subscriptions- statsData[10].subscriptions,
        };
        usersPercentage = (difference.users/statsData[10].users)*100;
        viewsPercentage = (difference.views/statsData[10].views)*100;
        subscriptionsPercentage = (difference.subscriptions/statsData[10].subscriptions)*100;

        if(usersPercentage<0) usersProfit=false;
        if(viewsPercentage<0) viewsProfit = false;
        if(subscriptionsPercentage<0) subscriptionsProfit= false;

    }
    resp.status(200).json({
        success:true,
        stats:statsData,
        usersCount,
        subscriptionsCount,
        viewsCount,
        usersPercentage,
        subscriptionsPercentage,
        viewsPercentage,
        usersProfit,
        subscriptionsProfit,
        viewsProfit
    })
})

export {
    contact,
    courseRequest,
    getDashboardStats,
}