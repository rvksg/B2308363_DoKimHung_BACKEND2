const express = require("express");
const cors = require("cors");

const app = express();
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

//handle 404 response
app.use((req, res, next) => {
    //Code o day se chay khi khong co route duoc dinh nghia nao
    //khop voi yeu cau. Goi next() de chuyen sang muddleware xu ly loi
    console.log(`Request URL: ${req.originalUrl}`);
    return next(new ApiError(404, "Response not found"));
});

//define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    //Middleware xu ly loi tap trung
    //Trong cac doan code xu ly o cac route, goi next(error) se chuyen ve middleware xu ly loi nay
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

app.get("/", (req, res) => {
    console.log("Root endpoint accessed");
    res.json({ message: "Welcome to contact book application."});
});

module.exports = app;