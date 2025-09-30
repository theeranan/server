// นำเข้า Express framework สำหรับสร้าง API Server
const express = require("express");
// สร้าง instance ของ Express application
const app = express();
// นำเข้า Morgan สำหรับ log HTTP requests
const morgan = require("morgan");
// นำเข้า Body Parser สำหรับแปลง request body เป็น JSON
const bodyParser = require("body-parser");

// นำเข้า readdirSync จาก fs เพื่ออ่านไฟล์ใน directory
const { readdirSync } = require("fs");
// นำเข้า CORS สำหรับอนุญาตให้ frontend เรียกใช้ API จากต่าง domain
const cors = require("cors");

// ใช้ Morgan ในโหมด dev เพื่อแสดง log ของ HTTP requests
app.use(morgan("dev"));
// ใช้ Body Parser เพื่อแปลง request body เป็น JSON อัตโนมัติ
app.use(bodyParser.json());
// ใช้ CORS เพื่ออนุญาตให้ frontend เข้าถึง API ได้
app.use(cors());

// Test endpoint - GET / - ทดสอบว่า server ทำงานหรือไม่
app.get("/", (req, res) => {
  // ส่ง JSON response กลับไปบอกว่า server ทำงานอยู่
  res.json({ message: "Dormitory API Server is running!" });
});

// Test endpoint - GET /api - ทดสอบว่า API ทำงานหรือไม่
app.get("/api", (req, res) => {
  // ส่ง JSON response พร้อม version ของ API
  res.json({ message: "API is working!", version: "1.0.0" });
});

// อ่านไฟล์ทั้งหมดใน folder ./routers และโหลดเป็น router
readdirSync("./routers").map((c) => {
  // แสดงชื่อ router ที่กำลังโหลด
  console.log("Loading router:", c);
  // ใช้ router แต่ละตัว โดยให้ base path เป็น /api
  app.use("/api", require("./routers/" + c));
});

// กำหนด PORT จาก environment variable หรือใช้ 3001 เป็นค่าเริ่มต้น
const PORT = process.env.PORT || 3001;

// เปิด server และ listen ที่ PORT ที่กำหนด
app.listen(PORT, () => {
  // แสดงข้อความว่า server กำลังทำงานที่ port ใด
  console.log(`Server is running on port ${PORT}`);
  console.log("\n=== Available API Routes ===\n");

  // แสดงรายการ API endpoints ทั้งหมดที่มีในระบบ
  console.log("POST    /api/register");               // สมัครสมาชิก
  console.log("POST    /api/login");                  // เข้าสู่ระบบ
  console.log("GET     /api/auth/users");             // ดูข้อมูล users ทั้งหมด
  console.log("GET     /api/users");                  // ดูรายชื่อ users
  console.log("PATCH   /api/users/:userId");          // แก้ไขข้อมูล user
  console.log("DELETE  /api/users/:userId");          // ลบ user
  console.log("");
  console.log("GET     /api/rooms");                  // ดูห้องทั้งหมด
  console.log("GET     /api/rooms/available");        // ดูห้องว่าง
  console.log("GET     /api/rooms/:roomNumber");      // ดูข้อมูลห้องเดียว
  console.log("POST    /api/rooms");                  // สร้างห้องใหม่
  console.log("PATCH   /api/rooms/:roomNumber");      // แก้ไขข้อมูลห้อง
  console.log("DELETE  /api/rooms/:roomNumber");      // ลบห้อง
  console.log("");
  console.log("GET     /api/customers");              // ดูลูกค้าทั้งหมด
  console.log("GET     /api/customers/active");       // ดูลูกค้าที่อยู่ในหอพัก
  console.log("GET     /api/customers/:customerId");  // ดูข้อมูลลูกค้าคนเดียว
  console.log("POST    /api/customers");              // สร้างลูกค้าใหม่
  console.log("PATCH   /api/customers/:customerId");  // แก้ไขข้อมูลลูกค้า
  console.log("PATCH   /api/customers/:customerId/checkout"); // Check-out ลูกค้า
  console.log("DELETE  /api/customers/:customerId");  // ลบลูกค้า
  console.log("");
  console.log("GET     /api/payments");               // ดูบิลทั้งหมด
  console.log("GET     /api/payments/unpaid");        // ดูบิลที่ยังไม่จ่าย
  console.log("GET     /api/payments/room/:roomNumber"); // ดูบิลตามห้อง
  console.log("GET     /api/payments/:payId");        // ดูบิลเดียว
  console.log("POST    /api/payments");               // สร้างบิลใหม่
  console.log("PATCH   /api/payments/:payId");        // แก้ไขบิล
  console.log("PATCH   /api/payments/:payId/pay");    // ชำระเงิน
  console.log("DELETE  /api/payments/:payId");        // ลบบิล
  console.log("");
  console.log("GET     /api/repairs");                // ดูรายการแจ้งซ่อมทั้งหมด
  console.log("GET     /api/repairs/pending");        // ดูรายการแจ้งซ่อมที่รอดำเนินการ
  console.log("GET     /api/repairs/room/:roomNumber"); // ดูรายการแจ้งซ่อมตามห้อง
  console.log("GET     /api/repairs/:repairId");      // ดูรายการแจ้งซ่อมเดียว
  console.log("POST    /api/repairs");                // สร้างรายการแจ้งซ่อมใหม่
  console.log("PATCH   /api/repairs/:repairId");      // แก้ไขรายการแจ้งซ่อม
  console.log("PATCH   /api/repairs/:repairId/status"); // อัพเดทสถานะการซ่อม
  console.log("DELETE  /api/repairs/:repairId");      // ลบรายการแจ้งซ่อม
  console.log("");
  console.log("GET     /api/employees");              // ดูพนักงานทั้งหมด
  console.log("GET     /api/employees/active");       // ดูพนักงานที่ทำงานอยู่
  console.log("GET     /api/employees/:empId");       // ดูข้อมูลพนักงานคนเดียว
  console.log("POST    /api/employees");              // สร้างพนักงานใหม่
  console.log("PATCH   /api/employees/:empId");       // แก้ไขข้อมูลพนักงาน
  console.log("DELETE  /api/employees/:empId");       // ลบพนักงาน

  console.log("\n============================\n");
});
