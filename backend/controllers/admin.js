import { Student } from "../models/student.js";
import { Approver } from "../models/approver.js";

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
      const result = await Student.findByIdAndUpdate({ status: "pending", _id: studentId }, { $set: { status: "rejected" } });
      if (result) res.status(200).json({ success: true });
      else res.status(404).json({ success: false });
    } else res.status(404).json({ success: false });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ success: false });
  }
};

// add an approver account
const addApproverAccount = async (req, res) => {
  const { first_name, middle_name, last_name, type } = req.body;

  try {
    const approver = Approver({
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      type: type,
    });

    const result = approver.save();
    if (result) res.status(200).json({ success: true });
    else res.status(500).json({ success: false });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// edit an approver account
const editApproverAccount = async (req, res) => {
  const { approverId, first_name, middle_name, last_name } = req.body;

  try {
    const found = await Approver.findById(approverId);
    if (found) {
      const updatedApprover = {
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
      };
      await Approver.findByIdAndUpdate(approverId, { $set: updatedApprover });
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false });
    }
  } catch (error) {
    console.log(error);
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
    console.log(error);
    res.status(500).json({ success: true });
  }
};

export { getPendingApplications, approveStudentAccount, rejectStudentAccount, addApproverAccount, editApproverAccount, deleteApproverAccount };
