
const sendToken = (resp,user,message,statusCode)=>{

    const token = user.getJWTToken();
    const options = {
        expires:new Date(Date.now()+15*24*60*60*1000),
        httpOnly:true,
        // secure:true,
        sameSite:"none",
    }
    resp.status(statusCode).cookie("token",token,options).json({
        success:true,
        message,
        user,
    });
};

export default sendToken;