const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
    const fallbackURI = "mongodb://127.0.0.1:27017/pos";

    try {
        const conn = await mongoose.connect(config.databaseURI, {
            serverSelectionTimeoutMS: 5000,
            dbName: config.databaseName,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    } catch (error) {
        console.log(`Primary MongoDB connection failed: ${error.message}`);

        if (!config.allowDbFallback) {
            throw error;
        }

        const conn = await mongoose.connect(fallbackURI, {
            serverSelectionTimeoutMS: 5000,
            dbName: config.databaseName,
        });
        console.log(`MongoDB Connected (fallback): ${conn.connection.host}/${conn.connection.name}`);
    }
}

module.exports = connectDB;