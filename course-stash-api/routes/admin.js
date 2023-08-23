const mongoose = require("mongoose");
const express = require("express");
const { User, Course, Admin } = require("../db");
const jwt = require("jsonwebtoken");
const { validateJWT } = require("../middleware/auth");

const router = express.Router();

/**
 * __Function to generate JWT token that expires in 1hr__
 * @param {*} user
 * @returns `token`
 */
function generateJWT(user) {
  return jwt.sign(user, `${process.env.SECRET_KEY}`, { expiresIn: "1h" });
}

// Admin routes
// Admin Sign up
router.post("/signup", async (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    // If admin already exists
    if (admin)
      return res
        .status(403)
        .json({ message: `Admin ${username} already exists` });

    const newAdmin = new Admin({ username, password });
    await newAdmin.save();

    // Generate JWT Token
    const token = generateJWT({ username, role: "admin" });
    return res.json({ message: "Admin created successfully", token });
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * __Function to validate login credentials of an Admin__
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next Next
 * @returns Response status `401` if login credentials are invalid
 */
async function adminAuthentication(req, res, next) {
  const { username, password } = req.headers;

  try {
    const admin = await Admin.findOne({ username, password });
    // If admin is not valid
    if (!admin)
      return res.status(401).json({ message: "Invalid login credentials" });

    req.user = admin;
    next();
  } catch (error) {
    return res.status(500).send(error);
  }
}

// Admin Login
router.post("/login", adminAuthentication, (req, res) => {
  // logic to log in admin

  // Generate JWT Token
  const token = generateJWT({ username: req.user.username, role: "admin" });

  return res.json({ message: "Logged in successfully", token });
});

// Admin validate jwt
router.get("/validatejwt", validateJWT, (req, res) => {
  return res.json({ message: "JWT Validated!", username: req.user.username });
});

// Admin create course
router.post("/courses", validateJWT, async (req, res) => {
  const newCourse = new Course(req.body);
  const ObjectId = mongoose.Types.ObjectId;

  try {
    await newCourse.save();
    const allCourses = await Course.find({ author: req.user.username });
    return res.status(201).json({
      message: "Course created successfully",
      courseId: newCourse._id,
      courses: allCourses,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Admin update course
router.put("/courses/:courseId", validateJWT, async (req, res) => {
  // logic to edit a course

  const courseId = req.params.courseId;

  try {
    const course = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true,
    });
    // If course not found
    if (!course)
      return res
        .status(404)
        .json({ message: `Course with id ${courseId} not found!` });

    return res.json({ message: "Course updated successfully" });
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Get admin's all courses
router.get("/courses", validateJWT, async (req, res) => {
  const { username } = req.headers;
  try {
    // Get courses of only that admin
    const courses = await Course.find({ author: username });
    return res.json({ courses });
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Admin get course from course id
router.get("/courses/:courseId", validateJWT, async (req, res) => {
  const courseId = req.params.courseId;
  try {
    // Get courses of only that admin
    const course = await Course.findById(courseId);

    return res.json({ course });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
