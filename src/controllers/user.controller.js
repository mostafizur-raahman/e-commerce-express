const User = require("../models/user.model");
const createError = require("http-errors");
const getUsers = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = req.query.limit || 5;

        const searchRegEx = new RegExp(".*" + search + ".*", "i");

        // admin liftering and searching unsing name, email, phone
        const filter = {
            isAdmin: { $ne: true },
            $or: [
                { name: { $regex: searchRegEx } },
                { email: { $regex: searchRegEx } },
                { phone: { $regex: searchRegEx } },
            ],
        };

        // apply  peojection
        const options = {
            password: 0,
        };

        const users = await User.find(filter, options)
            .limit(limit)
            .skip((page - 1) * limit);

        if (!users) throw createError(404, "User not found.");

        // calculate toatl user length
        const userCount = await User.find(filter).countDocuments();

        return res.status(200).json({
            message: "user fetched successfully",
            users,
            paigination: {
                totalPage: Math.ceil(userCount / limit),
                currentPage: page,
                previousPage: page - 1 > 0 ? page - 1 : null,
                nextPage:
                    page + 1 <= Math.ceil(userCount / limit) ? page + 1 : null,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getUsers;
