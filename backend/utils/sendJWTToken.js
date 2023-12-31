// creating token and saving in cookie


const sendJWTToken = (user,statusCode,res)=>{
    const Token = user.getJWTToken();
    // we don't want to show the password to someone else
    user.password = undefined;

    // options for cookie
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly:true,
        // sameSite:"none",
        // secure:true
    }
    res.cookie("token",Token,options).status(statusCode).json({
        success:true,
        user,
        Token
    })
}

module.exports = sendJWTToken;