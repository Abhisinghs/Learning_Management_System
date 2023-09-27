
const sendToken = (resp,user,message,statusCode)=>{
    resp.statusCode(201).cookie("token");
};

export default sendToken;