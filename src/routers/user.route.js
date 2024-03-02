const { Router } = require("express");
const getUsers = require("../controllers/user.controller");

const userRouter = Router();

userRouter.get("/", getUsers);

module.exports = userRouter;
