// export module
const catchAsynError = (passedFunction)=>(req,resp,next)=>{
    Promise.resolve(passedFunction(req,resp,next)).catch(next);
}

export default catchAsynError;