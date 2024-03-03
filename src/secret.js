require("dotenv").config();
const serverPort = process.env.SERVER_PORT || 3001;
const mongoURL = process.env.DATABASE_URI || "mongodb://localhost:27017";

module.exports = {
    serverPort,
    mongoURL,
};
