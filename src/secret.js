require("dotenv").config();
const serverPort = process.env.SERVER_PORT || 3001;
const mongoURL = process.env.DATABASE_URI || "mongodb://localhost:27017";
const defaultImagePath =
    process.env.DEFAULT_USER_IMAGE_PATH ||
    "/public/images/users/Sample_User_Icon.png";

module.exports = {
    serverPort,
    mongoURL,
    defaultImagePath,
};
