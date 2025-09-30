const express = require("express");
const router = express.Router();
const { list, getOne, create, update, remove, getActive } = require("../controllers/employee");
const { auth } = require("../middleware/auth");

// GET /api/employees - ดูพนักงานทั้งหมด
router.get("/employees", auth, list);

// GET /api/employees/active - ดูพนักงานที่ทำงานอยู่
router.get("/employees/active", auth, getActive);

// GET /api/employees/:empId - ดูพนักงานคนเดียว
router.get("/employees/:empId", auth, getOne);

// POST /api/employees - สร้างพนักงานใหม่
router.post("/employees", auth, create);

// PATCH /api/employees/:empId - แก้ไขข้อมูลพนักงาน
router.patch("/employees/:empId", auth, update);

// DELETE /api/employees/:empId - ลบพนักงาน
router.delete("/employees/:empId", auth, remove);

module.exports = router;