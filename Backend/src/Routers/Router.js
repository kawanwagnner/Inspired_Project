// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

router.post("/api/signUp", userController.createUser);

module.exports = router;
