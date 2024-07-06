const mongoose = require("mongoose");
require('dotenv').config();
exports.dbConnection=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('db connected');
    } catch (error) {
        console.log('error in db connection ',error);
    }
}