const Settings = require('../models/settingsModel');
const Category = require('../models/categoryModel');
const Item = require('../models/itemModel');

const getSettings = async (req, res, next) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({});
        }
        const categories = await Category.find({}, '-_id -__v');
        const dishes = await Item.find({}, '-_id -__v');
        
        const responseData = { ...settings.toObject(), categories, dishes };
        
        res.status(200).json({ success: true, data: responseData });
    } catch (error) {
        next(error);
    }
};

const updateSettings = async (req, res, next) => {
    try {
        const { categories, dishes, ...restBody } = req.body;
        
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create(restBody);
        } else {
            settings = await Settings.findOneAndUpdate({}, restBody, { new: true });
        }
        
        if (categories) {
            await Category.deleteMany({});
            if (categories.length > 0) {
                await Category.insertMany(categories);
            }
        }
        if (dishes) {
            await Item.deleteMany({});
            if (dishes.length > 0) {
                await Item.insertMany(dishes);
            }
        }
        
        const updatedCategories = await Category.find({}, '-_id -__v');
        const updatedDishes = await Item.find({}, '-_id -__v');
        const responseData = { ...settings.toObject(), categories: updatedCategories, dishes: updatedDishes };
        
        res.status(200).json({ success: true, data: responseData, message: 'Settings updated successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getSettings, updateSettings };
