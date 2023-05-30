import { signUpStudent, loginStudent, checkIfLoggedIn, logInAsAdmin } from "./controllers/auth-controller.js";
import { viewStudentInfo, createApplication, addStudentSubmission, viewOpenApplicationInfo } from "./controllers/student.js";
import {
  getPendingApplications,
  approveStudentAccount,
  rejectStudentAccount,
  getAllAdvisers,
  addApproverAccount,
  loginApprover,
  checkIfLoggedInApprover,
  editApproverAccount,
  deleteApproverAccount,
} from "./controllers/admin.js";
import { getPendingApplicationsByAdviser } from "./controllers/approver.js";

import { getLoggedIn, isStudent, isAdmin, isAdviser } from "./controllers/middleware.js";

const setUpRoutes = (app) => {
  // auth
  app.get("/", (req, res) => res.send("API Home"));
  app.post("/signup-student", signUpStudent);
  app.post("/login-student", loginStudent);
  app.post("/checkifloggedin", checkIfLoggedIn);

  // student
  app.post("/view-student-info", isStudent, viewStudentInfo);
  app.post("/create-application", isStudent, createApplication);
  app.post("/view-open-application-info", isStudent, viewOpenApplicationInfo);
  app.post("/add-student-submission", isStudent, addStudentSubmission);

  // admin
  app.post("/login-admin", logInAsAdmin);
  app.get("/get-pending-applications", isAdmin, getPendingApplications);
  app.post("/approve-student-account", isAdmin, approveStudentAccount);
  app.post("/reject-student-account", isAdmin, rejectStudentAccount);
  app.get("/get-all-advisers", isAdmin, getAllAdvisers);
  app.post("/add-approver", isAdmin, addApproverAccount);
  app.post("/edit-approver", isAdmin, editApproverAccount);
  app.post("/delete-approver", isAdmin, deleteApproverAccount);

  app.post("/login-approver", loginApprover);
  app.post("/checkifloggedinapprover", checkIfLoggedInApprover);

  // approver
  app.post("/get-pending-applications-adviser", isAdviser, getPendingApplicationsByAdviser);

  // general
  app.post("/getLoggedIn", getLoggedIn);
};

export default setUpRoutes;
