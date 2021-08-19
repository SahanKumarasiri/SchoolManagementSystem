require("dotenv").config();

const BooksData = require("./data/Books");
const Book = require("./models/book");
const connectDB = require("./config/db");

connectDB();

const importData = async ()=>{
    try {
        await Book.deleteMany({});
        await Book.insertMany(BooksData);

        console.log("Data Import Success !");
        process.exit();

    } catch (error) {
        console.error("Error with importing data");
        process.exit(1);
    }
}

importData();