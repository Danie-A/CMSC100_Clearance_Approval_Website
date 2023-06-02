import { Student } from "../models/user.js";
import { Approver } from "../models/approver.js";
import jwt from "jsonwebtoken";

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
    const initials_surname =
      first_name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("") +
      middle_name.toUpperCase().charAt(0) +
      last_name.toUpperCase().replace(/ /g, "");

    const approver = Approver({
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      initials_surname: initials_surname,
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
  const { email, password } = req.body;

  try {
    const user = await Approver.findOne({ email: email });
    if (!user) return res.status(404).json({ success: false });
    user.comparePassword(password, (err, isMatch) => {
      if (err || !isMatch) return res.send({ success: false });
      const tokenPayload = { _id: user._id };
      const token = jwt.sign(tokenPayload, "THIS_IS_A_SECRET_STRING");
      const fullName = user.first_name + " " + user.last_name;
      return res.send({ success: true, token, username: fullName });
    });
  } catch (error) {
    console.log(`Error in admin - loginApprover: ${error}`);
    res.status(500).json({ success: false });
  }
};

const checkIfLoggedInApprover = async (req, res) => {
  try {
    if (!req.cookies || !req.cookies.authToken) return res.status(403).json({ isLoggedIn: false });
    const tokenPayload = jwt.verify(req.cookies.authToken, "THIS_IS_A_SECRET_STRING");
    const user = await Approver.findById(tokenPayload._id);
    if (user) return res.status(200).json({ isLoggedIn: true, userType: user.type });
    else return res.json(404).json({ isLoggedIn: false });
  } catch {
    return res.status(500).json({ isLoggedIn: false });
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
