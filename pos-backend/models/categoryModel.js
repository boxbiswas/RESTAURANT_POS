const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    bgColor: { type: String, default: '#f6b100' }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
