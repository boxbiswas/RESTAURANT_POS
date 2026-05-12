require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const config = require("./config/config");
const createHttpError = require("http-errors");
const app = express();
const cors = require("cors");

const PORT = config.PORT;
connectDB();

//Middleware
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173'] // Allow requests from this origin (adjust as needed)
})); // Enable CORS for all routes (you can configure this as needed)
app.use(express.json()); //parse imcoming request in json format
app.use(cookieParser()); //parse cookies from incoming request

// simple CORS middleware for local development
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

//ROOT ENDPOINTS
app.get("/", (req, res) => {
    res.json({ message: "Hello from POS Server!" });
})


//OTHER ENDPOINTS
app.use("/api/payment", require("./routes/paymentRoute"));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/settings", require("./routes/settingsRoute"));

//ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    console.error(`[${status}] ${message}`);
    
    res.status(status).json({
        error: message,
        message: message,
        status: status
    });
});

//Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
