const express = require("express");
const router = express.Router();
const { list, getOne, create, update, remove, updateStatus, getPending, getByRoom } = require("../controllers/repair");
const { auth } = require("../middleware/auth");

// GET /api/repairs - ดูรายการแจ้งซ่อมทั้งหมด
router.get("/repairs", auth, list);

// GET /api/repairs/pending - ดูรายการแจ้งซ่อมที่รอดำเนินการ
router.get("/repairs/pending", auth, getPending);

// GET /api/repairs/room/:roomNumber - ดูรายการแจ้งซ่อมตามห้อง
router.get("/repairs/room/:roomNumber", auth, getByRoom);

// GET /api/repairs/:repairId - ดูรายการแจ้งซ่อมเดียว
router.get("/repairs/:repairId", auth, getOne);

// POST /api/repairs - สร้างรายการแจ้งซ่อมใหม่
router.post("/repairs", auth, create);

// PATCH /api/repairs/:repairId - แก้ไขรายการแจ้งซ่อม
router.patch("/repairs/:repairId", auth, update);

// PATCH /api/repairs/:repairId/status - อัพเดทสถานะการซ่อม
router.patch("/repairs/:repairId/status", auth, updateStatus);

// DELETE /api/repairs/:repairId - ลบรายการแจ้งซ่อม
router.delete("/repairs/:repairId", auth, remove);

module.exports = router;