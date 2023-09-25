
const ErrorMiddleware=(err,req,resp,next)=>{
    err.statusCode=err.statusCode|| 500;
    err.message=err.message|| "Internal server Error";
    resp.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}

export default ErrorMiddleware;