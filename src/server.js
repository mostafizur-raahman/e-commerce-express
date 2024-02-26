const express = require("express");
const app = express();
const PORT = 3000;
const morgen = require("morgan");
const bodyParser = require("body-parser");

//middleware
app.use(morgen("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const isLoggin = (req, res, next) => {
    const login = 1;
    if (login) next();
    else {
        return res.status(401).json({
            message: "please login first",
        });
    }
};

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
    res.status(404).json({ message: "Not Found." });
    next();
});

// server error handeler
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Internal Server Error.");
});
app.listen(PORT, () => {
    console.log(`SERVER is running on port ${PORT}`);
});
