import { Application } from "../models/application.js";
import { Student } from "../models/user.js";

const viewStudentInfo = async (req, res) => {
  const studentId = req.userId;
  const result = await Student.findById(studentId);
  res.status(200).json(result);
};

const viewOpenApplicationInfo = async (req, res) => {
  const studentId = req.userId;
  try {
    const found = await Student.findById(studentId).populate("open_application").populate("closed_applications");
    if (found) res.status(200).json({ success: true, request: { open_application: found.open_application, closed_applications: found.closed_applications } });
    else res.status(500).json({ success: false, request: {} });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ succes: false, request: {} });
  }
};

// creating an application
const createApplication = async (req, res) => {
  console.log("trying to create an application");
  const { github_link } = req.body;
  const studentId = req.userId;
  try {
    const found = await Student.find({ _id: studentId, status: "approved" });
    if (found) {
      const application = Application({ owner: studentId, current_step: 1, student_submissions: [{ date: new Date().getDate(), step: 1, remark_link: github_link }] });
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

// add student submission
// revise current_step and link/remark
// submitting step1 (github link)
const addStudentSubmission = async (req, res) => {
  const { current_step, remark_link } = req.body;
  const studentId = req.userId;

  try {
    const foundStudent = await Student.findById(studentId);
    if (foundStudent) {
      await Application.findByIdAndUpdate(foundStudent.open_application, {
        $set: {
          current_step: current_step,
        },
      });
      await Application.findByIdAndUpdate(foundStudent.open_application, {
        $push: {
          student_submissions: {
            step: current_step,
            remark_link: remark_link,
          },
        },
      });
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};

export { viewStudentInfo, createApplication, addStudentSubmission, viewOpenApplicationInfo };
