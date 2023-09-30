// import app 
import app from './app.js';
import { connectToDb } from './config/database.js';

const PORT = process.env.PORT|| 8080;

// connent to database
connectToDb();

//listen server 
app.listen(PORT,()=>{
    
    console.log(`server is listening at ${PORT}`);
})
