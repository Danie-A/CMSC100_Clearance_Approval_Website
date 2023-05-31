import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "students" },
  current_step: { type: Number, default: 0 },
  status: { type: String, default: "pending" }, // closed, pending, cleared
  remarks: { type: [{ type: { remarks: String, step: Number, date: { type: Date, default: Date.now }, commenter: { type: mongoose.Schema.Types.ObjectId, ref: "approvers" } } }], default: [] },
  student_submissions: {
    type: [{ type: { github_link: String, student_remark: String, step: Number, date: { type: Date, default: Date.now } } }],
    default: []
  },
});

const Application = mongoose.model("application", applicationSchema);

export { applicationSchema, Application };
