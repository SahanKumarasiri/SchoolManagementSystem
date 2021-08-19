const mongoose = require("mongoose");

require("dotenv").config();

const dbConfig = async ()=>{
    try {
        const URL = process.env.MONGODB_URL;

        await mongoose.connect(URL , {  //define connection
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
    
        const connection = mongoose.connection; //assign database connection for a constant variable
    
        connection.once("open" , () => { //open connection for one time
            console.log("MongoDB connection was successful"); //display message in console when the connection was successful
        });
    } catch (error) {
        console.error("MongoDB connection failed");
        process.exit(1);
    }
}

module.exports = dbConfig;
