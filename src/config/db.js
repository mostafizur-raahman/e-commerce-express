const mongoose = require("mongoose");
const { mongoURL } = require("../secret");

const connectDB = async (options = {}) => {
    try {
        // connect database
        await mongoose.connect(mongoURL, options);
        console.log(`Connected to mongodb...`);

        // mongodb connection error
        mongoose.connection.on("error", (error) => {
            console.error(`DB connection errror : ${error}`);
        });
    } catch (error) {
        console.error("Could not connect to DB ", error.toString());
    }
};

module.exports = connectDB;
