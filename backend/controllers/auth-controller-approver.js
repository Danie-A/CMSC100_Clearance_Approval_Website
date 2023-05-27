import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// get approver model registered in Mongoose
// const User = mongoose.model("User");
import { Approver } from "../models/approver.js";

const addApproverAccount = async (req, res) => {
  const { first_name, middle_name, last_name, type, email, password } = req.body;

  const approver = new Approver({
    first_name: first_name,
    middle_name: middle_name,
    last_name: last_name,
    type: type,
    email: email,
    password: password,
  });

  const result = await approver.save();

  if (result._id) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
};

const loginApprover = async (req, res) => {
  console.log("logging in");
  const email = req.body.email.trim();
  const password = req.body.password;

  // Check if email exists
  const approver = await Approver.findOne({ email });

  //  Scenario 1: FAIL - User doesn't exist
  if (!approver) {
    return res.send({ success: false });
  }

  // Check if password is correct using the Schema method defined in User Schema
  approver.comparePassword(password, (err, isMatch) => {
    if (err || !isMatch) {
      // Scenario 2: FAIL - Wrong password
      return res.send({ success: false });
    }

    // Scenario 3: SUCCESS - time to create a token
    const tokenPayload = {
      _id: approver._id,
    };

    const token = jwt.sign(tokenPayload, "THIS_IS_A_SECRET_STRING");

    const fullName = approver.first_name + " " + approver.last_name;
    // return the token to the client
    return res.send({ success: true, token, approvername: fullName });
  });
};

const checkIfLoggedInApprover = async (req, res) => {
  if (!req.cookies || !req.cookies.authToken) {
    // FAIL Scenario 1 - No cookies / no authToken cookie sent
    return res.send({ isLoggedIn: false });
  }

  try {
    // try to verify the token
    const tokenPayload = jwt.verify(req.cookies.authToken, "THIS_IS_A_SECRET_STRING");

    // check if the _id in the payload is an existing approver id
    const approver = await Approver.findById(tokenPayload._id);

    if (approver) {
      // SUCCESS Scenario - User is found
      return res.send({ isLoggedIn: true });
    } else {
      // FAIL Scenario 2 - Token is valid but approver id not found
      return res.send({ isLoggedIn: false });
    }
  } catch {
    // FAIL Scenario 3 - Error in validating token / Token is not valid
    return res.send({ isLoggedIn: false });
  }
};

export { addApproverAccount, loginApprover, checkIfLoggedInApprover };
