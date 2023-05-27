import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// get user model registered in Mongoose
// const User = mongoose.model("User");
import { Student } from "../models/user.js";

const signUpStudent = async (req, res) => {
  // const { first_name, middle_name, last_name, student_number, email, password } = req.body;
  const { first_name, middle_name, last_name, student_number, email, password } = req.body;

  const student = new Student({
    first_name: first_name,
    middle_name: middle_name,
    last_name: last_name,
    student_number: student_number,
    email: email,
    password: password,
  });

  const result = await student.save();

  if (result._id) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
};

const loginStudent = async (req, res) => {
  console.log("logging in as student");
  const email = req.body.email.trim();
  const password = req.body.password;

  // Check if email exists
  const user = await Student.findOne({ email });

  //  Scenario 1: FAIL - User doesn't exist
  if (!user) {
    return res.send({ success: false });
  }

  // Check if password is correct using the Schema method defined in User Schema
  user.comparePassword(password, (err, isMatch) => {
    if (err || !isMatch) {
      // Scenario 2: FAIL - Wrong password
      return res.send({ success: false });
    }

    // Scenario 3: SUCCESS - time to create a token
    const tokenPayload = {
      _id: user._id,
    };

    const token = jwt.sign(tokenPayload, "THIS_IS_A_SECRET_STRING");

    const fullName = user.first_name + " " + user.last_name;
    // return the token to the client
    return res.send({ success: true, token, username: fullName });
  });
};

const checkIfLoggedIn = async (req, res) => {
  if (!req.cookies || !req.cookies.authToken) {
    // FAIL Scenario 1 - No cookies / no authToken cookie sent
    return res.send({ isLoggedIn: false });
  }

  try {
    // try to verify the token
    const tokenPayload = jwt.verify(req.cookies.authToken, "THIS_IS_A_SECRET_STRING");

    // check if the _id in the payload is an existing user id
    const user = await Student.findById(tokenPayload._id);

    if (user) {
      // SUCCESS Scenario - User is found
      return res.send({ isLoggedIn: true });
    } else {
      // FAIL Scenario 2 - Token is valid but user id not found
      return res.send({ isLoggedIn: false });
    }
  } catch {
    // FAIL Scenario 3 - Error in validating token / Token is not valid
    return res.send({ isLoggedIn: false });
  }
};

const logInAsAdmin = (req, res) => {
  const { email, password } = req.body;
  try {
    if (email === "admin" && password === "admin") {
      const token = jwt.sign({ _id: "admin" }, "THIS_IS_A_SECRET_STRING");
      return res.send({ success: true, token, username: "admin" });
    } else {
      return res.send({ success: false });
    }
  } catch (error) {
    console.log(error);
    return res.send({ success: false });
  }
};

export { signUpStudent, loginStudent, checkIfLoggedIn, logInAsAdmin };
