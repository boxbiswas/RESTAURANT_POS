const express = require('express');
const { resetDatabase } = require('../controllers/devController');

const router = express.Router();

router.post('/reset', resetDatabase);

module.exports = router;