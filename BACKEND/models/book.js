const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name:{
        type:String,
        required:true 
    },
    imageURL:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    countInStock:{
        type:Number,
        required:true
    }
})

const Book = mongoose.model("book" , bookSchema);

module.exports = Book;