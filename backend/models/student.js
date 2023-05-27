// import mongoose from "mongoose";

// const studentSchema = mongoose.Schema({
//   first_name: { type: String, required: true },
//   middle_name: { type: String, required: true },
//   last_name: { type: String, required: true },
//   student_number: { type: String, required: true },
//   up_mail: { type: String, required: true },
//   password: { type: String, required: true },
//   status: { type: String, default: "pending" },
//   open_application: { type: mongoose.Schema.Types.ObjectId, ref: "applications", default: null },
//   closed_applications: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "applications" }], default: [] },
//   adviser: { type: mongoose.Schema.Types.ObjectId, ref: "advisers", default: null },
// });

// const Student = mongoose.model("student", studentSchema);

// export { studentSchema, Student };
