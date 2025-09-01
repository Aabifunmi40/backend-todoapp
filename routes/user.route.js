const express= require("express");
const {signUp,signIn}= require("../controllers/user.controller");
const authValidator = require("../middleware/authvalidator")
const userRouter= express.Router();


userRouter.route("/signup").post(signUp);
userRouter.route("/signin").post(signIn);

userRouter.get("/", authValidator)


module.exports=userRouter;
