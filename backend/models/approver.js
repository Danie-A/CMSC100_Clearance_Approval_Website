import mongoose from "mongoose";

const approverSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  middle_name: { type: String, required: true },
  last_name: { type: String, required: true },
  type: { type: String, required: true },
});

const Approver = mongoose.model("approver", approverSchema);

export { approverSchema, Approver };
