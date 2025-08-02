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
    if (!email) {
      return res.status(400).json({ message: "Email is required!!" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required!!" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "Inavlid Credentials!!",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Password is not match!!",
      });
    }
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
    const token = jwt.sign(payload, "kaika", {
      expiresIn: "1d",
    });
    console.log(token);

    res.json({
      users: payload.user,
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "Server Error" }).status(500);
  }
};
