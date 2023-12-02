const app =require('./app.js');
const dotenv = require("dotenv");
const connectDatabase = require('./config/database.js');



// Uncaught Error Exception Handler
process.on("uncaughtException",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`sutting down the server due to Uncaught Error`);

    process.exit(1);
})





// config
dotenv.config({
    path:"backend/config/config.env"
})




// connecting to database
connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`); 
})


// unHandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`sutting down the server due to unHandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    })
})
