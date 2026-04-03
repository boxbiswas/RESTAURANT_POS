require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const app = express();

const PORT = process.env.PORT;
connectDB();

//ROOT ENDPOINTS
app.get("/", (req, res) => {
    res.json({ message: "Hello from POS Server!" });
})

//OTHER ENDPOINTS
app.use("/api/payment", require("./routes/paymentRoute"));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
