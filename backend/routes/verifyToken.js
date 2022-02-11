const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "jwtkey", (err, user) => {
      if (err) res.status(403).json("Token invalid");
      next();
    });
  } else {
    return res.status(401).json("User not authenticated");
  }
};

module.exports = { verifyToken };
