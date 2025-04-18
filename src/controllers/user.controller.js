const User = require("../models/user.model.js");


const getAllUsers =async (req, res)=>{
   try {
     const user = await User.find();
     if(!user){
         return res.status(404).json("user not found...");
     }
     return res.status(200).json({user, message: "user fetched successfully..."})
    } catch (error) {
       return res.status(500).json(error)
    
   }
}

module.exports = getAllUsers