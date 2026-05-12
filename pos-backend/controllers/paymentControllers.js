const Razorpay = require('razorpay');
const config = require('../config/config');
const crypto = require('crypto');

const createOrder = async (req, res, next) => {
    try {
        if (!config.RAZORPAY_KEY_ID || !config.RAZORPAY_KEY_SECRET) {
            return res.status(500).json({
                success: false,
                message: 'Razorpay credentials are missing in backend environment',
                debug: {
                    hasKeyId: !!config.RAZORPAY_KEY_ID,
                    hasKeySecret: !!config.RAZORPAY_KEY_SECRET
                }
            });
        }

        const razorpay = new Razorpay({
            key_id: config.RAZORPAY_KEY_ID,
            key_secret: config.RAZORPAY_KEY_SECRET
        });

        const amount = Number(req.body?.amount);

        if (!Number.isFinite(amount) || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Amount must be greater than 0'
            });
        }

        const amountInPaise = Math.round(amount * 100);
        if (amountInPaise < 100) {
            return res.status(400).json({
                success: false,
                message: 'Minimum order amount is INR 1.00'
            });
        }

        const options = {
            amount: amountInPaise,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json({
            success: true,
            key: config.RAZORPAY_KEY_ID,
            order
        });

    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        console.error('Error details:', {
            statusCode: error?.statusCode,
            message: error?.message,
            errorObject: error?.error,
            fullError: error
        });
        const statusCode = error?.statusCode || 500;
        const razorpayError = error?.error || {};
        const message = razorpayError?.description || error?.message || 'Failed to create order';
        res.status(statusCode).json({
            success: false,
            message,
            code: razorpayError?.code,
            reason: razorpayError?.reason,
            field: razorpayError?.field,
            metadata: razorpayError?.metadata,
        });
    }
}

const verifyPayment = async (req, res, next) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Missing required payment verification fields'
            });
        }

        const expectedSignature = crypto.createHmac('sha256', config.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            res.json({ success: true, message: 'Payment verified successfully' });
        } else {
            res.status(400).json({
                success: false,
                message: 'Payment verification failed'
            });
        }
    }
    catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({
            success: false,
            message: 'Error verifying payment',
            error: error.message
        });
    }
}

const webHookVerification = async (req, res, next) => {
    try {
        const secret = config.RAZORPAY_KEY_SECRET;
        const signature = req.headers['x-razorpay-signature'];
        const body = JSON.stringify(req.body);
        const expectedSignature = crypto.createHmac('sha256', secret)
            .update(body)
            .digest('hex');
        if (signature === expectedSignature) {
            console.log('Webhook verified successfully');

            if (req.body.event === 'payment.captured') {
                const payment = req.body.payload.payment.entity;
                console.log(`Payment captured: ${payment.amount / 100} INR`);
            }
            res.json({ success: true, message: 'Webhook verified successfully' });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Webhook verification failed'
            });
        }

    } catch (error) {
        console.error('Error in webhook verification:', error);
        res.status(500).json({
            success: false,
            message: 'Error verifying webhook',
            error: error.message
        });
    }
} 

module.exports = {
    createOrder,
    verifyPayment,
    webHookVerification
}