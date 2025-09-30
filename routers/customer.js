const express = require("express");
const router = express.Router();
const { list, getOne, create, update, remove, getActive, checkout } = require("../controllers/customer");
const { auth } = require("../middleware/auth");

// GET /api/customers - ดูลูกค้าทั้งหมด
router.get("/customers", auth, list);

// GET /api/customers/status/active - ดูลูกค้าที่อยู่ในหอพัก
router.get("/customers/status/active", auth, getActive);

// GET /api/customers/:customerId - ดูลูกค้าคนเดียว
router.get("/customers/:customerId", auth, getOne);

// POST /api/customers - สร้างลูกค้าใหม่ (ต้อง auth)
router.post("/customers", auth, create);

// PATCH /api/customers/:customerId - แก้ไขข้อมูลลูกค้า (ต้อง auth)
router.patch("/customers/:customerId", auth, update);

// PATCH /api/customers/:customerId/checkout - Check-out ลูกค้า (ต้อง auth)
router.patch("/customers/:customerId/checkout", auth, checkout);

// DELETE /api/customers/:customerId - ลบลูกค้า (ต้อง auth)
router.delete("/customers/:customerId", auth, remove);

module.exports = router;