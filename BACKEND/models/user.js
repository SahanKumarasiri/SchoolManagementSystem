const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new Schema({
    username :{
        type:String,
        required : [true , "Please enter a username"]
    },

    email:{
        type:String,
        required:[true , "Please provide a email"],
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ , "Please provide a valid email"] 
    },

    password:{
        type:String,
        required:[true , "Please enter a password"],
        select:false,
        minlength:6 //minimum password length is 6

    },

    resetPasswordToken :String,
    resetPasswordExpire:Date
})

//this is for register route
UserSchema.pre("save" , async function(next){ //password encryption goes here
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt); //await is only can use in async function only

    next();
})

//this is for login route
UserSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password , this.password);  //check the entered password and password which is received from the db
}

//for register json web token (JWT)
UserSchema.methods.getSignedToken = function(){
    return jwt.sign({id : this._id} , process.env.JWT_SECRET , {expiresIn : process.env.JWT_EXPIRE} );
}

//for reset json web token
UserSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
    return resetToken;
}

const User = mongoose.model("User" , UserSchema)
module.exports = User;