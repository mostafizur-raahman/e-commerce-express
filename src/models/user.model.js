const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const { defaultImagePath } = require("../secret");

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "User name is required"],
            trim: true,
            minlength: [3, "min length is 4th char"],
        },
        email: {
            type: String,
            required: [true, "User email is required"],
            trim: true,
            unique: true,
            lowercase: true,
            validate: {
                validator: (v) => {
                    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
                        v
                    );
                },
                message: "Please enter a valid email",
            },
        },
        password: {
            type: String,
            required: [true, "User password is required."],
            minlength: [5, "Password must ne more than 4 char"],
            set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
        },
        image: {
            type: String,
            default: defaultImagePath,
        },
        address: {
            type: String,
            required: [true, "User address is required"],
        },
        phone: {
            type: String,
            required: [true, "User phone is required"],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isBanned: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const User = model("User", userSchema);

module.exports = User;
