const express = require("express");
const app = express();
const PORT = 3000;
const morgen = require("morgan");

//middleware
app.use(morgen("dev"));

app.get("/users", (req, res) => [
    res.send({
        message: "Hi users",
    }),
]);
app.listen(PORT, () => {
    console.log(`SERVER is running on port ${PORT}`);
});
