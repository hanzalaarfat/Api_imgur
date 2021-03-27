const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  console.log(`middleware token from : ${req.cookies.jwt}`);
  try {
    var token = req.cookies.jwt;
    var decode = jwt.verify(token, "credentials");
    req.userData = decode;
    next();
  } catch (err) {
    res.status(401).json({
      err: "invalid token",
    });
  }
};
