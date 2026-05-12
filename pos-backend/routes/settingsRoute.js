const express = require('express');
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { isVerifiedUser } = require('../middleware/tokenVerification');
const router = express.Router();

router.route('/').get(isVerifiedUser, getSettings);
router.route('/').put(isVerifiedUser, updateSettings);

module.exports = router;
