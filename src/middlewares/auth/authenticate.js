var jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("token");
  try {
    const decoded = jwt.verify(token, "minhlq");
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res.status(401).send({
        success: false,
        code: 401,
        content: { message: "Bạn chưa đăng nhập" },
      });
    }
  } catch (error) {
    res.status(401).send({
      success: false,
      code: 401,
      content: { message: "Bạn chưa đăng nhập" },
    });
  }
};

module.exports = { authenticate };
