const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbconnection = require("./configs/db");
const authRouter = require("./routers/auth.routes");
const userRouter = require("./routers/user.router");
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

// Middlewares
app.use(
  cors({
    origin: "*", // adjust to your frontend
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: "http://3.108.228.92:80", // 👈 your actual frontend domain or IP
//     credentials: true,
//   })
// );
//routers
app.use("/api/v1", authRouter);
app.use("/api/v1/users", userRouter);
app.get("/ram", (req, res) => {
  res.send("Hello Ram!");
});
// db connection
dbconnection();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

