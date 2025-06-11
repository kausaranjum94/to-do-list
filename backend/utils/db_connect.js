const mongoose = require("mongoose");

const dbConnect = async () => {
    try{
        const response = await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connection Established");
    }catch(error){
        console.log("Error Establishing Database Connection", error);
    }
}

module.exports = dbConnect;