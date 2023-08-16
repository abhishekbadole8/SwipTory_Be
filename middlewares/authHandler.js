const jwt = require("jsonwebtoken");

const authHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization || req.headers.Authorization;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization Denied, Token Not Present" });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authHandler;
