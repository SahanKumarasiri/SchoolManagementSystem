//import dependencies
//seems like import packages and assigned to varibles such as Java , C , C++
//ESC6 Standard

const express = require("express"); //Fast, unopinionated, minimalist web framework for node.

const cors = require("cors"); /*CORS is a node.js package for providing a Connect/Express 
                                middleware that can be used to enable CORS with various options.*/

const dotenv = require("dotenv"); /*Dotenv is a zero-dependency module that loads environment variables from a
                                 .env file into process.env. Storing configuration in the environment separate 
                                 from code is based on The Twelve-Factor App methodology. */

const errorHandler = require("./middleware/error");

require("dotenv").config();  //these line is necessary for configuration .env file

const connectDB = require("./config/db");

connectDB(); //call db connection

const app = express();

//define a port for server
const PORT = process.env.PORT || 8070; //accually process.env.PORT is inbuilt 

app.use((cors()));
app.use(express.json()); //parse various different custom JSON types as JSON



app.listen(PORT , () => {
    console.log(`Server is up and running on port number ${PORT}`);
});

const studentRouter = require("./routes/student.js"); //import 

app.use("/users" , studentRouter);


//this catches front-end URL
/* http://localhost/8070/student */

app.use("/api/auth" , require("./routes/auth"));
app.use("/books" , require("./routes/book"));

//Error Handler (Should be the last piece of middleware)
app.use(errorHandler);

