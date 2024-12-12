require("dotenv").config();
const express = require("express");
const apiRouter = require("./routes/apiRoute");

const app = express();
const port = process.env.PORT;

// Middleware để parse JSON từ body
app.use(express.json());

// Middleware để parse dữ liệu từ form-encoded
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/phanquyen", apiRouter);

app.listen(port, () => console.log("listening on port " + port));
