const jwt = require("jsonwebtoken");

const authHandler = async (req, res, next) => {
  try {
    // Extract the token from the authorization header
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Authorization denied. Token not provided." });
    }

    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.user._id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authHandler;
