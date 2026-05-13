require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const config = Object.freeze({
    PORT: process.env.PORT || 3000,
    databaseURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/pos',
    databaseName: process.env.MONGODB_DB_NAME || 'pos',
    allowDbFallback: process.env.ALLOW_DB_FALLBACK === 'true',
    nodeEnv: process.env.NODE_ENV || 'development',
    accessTokenSecret: process.env.JWT_SECRET,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    razorWebHookSecret: process.env.RAZORPAY_WEBHOOK_SECRET
});

module.exports = config;