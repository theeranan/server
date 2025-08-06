const express = require("express");
const router = express.Router();
const { list, update, remove } = require("../controllers/user");
const { auth } = require("../middleware/auth");

// /api/users
router.get("/users", auth, list);

//update /api/users/:userId
router.patch("/users/:userId", update);

// delete /api/users/:userId
router.delete("/users/:userId", auth, remove);

module.exports = router;
