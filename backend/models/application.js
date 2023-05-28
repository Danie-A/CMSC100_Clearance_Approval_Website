import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "students" },
  current_step: { type: Number, default: 0 },
  status: { type: String, default: "pending" }, // closed, pending, cleared
  remarks: { type: [{ type: { remarks: String, step: Number, date: Date, commenter: { type: mongoose.Schema.Types.ObjectId, ref: "approvers" } } }], default: [] },
  student_submissions: {
    type: [{ type: { remark_link: String, step: Number, date: Date } }],
    default: []
  },
});

const Application = mongoose.model("application", applicationSchema);

export { applicationSchema, Application };
