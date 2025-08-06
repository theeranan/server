const prisma = require("../prisma/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("react");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const checkUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (checkUser) {
      return res.status(409).json({
        message: "Email already exits",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userData = {
      email: email,
      password: hashPassword,
    };

    const newUser = await prisma.user.create({
      data: userData,
      select: {
        id: true,
        email: true,
      },
    });
    res.json({
      message: "Register Success!!!",
    });
  } catch (err) {
    console.log(err);
    res.send("Server Error").status(500);
  }
};

exports.login = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    const { email, password } = req.body;
    // เช็คว่า email และ password ถูกส่งมาหรือไม่ และไม่สนใจตัวแปรอื่นๆ

    // เช็คว่า email ไหม ถ้าไม่มีให้ return statusCode 400 พร้อมข้อความว่า "Email is required!!"

    if (!email) {
      return res.status(400).json({ message: "Email is required!!" });
    }

    // เช็คว่า password ไหม ถ้าไม่มีให้ return statusCode 400 พร้อมข้อความว่า "Password is required!!"
    if (!password) {
      return res.status(400).json({ message: "Password is required!!" });
    }

    // ค้นหา user ในฐานข้อมูลโดยใช้ email
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    // ถ้าไม่พบ user ให้ return statusCode 400 พร้อมข้อความว่า "Invalid Credentials!!"
    if (!user) {
      return res.status(400).json({ message: "Inavlid Credentials!!" });
    }

    // เช็คว่า password ตรงกับที่เก็บไว้ในฐานข้อมูลหรือไม่
    // ใช้ bcrypt.compare เพื่อเปรียบเทียบ password ที่ผู้ใช้ป้อนกับ hash ที่เก็บไว้ในฐานข้อมูล
    const isMatch = await bcrypt.compare(password, user.password);

    // ถ้าไม่ตรงให้ return statusCode 400 พร้อมข้อความว่า "Password is not match!!"
    if (!isMatch) {
      return res.status(400).json({ message: "Password is not match!!" });
    }
    // เตรียม payload สำหรับสร้าง JWT token
    // payload จะเก็บข้อมูลที่ต้องการใน token เช่น user id, email, role
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };

    // สร้าง JWT token โดยใช้ jwt.sign เวลา 1d คือ 1 วัน
    const token = jwt.sign(payload, "kaika", {
      expiresIn: "1d",
    });
    console.log(token);

    // ส่ง response กลับไปยังผู้ใช้ พร้อมกับข้อมูล user และ token ที่สร้างขึ้น
    res.json({
      users: payload.user,
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "Server Error" }).status(500);
  }
};
exports.user = (req, res) => {
  // ตัวอย่าง response
  res.json({ message: "User data from controller" });
};
