const express = require('express');
const router = express.Router();
const { createUserAccount } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/create', authMiddleware, roleMiddleware(['admin']), createUserAccount);

module.exports = router;
