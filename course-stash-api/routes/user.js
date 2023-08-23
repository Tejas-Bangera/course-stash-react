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

/**
 * __Function to validate login credentials of an User__
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next Next
 * @returns Response status `401` if login credentials are invalid
 */
async function userAuthentication(req, res, next) {
  const { username, password } = req.headers;

  try {
    const user = await User.findOne({ username, password });
    // If user is not valid
    if (!user)
      return res.status(401).json({ message: "Invalid login credentials" });

    req.user = user;
    next();
  } catch (error) {
    res.status(500).send(err);
  }
}

// User routes
// User Sign up
router.post("/signup", async (req, res) => {
  // logic to sign up user
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    // If user already exists
    if (user) return res.status(403).json({ message: "User already exists" });

    const newUser = new User({ username, password });
    await newUser.save();

    const token = generateJWT({ username, role: "user" });
    res.json({ message: "User created successfully", token });
  } catch (error) {
    res.status(500).send(error);
  }
});

// User Login
router.post("/login", userAuthentication, async (req, res) => {
  // logic to log in user
  const token = generateJWT({ username: req.user.username, role: "user" });

  res.json({ message: "Logged in successfully", token });
});

// Admin validate jwt
router.get("/validatejwt", validateJWT, (req, res) => {
  res.json({ message: "JWT Validated!", username: req.user.username });
});

// User get all courses
// app.get("/courses", validateJWT, async (req, res) => {
router.get("/courses", async (req, res) => {
  // logic to list all courses
  try {
    const courses = await Course.find({ published: true });
    res.json({ courses });
  } catch (error) {
    res.status(500).send(error);
  }
});

// User purchase a course
router.post("/courses/:courseId", validateJWT, async (req, res) => {
  // logic to purchase a course
  const courseId = req.params.courseId;

  try {
    const course = await Course.findById(courseId);
    // If course not found
    if (!course)
      return res
        .status(403)
        .json({ message: `Course with id ${courseId} not found!` });

    // Check the user for which you want update the purchased course
    const user = await User.findOne({ username: req.user.username });
    // If user not found
    if (!user) return res.status(403).json({ message: "User not found" });

    user.purchasedCourses.push(course);
    await user.save();

    res.json({ message: "Course purchased successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// User purchase all cart courses
router.post("/courses/purchase/cart", validateJWT, async (req, res) => {
  // logic to purchase a course
  const courseIDs = req.body.courses;
  let user;

  // Validate user
  try {
    // Check the user for which you want update the purchased course
    user = await User.findOne({ username: req.user.username });
    // If user not found
    if (!user) return res.status(403).json({ message: "User not found" });
  } catch (error) {
    return res.status(500).send(error);
  }

  // Validate all courses
  for (const courseId of courseIDs) {
    try {
      const course = await Course.findById(courseId);
      // If course not found
      if (!course)
        return res
          .status(403)
          .json({ message: `Course with id ${courseId} not found!` });

      user.purchasedCourses.push(course);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  // Save all the courses
  try {
    // Empty the cart
    user.cart = [];
    await user.save();
    return res.json({ message: "Courses purchased successfully" });
  } catch (error) {
    return res.status(500).send(error);
  }
});

// User get all purchased courses
router.get("/purchasedCourses", validateJWT, async (req, res) => {
  // logic to view purchased courses
  try {
    const user = await User.findOne({ username: req.user.username }).populate(
      "purchasedCourses"
    );
    // If user not found
    if (!user) return res.status(403).json({ message: "User not found" });

    res.json({ purchasedCourses: user.purchasedCourses });
  } catch (error) {
    res.status(500).send(error);
  }
});

// User add course to cart
router.post("/cart/:courseId", validateJWT, async (req, res) => {
  // logic to purchase a course
  const courseId = req.params.courseId;

  try {
    const course = await Course.findById(courseId);
    // If course not found
    if (!course)
      return res
        .status(403)
        .json({ message: `Course with id ${courseId} not found!` });

    // Check the user for which you want update the purchased course
    const user = await User.findOne({ username: req.user.username });
    // If user not found
    if (!user) return res.status(403).json({ message: "User not found" });

    user.cart.push(course);
    await user.save();

    res.json({ message: "Course added to cart successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// User remove course from cart
router.delete("/cart/:courseId", validateJWT, async (req, res) => {
  // logic to purchase a course
  const courseId = req.params.courseId;

  try {
    const course = await Course.findById(courseId);
    // If course not found
    if (!course)
      return res
        .status(403)
        .json({ message: `Course with id ${courseId} not found!` });

    // Check the user for which you want update the purchased course
    const user = await User.findOne({ username: req.user.username });
    // If user not found
    if (!user) return res.status(403).json({ message: "User not found" });

    const ObjectId = mongoose.Types.ObjectId;

    const updatedCart = user.cart.filter((courseObj) => {
      const id = String(new ObjectId(courseObj));
      return id !== courseId;
    });

    user.cart = [...updatedCart];
    await user.save();

    res.json({ message: "Course removed from cart successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// User get all cart courses
router.get("/cart", validateJWT, async (req, res) => {
  // logic to view cart courses
  try {
    const user = await User.findOne({ username: req.user.username }).populate(
      "cart"
    );
    // If user not found
    if (!user) return res.status(403).json({ message: "User not found" });

    res.json({ cart: user.cart });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
