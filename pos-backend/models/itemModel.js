const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
