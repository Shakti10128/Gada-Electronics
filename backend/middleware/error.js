const ErrorHandler = require('../utils/errorhandler.js');

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Server Error"

    // wrond mongodb id Error
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    // dublicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message,400);
    }

    // json web token error
    if(err.name === "jsonWebTokenError"){
        const message = `json web token is Invalid, Try again`;
        err = new ErrorHandler(message,400);
    }

    // jwt expires error
    if(err.name === "tokenExpiredError"){
        const message = `json web token is Expired, Try again`;
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}