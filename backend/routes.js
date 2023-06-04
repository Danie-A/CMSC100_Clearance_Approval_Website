import { signUpStudent, loginStudent, checkIfLoggedIn, logInAsAdmin } from "./controllers/auth-controller.js";
import {
  viewStudentInfo,
  getAdviserDetails,
  createApplication,
  deleteApplication,
  getApplicationsOfStudent,
  getOpenApplication,
  getClearedApplications,
  addStudentSubmissionClearanceOfficer,
  addStudentSubmissionAdviser,
  viewOpenApplicationInfo,
} from "./controllers/student.js";
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
  uploadCSV,
  getStudentApplicationAdmin,
  clearStudentApplication,
  rejectStudentApplicationAdmin,
  getAllApplications,
} from "./controllers/admin.js";
import { approveApplicationAdviser, returnApplicationAdviser, getPendingApplicationsByAdviser, getStudentsWithPendingApplication, getAllStudents, getAdviserName } from "./controllers/approver.js";

import { getLoggedIn, isStudent, isAdmin, isAdviser } from "./controllers/middleware.js";

import multer from "multer";

const upload = multer({ dest: "uploads/" });

const setUpRoutes = (app) => {
  // auth
  app.get("/", (req, res) => res.send("API Home"));
  app.post("/signup-student", signUpStudent);
  app.post("/login-student", loginStudent);
  app.post("/checkifloggedin", checkIfLoggedIn);

  // student
  // app.post("/add-student", addStudentAccount);
  app.post("/view-student-info", isStudent, viewStudentInfo);
  app.post("/create-application", isStudent, createApplication);
  app.post("/delete-application", isStudent, deleteApplication);
  app.post("/add-student-submission-adviser", isStudent, addStudentSubmissionAdviser);
  app.post("/add-student-submission-clearance-officer", isStudent, addStudentSubmissionClearanceOfficer);
  app.post("/view-open-application-info", viewOpenApplicationInfo);
  app.get("/get-applications-of-student", isStudent, getApplicationsOfStudent);
  app.get("/get-cleared-applications", isStudent, getClearedApplications);
  app.get("/get-open-application", isStudent, getOpenApplication);
  app.get("/get-adviser-details", isStudent, getAdviserDetails);

  // admin
  app.post("/login-admin", logInAsAdmin);
  app.get("/get-pending-applications", isAdmin, getPendingApplications);
  app.post("/approve-student-account", isAdmin, approveStudentAccount);
  app.post("/reject-student-account", isAdmin, rejectStudentAccount);
  app.get("/get-all-advisers", isAdmin, getAllAdvisers);
  app.post("/add-approver", isAdmin, addApproverAccount);
  app.post("/edit-approver", isAdmin, editApproverAccount);
  app.post("/delete-approver", isAdmin, deleteApproverAccount);
  app.post("/upload-csv-file", upload.single("file"), uploadCSV);
  app.post("/get-student-application-admin", isAdmin, getStudentApplicationAdmin);
  app.post("/clear-student-application", isAdmin, clearStudentApplication);
  app.post("/reject-student-application-admin", isAdmin, rejectStudentApplicationAdmin);
  app.post("/get-all-applications", isAdmin, getAllApplications);

  app.post("/login-approver", loginApprover);
  app.post("/checkifloggedinapprover", checkIfLoggedInApprover);

  // approver
  app.get("/get-pending-applications-adviser", isAdviser, getPendingApplicationsByAdviser);
  app.get("/search-students", isAdviser, getAllStudents);
  app.get("/get-students-with-pending-application", isAdviser, getStudentsWithPendingApplication);
  app.get("/get-adviser-name", isAdviser, getAdviserName);
  app.post("/approve-application-adviser", isAdviser, approveApplicationAdviser);
  app.post("/return-application-adviser", isAdviser, returnApplicationAdviser);

  // general
  app.post("/getLoggedIn", getLoggedIn);
};

export default setUpRoutes;
