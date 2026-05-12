const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
    const fallbackURI = "mongodb://127.0.0.1:27017/pos";

    try {
        const conn = await mongoose.connect(config.databaseURI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Primary MongoDB connection failed: ${error.message}`);

        try {
            const conn = await mongoose.connect(fallbackURI, {
                serverSelectionTimeoutMS: 5000,
            });
            console.log(`MongoDB Connected (fallback): ${conn.connection.host}`);
        } catch (fallbackError) {
            console.log(`Fallback MongoDB connection failed: ${fallbackError.message}`);
            throw fallbackError;
        }
    }
}

module.exports = connectDB;