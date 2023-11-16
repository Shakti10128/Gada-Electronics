const ErrorHandler = require("../utils/errorhandler.js");
const User = require("../models/userModel.js");
const catchAsyncErrror = require("../middleware/catchAsyncError.js");
const sendJWTToken = require("../utils/sendJWTToken.js");
const sendEmail = require('../utils/sendEmail.js')
const crypto = require("crypto");


// register a user

exports.registerUser = catchAsyncErrror(async (req,res,next)=>{
    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"it's a demoe id",
            url:"it's demo url"
        }
    })

    sendJWTToken(user,201,res);
}) 


// login user

exports.login = catchAsyncErrror(async (req,res,next)=>{
    const {email,password} = req.body;

    // data validation
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400));
    }

    const user = await User.findOne({email}).select("+password");
    // if user not found
    if(!user){
        return next(new ErrorHandler("User not found",401));
    }
    // check password is correct or not
    const isPasswordMatched = await user.ComparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }
     
    sendJWTToken(user,200,res);
})


// logout user

exports.logout = catchAsyncErrror(async (req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:false
    })

    return res.status(200).json({
        success:true,
        message:"logout successfully"
    })
})


// forgot password

exports.forgotPassword = catchAsyncErrror(async (req,res,next)=>{
    const user = await User.findOne({email:req.body.email});

    // if user not found
    if(!user){
        return next(new ErrorHandler("user not found",404));
    }

    // get reset password token
    const resetPasswordToken = user.generateResetPasswordToken();

    // document is already created don't need to validate the document
    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset${resetPasswordToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nif you have not requested this email, Please ignore it`;


    try {
        await sendEmail({
            email:user.email,
            subject:`Gada Electronic Password Recovery`,
            message
        });

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500));
    }
})


// reset password 
exports.resetPassword = catchAsyncErrror(async (req,res,next)=>{

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    }).select("+password")

    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or has been expired",400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password not matched",400));
    }


    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendJWTToken(user,200,res);

})