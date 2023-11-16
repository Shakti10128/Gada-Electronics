const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require('../utils/errorhandler.js');
const JWT = require("jsonwebtoken");
const User = require('../models/userModel.js');


exports.isAuthenticatedUser = catchAsyncError(async (req,res,next)=>{
    const token = req.cookies.token;
    
    if(!token){
        return next(new ErrorHandler("Please login to access this resource",401))
    }

    const decodedData = JWT.verify(token,process.env.JWT_SECRET);

    // adding user into user req to access user data anytime and everywhere until the user is logged in
    req.user = await User.findById(decodedData.id);

    next();
})

exports.authorizeRoles = (...roles)=>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403))
        }

        next();
    };
}