const express = require("express");
const getAllUsers = require("../controllers/user.controller");
const { verify } = require("../middlewares/auth.middleware");
const userRouter = express.Router();

userRouter.get("/findallusers", verify, getAllUsers);

module.exports = userRouter;