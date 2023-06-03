import mongoose from "mongoose";
import bcrypt from "bcrypt";

const approverSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  middle_name: { type: String, required: true },
  last_name: { type: String, required: true },
  initials_surname: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

approverSchema.pre("save", function (next) {
  const approver = this;

  if (!approver.isModified("password")) return next();
  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) return next(saltError);
    return bcrypt.hash(approver.password, salt, (hashError, hash) => {
      if (hashError) return next(hashError);
      approver.password = hash;
      return next();
    });
  });
});

approverSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, callback);
};

const Approver = mongoose.model("approver", approverSchema);

export { approverSchema, Approver };
