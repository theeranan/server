const express = require("express");
const router = express.Router();
const { list, update, remove } = require("../controllers/user");
const { auth } = require("../middleware/auth");
router.get("/users", auth, list);
router.patch("/users/:userId", update);
router.delete("/users/:userId", auth, remove);

module.exports = router;
