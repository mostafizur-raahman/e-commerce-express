const users = require("../models/user.model");
const getUsers = (req, res, next) => {
    try {
        res.status(200).json({
            message: "user fetched successfully",
            users,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getUsers;
