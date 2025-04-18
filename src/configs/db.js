const mongoose = require("mongoose");

const dbconnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database connection successfull....");
  } catch (err) {
    console.log(
      "Something went wrong while connecting to the database....",
      err.message
    );
  }
};

module.exports = dbconnection;
