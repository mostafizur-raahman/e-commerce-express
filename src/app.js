const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");
//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/users", (req, res) => [
    res.send({
        message: "Hi users",
    }),
]);

app.get("/profile", (req, res) => [
    res.status(200).json({
        message: "Hi Profile",
    }),
]);

//client error handeler
app.use((req, res, next) => {
    next(createError(404, "Not Found."));
});

// server error handeler
app.use((err, req, res, next) => {
    console.log(err.stack);
    return res.status(err.status || 500).json({
        success: false,
        message: err.message,
    });
});

module.exports = app;
