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
      // const applications = await Student.find({ adviser: adviserId }).populate("open_application");
      // get open applications with step 2 status pending
      const applications = await Application.find({ adviser: adviserId, status: "pending", current_step: 2 });
      // const studentIds = (await Student.find({ adviser: adviserId }, { _id: 1 })).map((e) => e._id.toString());
      // const applications = await Application.find({ owner: { $in: studentIds }, status: "pending", current_step: 1 });
      res.status(200).json({ success: true, request: applications });
    } else {
      res.status(404).json({ success: false, request: [] });
    }
  } catch (error) {
    res.status(500).json({ success: false, request: [] });
  }
};

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



export { getPendingApplicationsByAdviser, getAllStudents };
