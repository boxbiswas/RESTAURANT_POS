const Settings = require('../models/settingsModel');
const Category = require('../models/categoryModel');
const Item = require('../models/itemModel');

const toSafeNumberId = (value, fallbackSeed) => {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
    return fallbackSeed;
};

const normalizeCategories = (categories = []) => {
    const usedIds = new Set();
    return categories
        .filter((category) => category && String(category.name || '').trim())
        .map((category, index) => {
            let id = toSafeNumberId(category.id, Date.now() + index);
            while (usedIds.has(id)) id += 1;
            usedIds.add(id);
            return {
                id,
                name: String(category.name).trim(),
                bgColor: category.bgColor || '#f6b100'
            };
        });
};

const normalizeDishes = (dishes = []) => {
    const usedIds = new Set();
    return dishes
        .filter((dish) => dish && String(dish.name || '').trim() && String(dish.category || '').trim())
        .map((dish, index) => {
            let id = toSafeNumberId(dish.id, Date.now() + index + 1000);
            while (usedIds.has(id)) id += 1;
            usedIds.add(id);
            return {
                id,
                name: String(dish.name).trim(),
                price: Number(dish.price) || 0,
                category: String(dish.category).trim()
            };
        });
};

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
        const normalizedCategories = normalizeCategories(categories || []);
        const normalizedDishes = normalizeDishes(dishes || []);
        
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create(restBody);
        } else {
            settings = await Settings.findOneAndUpdate({}, restBody, { new: true });
        }
        
        if (categories) {
            await Category.deleteMany({});
            if (normalizedCategories.length > 0) {
                await Category.insertMany(normalizedCategories);
            }
        }
        if (dishes) {
            await Item.deleteMany({});
            if (normalizedDishes.length > 0) {
                await Item.insertMany(normalizedDishes);
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
