const { MongooseError } = require("mongoose");
const { successResponse } = require("../helpers/responseControllers");
const User = require("../models/user.model");
const createError = require("http-errors");
const { findWithId } = require("../repositories/baserepository");
const fs = require("fs");

const getUsers = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

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
            __v: 0,
        };

        const users = await User.find(filter, options)
            .limit(limit)
            .skip((page - 1) * limit);

        if (!users) throw createError(404, "User not found.");

        // calculate toatl user length
        const userCount = await User.find(filter).countDocuments();

        // return res.status(200).json({
        //     message: "user fetched successfully",
        //     users,
        //     paigination: {
        //         totalPage: Math.ceil(userCount / limit),
        //         currentPage: page,
        //         previousPage: page - 1 > 0 ? page - 1 : null,
        //         nextPage:
        //             page + 1 <= Math.ceil(userCount / limit) ? page + 1 : null,
        //     },
        // });

        return successResponse(res, {
            statusCode: 200,
            message: "user fetched succesfully",
            payload: {
                users,
                paigination: {
                    totalPage: Math.ceil(userCount / limit),
                    currentPage: page,
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    nextPage:
                        page + 1 <= Math.ceil(userCount / limit)
                            ? page + 1
                            : null,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const options = {
            password: 0,
        };
        const user = await findWithId(id, options);

        return successResponse(res, {
            statusCode: 200,
            message: "user fetched succesfully",
            payload: {
                user: user,
            },
        });
    } catch (error) {
        if (error instanceof MongooseError) {
            next(createError(400, "Invalid id, please enter valid id."));
        }
        next(error);
    }
};

const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await findWithId(id);
        const userImagePath = user?.image;

        fs.access(userImagePath, (err) => {
            if (err) {
                console.error("Image does not exist");
            } else {
                fs.unlink(userImagePath, (err) => {
                    if (err) throw err;
                    console.log("User image was deleted");
                });
            }
        });

        const deleteUser = await User.findByIdAndDelete({
            _id: id,
            isAdmin: false,
        });
        if (!deleteUser) throw createError(404, "user not found");

        return successResponse(res, {
            statusCode: 200,
            message: "user delete succesfully",
        });
    } catch (error) {
        if (error instanceof MongooseError) {
            next(createError(400, "Invalid id, please enter valid id."));
        }
        next(error);
    }
};
module.exports = {
    getUsers,
    getUserById,
    deleteUserById,
};
