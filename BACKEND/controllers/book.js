const Books = require("../models/book");

exports.getAllBooks = async (req , res)=>{
    try {
        const books = await Books.find({});
        res.json(books);

    } catch (error) {
        console.error(error);
        res.send(500).json({message  : "Server Error"});
    }
}

exports.getBookById = async (req , res)=>{
    try {
        const book = await Books.findById(req.params.id);
        res.json(book);

    } catch (error) {
        console.error(error);
        res.send(500).json({message  : "Server Error"});
    }
}