const app = require("./app.js");
const connectDB = require("./config/db.js");
const { serverPort } = require("./secret.js");

app.listen(serverPort, () => {
    console.log(`SERVER is running on port ${serverPort}`);

    // calling database
    connectDB();
});
