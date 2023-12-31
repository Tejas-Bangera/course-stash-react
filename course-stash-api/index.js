const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");

const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const dotenv = require("dotenv");
dotenv.config();

const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.use(express.static("public"));
app.get("/", (req, res) => res.json({ msg: "hello world" }));

mongoose.connect(`${process.env.MONGO_DB_URL}/CourseWebsiteDB`);

app.listen(3000, () => console.log("Server running on port 3000"));
