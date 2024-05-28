// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.post('/signUp', userController.createUser);

module.exports = router;
