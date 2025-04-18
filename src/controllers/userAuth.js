const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
// register user
const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json("All filds are required...");
    }
    // find the existed user
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json("User already existed...");
    }
    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10);
   
    const crestedUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ user: crestedUser, message: "User created Successfully.." });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while Registering user...",
      error: error.message,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("All filds are required...");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("User is not existed...");
    }
    const isMatchedPassword = await bcrypt.compare(password, user.password);
    if (!isMatchedPassword) {
      return res.status(400).json(" users credentials invalids...");
    }
    const accessToken = await jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    // console.log("access usr ", accessToken)
    // verification link

    return res
      .status(201)
      .json({ user, accessToken, message: "User logged in Successfully.." });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while login user...",
      error: error.message,
    });
  }
};

module.exports = { register, login };
