import jwt from "jsonwebtoken";
import { Student } from "../models/user.js";
import { Approver } from "../models/approver.js";

const signUpStudent = async (req, res) => {
  const { first_name, middle_name, last_name, student_number, email, password } = req.body;

  try {
    const student = new Student({
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      student_number: student_number,
      email: email,
      password: password,
    });
    const result = await student.save();

    if (result._id) res.status(200).json({ success: true });
    else res.status(403).json({ success: false });
  } catch (error) {
    console.log(`Error in auth-controller - signUpStudent: ${error}`);
    res.status(500).json({ success: false });
  }
};

const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Student.findOne({ email: email, status: "approved" });
    if (!user) return res.status(404).json({ success: false });
    user.comparePassword(password, (err, isMatch) => {
      if (err || !isMatch) return res.send({ success: false });
      const tokenPayload = { _id: user._id };
      const token = jwt.sign(tokenPayload, "THIS_IS_A_SECRET_STRING");
      const fullName = user.first_name + " " + user.last_name;
      return res.status(200).json({ success: true, token, username: fullName });
    });
  } catch (error) {
    console.log(`Error in auth-controller - loginStudent: ${error}`);
    res.status(500).json({ success: false });
  }
};

const checkIfLoggedIn = async (req, res) => {
  try {
    if (!req.cookies || !req.cookies.authToken) return res.status(200).json({ isLoggedIn: false });

    const tokenPayload = jwt.verify(req.cookies.authToken, "THIS_IS_A_SECRET_STRING");
    if (tokenPayload._id == "admin") {
      return res.status(200).json({ isLoggedIn: "admin" });
    } else {
      if (await Student.findById(tokenPayload._id)) {
        res.status(200).json({ isLoggedIn: "student" });
      } else if (await Approver.findById(tokenPayload._id)) {
        res.status(200).json({ isLoggedIn: "adviser" });
      } else {
        res.status(200).json({ isLoggedIn: false });
      }
    }
  } catch (error) {
    console.log(`Error in auth-controller - checkIfLoggedIn(): ${error}`);
    res.status(500).json({ isLoggedIn: false });
  }
};

const logInAsAdmin = (req, res) => {
  const { email, password } = req.body;
  try {
    if (email === "admin" && password === "admin") {
      const token = jwt.sign({ _id: "admin" }, "THIS_IS_A_SECRET_STRING");
      return res.status(200).json({ success: true, token, username: "admin" });
    } else {
      return res.status(403).json({ success: false });
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(500).json({ success: false });
  }
};

export { signUpStudent, loginStudent, checkIfLoggedIn, logInAsAdmin };
