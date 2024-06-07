const mongoose = require("mongoose");
require('dotenv').config()

const dbURL = process.env.DB_URL;
const dbConnection = async () => {
    try{
        await mongoose.connect(dbURL);

        console.log ("Base de datos online");
    }
    
    catch(error){
        console.log(error);
        throw new Error("Error a la hora de iniciar la base de datos");
    }
} 

module.exports = {dbConnection};