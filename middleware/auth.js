// นำเข้า jsonwebtoken สำหรับตรวจสอบ JWT token
const jwt = require("jsonwebtoken");

// Middleware สำหรับตรวจสอบการ authentication ของ user
exports.auth = (req, res, next) => {
  try {
    // ดึง token จาก header ชื่อ "x-auth-token"
    const token = req.header("x-auth-token");

    // ถ้าไม่มี token ส่ง status 401 (Unauthorized) กลับไป
    if (!token) {
      return res.status(401).json({
        message: "No token, authorization denied!!", // ไม่มี token, ปฏิเสธการเข้าถึง
      });
    }

    // ตรวจสอบความถูกต้องของ token ด้วย secret key "kaika"
    const verified = jwt.verify(token, "kaika");

    // เก็บข้อมูล user จาก token ลงใน req.user เพื่อใช้ใน controller
    req.user = verified.user;

    // เรียก next() เพื่อไปยัง middleware หรือ controller ถัดไป
    next();
  } catch (err) {
    // ถ้าเกิด error (token ไม่ถูกต้อง หรือหมดอายุ)
    console.log("Something wrong in middleware", err);
    // ส่ง status 401 พร้อมข้อความว่า token ไม่ถูกต้อง
    res.status(401).json({ message: "Token is not valid" });
  }
};
