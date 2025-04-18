const jwt = require("jsonwebtoken");

const verify = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    // console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decoded; // <-- this line was previously `res.user = decoded`
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = { verify };
