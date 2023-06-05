import { Student } from "../models/user.js";
import { Approver } from "../models/approver.js";
import { Application } from "../models/application.js";
import jwt from "jsonwebtoken";
import csvParser from "csv-parser";
import fs from "fs";

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
      const result = await Student.findByIdAndUpdate(
        { status: "pending", _id: studentId },
        { $set: { status: "approved", adviser: approverId } }
      );
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
    const result = await Approver.find({}).select("-password");
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
        .map(word => word.charAt(0))
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
  const { updatedApprover, approverId } = req.body;
  updatedApprover.initials_surname =
    updatedApprover.first_name
      .split(" ")
      .map(word => word.charAt(0))
      .join("") +
    updatedApprover.middle_name.toUpperCase().charAt(0) +
    updatedApprover.last_name.toUpperCase().replace(/ /g, "");
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
    res.status(500).json({ success: false });
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

const approveStudentByCsv = async row => {
  const { adviserInitials, studentNumber } = row;
  const adviser = await Approver.findOne({ initials_surname: adviserInitials });
  await Student.findOne({ student_number: studentNumber }).updateOne({ adviser: adviser._id, status: "approved" });
  return true;
};

const uploadCSV = async (req, res) => {
  const file = req.file;
  if (!file) res.status(400).json({ error: "No file uploaded" });

  const promises = [];
  fs.createReadStream(file.path)
    .pipe(csvParser())
    .on("data", row => promises.push(approveStudentByCsv(row)))
    .on("end", async () => {
      await Promise.all(promises);
      res.status(200).json({ success: true });
    });
};

const getStudentApplicationAdmin = async (req, res) => {
  try {
    const result = await Student.find({ open_application: { $ne: null } })
      .select("-password")
      .populate({ path: "open_application", match: { status: "pending", current_step: 3 } })
      .exec();
    const filteredResult = result.filter(student => student.open_application != null);
    res.status(200).json({ success: true, request: filteredResult });
  } catch (error) {
    console.log(`Error in admin - getStudentApplicationAdmin(): ${error}`);
    res.status(500).json({ success: false });
  }
};

const clearStudentApplication = async (req, res) => {
  const { applicationId } = req.body;
  try {
    const foundApplication = await Application.findByIdAndUpdate(applicationId, { status: "cleared" });
    await Student.findByIdAndUpdate(foundApplication.owner, {
      open_application: null,
      $push: { closed_applications: foundApplication._id },
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(`Error in admin - clearStudentApplication(): ${error}`);
    res.status(500).json({ success: false });
  }
};

const rejectStudentApplicationAdmin = async (req, res) => {
  const { applicationId, remarks, commenter } = req.body;
  try {
    await Application.findByIdAndUpdate(applicationId, {
      status: "returned",
      $push: { remarks: { remarks: remarks, step: 3, commenter: commenter } },
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(`Error in admin - rejectStudentApplicationAdmin(): ${error}`);
    res.status(500).json({ success: false });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const result = await Student.find({ open_application: { $ne: null } })
      .select("-password")
      .populate("open_application");
    const filteredResult = result.filter(student => student.open_application != null);
    res.status(200).json({ success: true, request: filteredResult });
  } catch (error) {
    console.log(`Error in admin - getAllApplications(): ${error}`);
    res.status(500).json({ success: false });
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
  uploadCSV,
  getStudentApplicationAdmin,
  clearStudentApplication,
  rejectStudentApplicationAdmin,
  getAllApplications,
};
