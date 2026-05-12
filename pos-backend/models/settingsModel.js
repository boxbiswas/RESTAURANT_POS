const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    currency: { type: String, default: 'INR' },
    taxPercent: { type: String, default: '5' },
    serviceCharge: { type: String, default: '0' },
    allowDiscounts: { type: Boolean, default: true },
    discountPercent: { type: String, default: '0' },
    receiptFooter: { type: String, default: 'Thank you for dining with us. Visit again!' },
    restaurantName: { type: String, default: 'Restro Cafe' }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
