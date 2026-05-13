const config = require('../config/config');
const User = require('../models/userModel');
const Settings = require('../models/settingsModel');
const Category = require('../models/categoryModel');
const Item = require('../models/itemModel');
const Order = require('../models/orderModel');

const resetDatabase = async (req, res, next) => {
    try {
        if (config.nodeEnv === 'production') {
            return res.status(403).json({
                success: false,
                message: 'Reset is disabled in production',
            });
        }

        await Promise.all([
            User.deleteMany({}),
            Settings.deleteMany({}),
            Category.deleteMany({}),
            Item.deleteMany({}),
            Order.deleteMany({}),
        ]);

        res.clearCookie('accessToken');

        res.status(200).json({
            success: true,
            message: 'Database reset successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    resetDatabase,
};