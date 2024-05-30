var express = require('express');
const UserController = require("../controllers/UserController");
const auth = require("../middlewares/authentication");
var userRouter = express.Router();

userRouter.post("/login", UserController.loginUser)
userRouter.post("/register", UserController.registerUser)
userRouter.use(auth)
userRouter.delete("/{id}", UserController.deleteUser)
userRouter.put("/{id}", UserController.updateUsername)

module.exports = userRouter;
