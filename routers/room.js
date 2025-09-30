const express = require("express");
const router = express.Router();
const { list, getOne, create, update, remove, getAvailable } = require("../controllers/room");
const { auth } = require("../middleware/auth");

// GET /api/rooms - ดูห้องทั้งหมด
router.get("/rooms", list);

// GET /api/rooms/available - ดูห้องว่าง
router.get("/rooms/available", getAvailable);

// GET /api/rooms/:roomNumber - ดูห้องเดียว
router.get("/rooms/:roomNumber", getOne);

// POST /api/rooms - สร้างห้องใหม่ (ต้อง auth)
router.post("/rooms", auth, create);

// PATCH /api/rooms/:roomNumber - แก้ไขข้อมูลห้อง (ต้อง auth)
router.patch("/rooms/:roomNumber", auth, update);

// DELETE /api/rooms/:roomNumber - ลบห้อง (ต้อง auth)
router.delete("/rooms/:roomNumber", auth, remove);

module.exports = router;