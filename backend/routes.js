import { signUpStudent, loginStudent, checkIfLoggedIn, logInAsAdmin } from "./controllers/auth-controller.js";
import { viewStudentInfo, createApplication, addStudentSubmission, viewOpenApplicationInfo } from "./controllers/student.js";
import {
  getPendingApplications,
  approveStudentAccount,
  rejectStudentAccount,
  getAllApprovers,
  getAllAdvisers,
  addApproverAccount,
  loginApprover, checkIfLoggedInApprover,
  editApproverAccount,
  deleteApproverAccount,
} from "./controllers/admin.js";
import { getPendingApplicationsByAdviser } from "./controllers/approver.js";

import { getLoggedIn, isAdmin } from "./controllers/middleware.js";

const setUpRoutes = (app) => {
  // auth
  app.get("/", (req, res) => res.send("API Home"));
  app.post("/signup-student", signUpStudent);
  app.post("/login-student", loginStudent);
  app.post("/checkifloggedin", checkIfLoggedIn);

  // student
  // app.post("/add-student", addStudentAccount);
  app.post("/view-student-info", viewStudentInfo);
  app.post("/create-application", createApplication);
  app.post("/add-student-submission", addStudentSubmission);
  app.post("/view-open-application-info", viewOpenApplicationInfo);

  // admin
  app.post("/login-admin", logInAsAdmin);
  app.get("/get-pending-applications", isAdmin, getPendingApplications);
  app.post("/approve-student-account", isAdmin,  approveStudentAccount);
  app.post("/reject-student-account", isAdmin, rejectStudentAccount);
  app.get("/get-all-approvers", isAdmin, getAllApprovers);
  app.get("/get-all-advisers", isAdmin, getAllAdvisers);
  app.post("/add-approver", isAdmin, addApproverAccount);
  app.post("/login-approver", loginApprover);
  app.post("/checkifloggedinapprover", checkIfLoggedInApprover);
  app.post("/edit-approver", editApproverAccount);
  app.post("/delete-approver", deleteApproverAccount);

  // approver
  app.post("/get-pending-applications-adviser", getPendingApplicationsByAdviser);

  // general
  app.post("/getLoggedIn", getLoggedIn);
};

export default setUpRoutes;
