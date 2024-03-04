const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routers/user.route");
const seedRouter = require("./routers/seed.router");
const app = express();

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 min
    max: 100,
    message: "Too many request at 1 min",
});
//middleware
app.use(rateLimiter);
app.use(morgan("dev"));
app.use(xssClean());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// router middleware
app.use("/api/v1/users", userRouter);
app.use("/api/v1/seed", seedRouter);

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
