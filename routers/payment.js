const express = require("express");
const router = express.Router();
const { list, getOne, create, update, remove, payBill, getUnpaid, getByRoom } = require("../controllers/payment");
const { auth } = require("../middleware/auth");

// GET /api/payments - ดูบิลทั้งหมด
router.get("/payments", auth, list);

// GET /api/payments/unpaid - ดูบิลที่ยังไม่จ่าย
router.get("/payments/unpaid", auth, getUnpaid);

// GET /api/payments/room/:roomNumber - ดูบิลตามห้อง
router.get("/payments/room/:roomNumber", auth, getByRoom);

// GET /api/payments/:payId - ดูบิลเดียว
router.get("/payments/:payId", auth, getOne);

// POST /api/payments - สร้างบิลใหม่
router.post("/payments", auth, create);

// PATCH /api/payments/:payId - แก้ไขบิล
router.patch("/payments/:payId", auth, update);

// PATCH /api/payments/:payId/pay - ชำระเงิน
router.patch("/payments/:payId/pay", auth, payBill);

// DELETE /api/payments/:payId - ลบบิล
router.delete("/payments/:payId", auth, remove);

module.exports = router;