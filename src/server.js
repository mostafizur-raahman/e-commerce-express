const express = require("express");
const app = express();
const PORT = 3000;
const morgen = require("morgan");

//middleware
app.use(morgen("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const isLoggin = (req, res, next) => {
    const login = 0;
    if (login) next();
    else {
        return res.status(401).send({
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
    res.status(200).send({
        message: "Hi Profile",
    }),
]);
app.listen(PORT, () => {
    console.log(`SERVER is running on port ${PORT}`);
});
