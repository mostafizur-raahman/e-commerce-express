const { MongooseError } = require("mongoose");
const User = require("../models/user.model");
const createError = require("http-errors");

const findWithId = async (id, options = {}) => {
    try {
        const _doc = await User.findById(id, options);

        if (!_doc) {
            throw createError(404, "Item not found");
        }

        return _doc;
    } catch (error) {
        if (error instanceof MongooseError) {
            throw createError(400, "Invalid id, please enter valid id.");
        }
        throw error;
    }
};

const deleteWithId = async (id, options = {}) => {
    try {
        const _doc = await User.findById(id, options);

        if (!_doc) {
            throw createError(404, "Item not found");
        } else {
        }

        return _doc;
    } catch (error) {
        if (error instanceof MongooseError) {
            throw createError(400, "Invalid id, please enter valid id.");
        }
        throw error;
    }
};

module.exports = {
    findWithId,
};
