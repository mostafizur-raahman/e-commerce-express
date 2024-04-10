const { Router } = require("express");
const { getUsers, getUserById } = require("../controllers/user.controller");

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
module.exports = userRouter;
