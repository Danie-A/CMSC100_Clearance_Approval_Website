import mongoose from "mongoose";
import { Approver } from "../models/approver.js";
import { Student } from "../models/student.js";
import { Application } from "../models/application.js";

// get all pending applications of adviser's students
const getPendingApplicationsByAdviser = async (req, res) => {
  const { adviserId } = req.body;

  try {
    const found = await Approver.findById(adviserId);
    if (found) {
      const studentIds = (await Student.find({ adviser: adviserId }, { _id: 1 })).map((e) => e._id.toString());
      console.log(studentIds);
      const applications = await Application.find({ owner: { $in: studentIds }, status: "pending", current_step: 1 });
      console.log(applications);
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export { getPendingApplicationsByAdviser };
