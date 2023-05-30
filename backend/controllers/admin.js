// import { Student } from "../models/student.js";
import { Student } from "../models/user.js";
import { Approver } from "../models/approver.js";
import jwt from "jsonwebtoken";

// const DATABASE_URI = "mongodb+srv://jpsabile:VUNVL7QcJ2tYPbZr@jpsabile.nvysktb.mongodb.net/clearME?retryWrites=true&w=majority";
// mongoose.connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// getting all pending applications
const getPendingApplications = async (req, res) => {
  try {
    const found = await Student.find({ status: "pending" });

    if (found) res.status(200).json({ success: true, request: found });
    else res.status(500).json({ success: false, request: [] });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ succes: false, request: [] });
  }
};

// approving a student account
const approveStudentAccount = async (req, res) => {
  const { studentId, approverId } = req.body;

  try {
    const foundStudent = await Student.find({ status: "pending", _id: studentId });
    const foundApprover = await Approver.findById(approverId);

    if (!foundStudent.length == 0 && foundApprover) {
      const result = await Student.findByIdAndUpdate({ status: "pending", _id: studentId }, { $set: { status: "approved", adviser: approverId } });
      if (result) res.status(200).json({ success: true });
      else res.status(404).json({ success: false });
    } else res.status(404).json({ success: false });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ success: false });
  }
};

// reject an account
const rejectStudentAccount = async (req, res) => {
  const { studentId } = req.body;

  try {
    const foundStudent = await Student.find({ status: "pending", _id: studentId });

    if (!foundStudent.length == 0) {
      const result = await Student.findByIdAndDelete({ status: "pending", _id: studentId });
      if (result) res.status(200).json({ success: true });
      else res.status(404).json({ success: false });
    } else res.status(404).json({ success: false });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ success: false });
  }
};

// get all advisers
const getAllAdvisers = async (req, res) => {
  try {
    const result = await Approver.find({});
    res.status(200).json({ success: true, result: result });
  } catch (error) {
    res.status(500).json({ success: false, result: [], error: error });
  }
};

// add an approver account
const addApproverAccount = async (req, res) => {
  const { first_name, middle_name, last_name, email, password } = req.body;

  try {
    const approver = Approver({
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      email: email,
      password: password,
    });

    const result = await approver.save();
    if (result) res.status(200).json({ success: true });
    else res.status(500).json({ success: false });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// edit an approver account
const editApproverAccount = async (req, res) => {
  const { approverId, updatedApprover } = req.body;

  try {
    const found = await Approver.findById(approverId);
    if (found) {
      await Approver.findByIdAndUpdate(approverId, { $set: updatedApprover });
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false });
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ success: true });
  }
};

// delete an approver account
const deleteApproverAccount = async (req, res) => {
  const { approverId } = req.body;
  try {
    const found = await Approver.findById(approverId);
    if (found) {
      await Approver.findByIdAndDelete(approverId);
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false });
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ success: true });
  }
};

const loginApprover = async (req, res) => {
  console.log("logging in as approver");
  const email = req.body.email.trim();
  const password = req.body.password;

  // Check if email exists
  const user = await Approver.findOne({ email });

  //  Scenario 1: FAIL - User doesn't exist
  if (!user) {
    console.log("user doesn't exist");
    return res.send({ success: false });
  }

  // Check if password is correct using the Schema method defined in User Schema
  user.comparePassword(password, (err, isMatch) => {
    if (err || !isMatch) {
      // Scenario 2: FAIL - Wrong password
      console.log("wrong password");
      return res.send({ success: false });
    }

    // Scenario 3: SUCCESS - time to create a token
    const tokenPayload = {
      _id: user._id,
    };

    const token = jwt.sign(tokenPayload, "THIS_IS_A_SECRET_STRING");

    const fullName = user.first_name + " " + user.last_name;
    // return the token to the client
    console.log("success login approver");
    return res.send({ success: true, token, username: fullName });
  });
};

const checkIfLoggedInApprover = async (req, res) => {
  if (!req.cookies || !req.cookies.authToken) {
    // FAIL Scenario 1 - No cookies / no authToken cookie sent
    return res.send({ isLoggedIn: false });
  }

  try {
    // try to verify the token
    const tokenPayload = jwt.verify(req.cookies.authToken, "THIS_IS_A_SECRET_STRING");

    // check if the _id in the payload is an existing user id
    const user = await Approver.findById(tokenPayload._id);

    if (user) {
      // SUCCESS Scenario - User is found
      return res.send({ isLoggedIn: true, userType: user.type });
    } else {
      // FAIL Scenario 2 - Token is valid but user id not found
      return res.send({ isLoggedIn: false });
    }
  } catch {
    // FAIL Scenario 3 - Error in validating token / Token is not valid
    return res.send({ isLoggedIn: false });
  }
};

export {
  getPendingApplications,
  approveStudentAccount,
  rejectStudentAccount,
  addApproverAccount,
  loginApprover,
  checkIfLoggedInApprover,
  getAllAdvisers,
  editApproverAccount,
  deleteApproverAccount,
};
