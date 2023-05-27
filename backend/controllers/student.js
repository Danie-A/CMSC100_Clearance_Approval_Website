import { Application } from "../models/application.js";
// import { Student } from "../models/student.js";
import { Student } from "../models/user.js";

// const DATABASE_URI = "mongodb+srv://jpsabile:VUNVL7QcJ2tYPbZr@jpsabile.nvysktb.mongodb.net/clearME?retryWrites=true&w=majority";
// mongoose.connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// adding a student acc, default status is pending
const addStudentAccount = async (req, res) => {
  const { first_name, middle_name, last_name, student_number, email, password } = req.body;

  // trying to add a student account
  try {
    const student = new Student({
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      student_number: student_number,
      email: email,
      password: password,
    });

    const result = await student.save();
    if (result) res.status(200).json({ success: true });
    else res.status(500).json({ success: false });

    // if error
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ success: false });
  }
};

// creating an application
const createApplication = async (req, res) => {
  const { studentId } = req.body;
  try {
    const found = await Student.findById(studentId);
    if (found) {
      const application = Application({ owner: studentId });
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

// submitting step1 (github link)
const submitStep1 = async (req, res) => {
  const { studentId, githubLink } = req.body;

  try {
    const foundStudent = await Student.findById(studentId);
    if (foundStudent) {
      await Application.findByIdAndUpdate(foundStudent.open_application, { $set: { current_step: 1, github_link: githubLink } });
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};
export { addStudentAccount, createApplication, submitStep1 };
