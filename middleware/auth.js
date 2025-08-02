const jwt = require("jsonwebtoken");
exports.auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({
        message: "No token, authorization denied!!",
      });
    }
    const verifyToken = jwt.verify(token, "kaika", (err, decode) => {
      if (err) {
        return res.status(401).json({ message: "Token is not invalid" });
      } else {
        console.log(decode);
        req.iser = decode;
        req.user = verified;
        next();
      }
    });
  } catch (err) {
    console.log("Something wrong in middleware");
    res.status(500).json({ message: "Server Error!!" });
  }
};
