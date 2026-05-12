const Order = require("../models/orderModel");
const createHttpError = require("http-errors");

const addOrder = async (req, res, next) => {

    try {
        
        const order = new Order(req.body);
        await order.save();
        res.status(201).json({ success: true, message: "Order added successfully", data: order });

    } catch (error) {
        return next(error);
    }

}

const getOrderById = async (req, res, next) => {

    try {
        
        const order = await Order.findById(req.params.id);
        if (!order) {
            const error = createHttpError(404, "Order not found");
            return next(error);
        }

        res.status(200).json({ success: true, data: order });

    } catch (error) {
        return next(error);
    }

}

const getOrders = async (req, res, next) => {

    try {
        
        const orders = await Order.find();
        res.status(200).json({ success: true, data: orders });

    } catch (error) {
        return next(error);
    }

}

const updateOrder = async (req, res, next) => {

    try {
        
        const { ordersStatus } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { orderStatus: ordersStatus },
            { new: true }
        );

        if (!order) {
            const error = createHttpError(404, "Order not found");
            return next(error);
        }
        res.status(200).json({ success: true, message: "Order updated successfully", data: order });

    } catch (error) {
        return next(error);
    }

}

module.exports = {
    addOrder,
    getOrderById,
    getOrders,
    updateOrder
}