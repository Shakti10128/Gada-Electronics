const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
// it will validate user email weither it's email or not
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Name length can't exceed 30 character"],
        minLength:[4,"Name should contains 4 character"],
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter Valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,"Password should contains atleast 8 character"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:'user'
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})


// hash password before saving the document in database
userSchema.pre("save",async function(next){
    // we have make a function to access this keyword, in arrow function we can't access this keyword

    // if password not modified
    if(!this.isModified("password")){
        next();
    }
    // else hash the password because document is new
    this.password = await bcrypt.hash(this.password,10);
})

// JWT Token
userSchema.methods.getJWTToken = function(){
    return  JWT.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

// compare password for user authentication(login)
userSchema.methods.ComparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
}

// Generating reset password token
userSchema.methods.generateResetPasswordToken = function(){
    // generating token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // creating hash and adding into user resetPasswordToken
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model("User",userSchema);