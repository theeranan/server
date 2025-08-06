const express = require("express");
const router = express.Router();
const { register, login, user } = require("../controllers/auth");

// Register //api/register
router.post("/register", register);

// Login //api/login
router.post("/login", login);

//ไม่มี /api/auth/user

router.get("/auth/users", user);

module.exports = router;
