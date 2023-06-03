import { Approver } from "../models/approver.js";
import { Student } from "../models/user.js";
import { Application } from "../models/application.js";

// get all pending applications of adviser's students
const getPendingApplicationsByAdviser = async (req, res) => {
  const adviserId = req.userId;
  console.log(`AdviserId: ${adviserId}`);
  try {
    const found = await Approver.findById(adviserId);
    if (found) {
      const students = await Student.find({ adviser: adviserId })
      const applications = await Application.find({
        owner: { $in: students },
        $or: [
          { status: "pending", current_step: 1 },
          { status: "pending", current_step: 2 }
        ]
      });

      res.status(200).json({ success: true, applications: applications, students: students });
    } else {
      res.status(200).json({ success: false, request: [] });
    }
  } catch (error) {
    res.status(500).json({ success: false, request: [] });
  }
};

const getStudentsWithPendingApplication = async (req, res) => {
  const adviserId = req.userId;
  console.log(`AdviserId: ${adviserId}`);
  try {
    const found = await Approver.findById(adviserId);
    if (found) {
      const students = await Student.find({ adviser: adviserId })
        .populate({
          path: "open_application",
          match: {
            $or: [
              { status: "pending", current_step: 1 },
              { status: "pending", current_step: 2 },
            ],
          },
        });

      const filteredStudents = students.filter((student) => student.open_application != null);
      // Further processing or sending the applications in the response
      res.json({ students: filteredStudents });
    } else {
      res.status(404).json({ message: "Approver not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// set application current_step to 3 -- to be reviewed by clearance officer
// const setApplicationStep3 = async (req, res) => {
//   const applicationId = req.body.applicationId;
//   try {





// get all students of adviser
const getAllStudents = async (req, res) => {
  try {
    const adviserId = req.userId;
    const result = await Student.find({ adviser: adviserId });
    res.status(200).json({ success: true, result: result });
  } catch (error) {
    res.status(500).json({ success: false, result: [], error: error });
    button
  }
};

// get adviser details
const getAdviserName = async (req, res) => {
  const adviserId = req.userId;
  try {
    const adviser = await Approver.findById(adviserId);
    res.status(200).json({ success: true, adviser: adviser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};



export { getPendingApplicationsByAdviser, getAllStudents, getAdviserName, getStudentsWithPendingApplication };
