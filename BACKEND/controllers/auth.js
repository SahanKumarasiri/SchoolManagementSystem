//JWT authentication goes here
const User = require("../models/user");
const Staff = require("../models/staff");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");


//when we use asynchrones function we need try catch block
exports.register = async (req , res , next) =>{  
   
    const {username , email , password} = req.body; //destructure method

    try {
        const user = await User.create({
            username , email , password //this.password filed of user.js in models
        })
        sendToken(user , 200 , res);

    } catch (error) {
       next(error);
    }
}


exports.login = async (req , res , next) =>{
   const {email , password} = req.body;

   if(!email || !password){ //backend validation
       return next(new ErrorResponse("Please provide an email and password" , 400)); //throws a new error
   }                                                                           //400 Bad Request

   try {
    
        const user = await User.findOne({email}).select("+password");

        if(!user){ //true
            return next(new ErrorResponse("Invalid Credentials" , 401));
        }

        const isMatch = await user.matchPasswords(password); //matching the passwords from the received from request and from the db
        
        if(!isMatch){
            return next(new ErrorResponse("Invalid Credentials" , 401)); //401 for unauthorized
        }

        sendToken(user , 200 , res);

   } catch (error) {
        res.status(500).json({ // 500 internal server error
            success:false,
            error:error.message
    })       
   }
}

exports.forgotpassword = async (req , res , next) =>{
    const {email} = req.body;

    try {
        const user = await User.findOne({email});

        if(!user){
            return next(new ErrorResponse("Email could not be sent") , 404);
        }

        const resetToken = user.getResetPasswordToken();
        
        await user.save();

        const resetURL = `http://localhost:3000/passwordreset/${resetToken}`; //this is a frontend route

        const message = `
        <h1>You have requested a password reset</h1>
        <p>Please go to this URL to reset password</p>
        <a href=${resetURL} clicktracking=off>${resetURL}</a>
         `
        try {
            await sendEmail({
                to : user.email,
                subject : "Password Reset Request",
                text : message
            })

            res.status(200).json({ success : true , data : "Email Sent"});

        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email could not be sent") , 500);

        }
    } catch (error) {
        next(error);
    }
}

exports.resetpassword = async (req , res , next) =>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt : Date.now()}
        })

        if(!user){
            return next(new ErrorResponse("Invalid Reset Token") , 400)
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({success : true , data : "Password reset success"});

    } catch (error) {
        next(error);
    }
}

const sendToken = (user , statusCode , res)=>{ //JWT get
    const token = user.getSignedToken();
    res.status(200).json({success:true , token});
}


//-------------------------------------------Staff Section------------------------------------------------

exports.registerStaff = async (req , res , next) =>{  
   
    const {email , password} = req.body; //destructure method

    try {
        const staff = await Staff.create({
            email , password //this.password filed of user.js in models
        })
        sendStaffToken(staff , 200 , res);

    } catch (error) {
       next(error);
    }
}

exports.loginStaff = async (req , res , next) =>{
    const {email , password} = req.body;
 
    if(!email || !password){ //backend validation
        return next(new ErrorResponse("Please provide an email and password" , 400)); //throws a new error
    }                                                                           //400 Bad Request
 
    try {
     
         const staff = await Staff.findOne({email}).select("+password");
 
         if(!staff){ //true
             return next(new ErrorResponse("Invalid Credentials" , 401));
         }
 
         const isMatch = await staff.matchStaffPasswords(password); //matching the passwords from the received from request and from the db
         
         if(!isMatch){
             return next(new ErrorResponse("Invalid Credentials" , 401)); //401 for unauthorized
         }
 
         sendStaffToken(staff , 200 , res);
 
    } catch (error) {
         res.status(500).json({ // 500 internal server error
             success:false,
             error:error.message
     })       
    }
 }

 const sendStaffToken = (staff , statusCode , res)=>{ //JWT get
    const token = staff.getStaffSignedToken();
    res.status(200).json({success:true , token});
}
 