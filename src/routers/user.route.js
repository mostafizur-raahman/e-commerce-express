const { Router } = require("express");
const {
    getUsers,
    getUserById,
    deleteUserById,
} = require("../controllers/user.controller");

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUserById);

module.exports = userRouter;
