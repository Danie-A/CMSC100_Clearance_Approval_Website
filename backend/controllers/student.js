import { Application } from "../models/application.js";
import { Student } from "../models/user.js";
import { Approver } from "../models/approver.js";

const viewStudentInfo = async (req, res) => {
  const studentId = req.userId;
  try {
    const result = await Student.findById(studentId);
    if (result) res.status(200).json(result);
    else res.status(404).json({ success: false });
  } catch (error) {
    console.log(`Error in student - viewStudentInfo(): ${error}`);
    res.status(500).json({ success: false });
  }
};

const viewOpenApplicationInfo = async (req, res) => {
  const { applicationId } = req.body;
  try {
    const found = await Application.findById(applicationId);
    if (found) res.status(200).json({ success: true, data: found });
    else res.status(500).json({ success: false });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ succes: false });
  }
};

const getOpenApplication = async (req, res) => {
  const studentId = req.userId;
  try {
    const found = await Student.findById(studentId);
    if (found.open_application) {
      // find it in application collection
      const foundApplication = await Application.findById(found.open_application);
      if (foundApplication) res.status(200).json({ success: true, data: foundApplication });
      else res.status(500).json({ success: false });
    } else res.status(500).json({ success: false });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ succes: false });
  }
};

// creating an application
const createApplication = async (req, res) => {
  const { github_link } = req.body;
  const studentId = req.userId;
  try {
    const found = await Student.find({ _id: studentId, status: "approved" });
    if (found) {
      const application = Application({ owner: studentId, current_step: 1, student_submissions: [{ step: 1, github_link: github_link }] });
      const newApplication = await application.save();
      await Student.findByIdAndUpdate(studentId, { $set: { open_application: newApplication._id } });
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// get cleared status application of student
const getClearedApplications = async (req, res) => {
  const studentId = req.userId;
  try {
    const found = await Application.find({ owner: studentId, status: "cleared" });
    if (found) res.status(200).json({ success: true, data: found });
    else res.status(404).json({ success: false });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// add student submission
// revise current_step and link/remark
// submitting step1 (github link)
const addStudentSubmissionAdviser = async (req, res) => {
  const { current_step, github_link, student_remark } = req.body;
  const studentId = req.userId;
  try {
    const foundStudent = await Student.findById(studentId);
    if (foundStudent) {
      await Application.findByIdAndUpdate(foundStudent.open_application, {
        $set: {
          current_step: current_step,
          status: "pending",
        },
      });
      await Application.findByIdAndUpdate(foundStudent.open_application, {
        $push: {
          student_submissions: {
            step: current_step,
            student_remark: student_remark,
            github_link: github_link,
          },
        },
      });
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false });
    }
  } catch (error) {
    console.log(`Error in student - addStudentSubmissionAdviser(): ${error}`);
    res.status(500).json({ success: false });
  }
};

const addStudentSubmissionClearanceOfficer = async (req, res) => {
  const { current_step, student_remark } = req.body;
  const studentId = req.userId;

  try {
    const foundStudent = await Student.findById(studentId);
    if (foundStudent) {
      await Application.findByIdAndUpdate(foundStudent.open_application, {
        $set: {
          current_step: current_step,
          status: "pending",
        },
      });
      await Application.findByIdAndUpdate(foundStudent.open_application, {
        $push: { student_submissions: { step: current_step, student_remark: student_remark } },
      });
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false });
    }
  } catch (error) {
    console.log(`Error in student - addStudentSubmissionClearanceOfficer(): ${error}`);
    res.status(500).json({ success: false });
  }
};

// delete an approver account
const deleteApplication = async (req, res) => {
  const { applicationId } = req.body;
  const studentId = req.userId;
  try {
    const found = await Student.findById(studentId);
    console.log(found);
    if (found) {
      await Student.findByIdAndUpdate(studentId, {
        $set: { open_application: null },
        $push: { closed_applications: applicationId },
      });

      // Find the application by ID and update the status field
      await Application.findByIdAndUpdate(applicationId, {
        $set: { status: "closed" },
      });

      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true });
  }
};

// get all applications of student - pending, closed, returned, cleared
const getApplicationsOfStudent = async (req, res) => {
  const studentId = req.userId;
  try {
    const found = await Student.findById(studentId);
    if (found) {
      const applications = await Application.find({ owner: studentId });
      res.status(200).json({ success: true, data: applications });
    } else {
      res.status(404).json({ success: false, data: [] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, data: [] });
  }
};

// get adviser details
const getAdviserDetails = async (req, res) => {
  const studentId = req.userId;
  try {
    const found = await Student.findById(studentId);
    if (found) {
      const adviser = await Approver.findById(found.adviser);
      res.status(200).json({ success: true, adviser: adviser, student: found });
    } else {
      res.status(404).json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};

export {
  viewStudentInfo,
  getAdviserDetails,
  createApplication,
  deleteApplication,
  getApplicationsOfStudent,
  getClearedApplications,
  addStudentSubmissionClearanceOfficer,
  addStudentSubmissionAdviser,
  viewOpenApplicationInfo,
  getOpenApplication,
};
