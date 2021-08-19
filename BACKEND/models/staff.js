const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const StaffSchema = new Schema({
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

    }
})

//this is for register route
StaffSchema.pre("save" , async function(next){ //password encryption goes here
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt); //await is only can use in async function only

    next();
})

//this is for login route
StaffSchema.methods.matchStaffPasswords = async function(password){
    return await bcrypt.compare(password , this.password);  //check the entered password and password which is received from the db
}

//for register json web token (JWT)
StaffSchema.methods.getStaffSignedToken = function(){
    return jwt.sign({id : this._id} , process.env.JWT_SECRET_STAFF , {expiresIn : process.env.JWT_EXPIRE} );
}

const Staff = mongoose.model("staff" , StaffSchema);
module.exports = Staff;