import { Approver } from "../models/approver.js";
import { Student } from "../models/user.js";

// get all pending applications of adviser's students
const getPendingApplicationsByAdviser = async (req, res) => {
  const adviserId = req.userId;
  console.log(`AdviserId: ${adviserId}`);
  try {
    const found = await Approver.findById(adviserId);
    if (found) {
      const applications = await Student.find({ adviser: adviserId }).populate("open_application");
      res.status(200).json({ success: true, request: applications });
    } else {
      res.status(200).json({ success: false, request: [] });
    }
  } catch (error) {
    res.status(500).json({ success: false, request: [] });
  }
};

export { getPendingApplicationsByAdviser };
