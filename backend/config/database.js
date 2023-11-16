const mongoose = require("mongoose");


const connectDatabase = ()=>{
    mongoose.connect(process.env.MONGO_URL).then((url)=>{
        console.log(`MongoDB connected with server ${url.connection.host}`);
    })
}

module.exports = connectDatabase;


