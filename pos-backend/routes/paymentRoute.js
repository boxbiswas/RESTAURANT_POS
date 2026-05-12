const express = require('express');
const router = express.Router();
const { isVerifiedUser } = require('../middleware/tokenVerification');
const { createOrder, verifyPayment, webHookVerification } = require('../controllers/paymentControllers');

router.route('/create-order').post( isVerifiedUser, createOrder);
router.route('/verify-payment').post( isVerifiedUser, verifyPayment);
router.route('/webhook-verification').post(webHookVerification);

module.exports = router;
