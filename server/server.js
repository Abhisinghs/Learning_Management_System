// import app 
import app from './app.js';

const PORT = process.env.PORT|| 8080;

//listen server 
app.listen(PORT,()=>{
    console.log(`server is listening at ${PORT}`);
})
