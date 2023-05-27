import needle from "needle";

// needle.post(
//   "http://localhost:3001/add-student",
//   {
//     first_name: "Jane",
//     middle_name: "Dizon",
//     last_name: "De Jesus",
//     student_number: "2021-01275",
//     up_mail: "jddejesus@up.edu.ph",
//     password: "12345678",
//   },
//   (err, res) => console.log(res.body)
// );
// needle.post(
//   "http://localhost:3001/add-student",
//   {
//     first_name: "Jerico",
//     middle_name: "Pascual",
//     last_name: "Sabile",
//     student_number: "2021-00075",
//     up_mail: "jpsabile@up.edu.ph",
//     password: "12345678",
//   },
//   (err, res) => console.log(res.body)
// );

// needle.get("http://localhost:3001/get-pending-applications", (err, res) => console.log(res.body));

// needle.post("http://localhost:3001/approve-student-account", { studentId: "64702a3c1aa3118056b488b3", approverId: "64702a891aa3118056b488ba" }, (err, res) =>
//   console.log(res.body)
// );

// needle.post("http://localhost:3001/add-approver", { first_name: "Kat", middle_name: "Loren", last_name: "Tan" }, (err, res) => console.log(res.body));

// needle.post("http://localhost:3001/edit-approver", { approverId: "6470dd048cea6e6bda490853", first_name: "Katherin", middle_name: "Loren", last_name: "Tan" }, (err, res) =>
//   console.log(res.body)
// );

// needle.post("http://localhost:3001/delete-approver", { approverId: "6470dd048cea6e6bda490853" }, (err, res) => console.log(res.body));

// needle.post("http://localhost:3001/reject-student-account", { studentId: "64702a5f1aa3118056b488b5" }, (err, res) => console.log(res.body));

// needle.post("http://localhost:3001/create-application", { studentId: "64702a3c1aa3118056b488b3" }, (err, res) => console.log(res.body));

// needle.post("http://localhost:3001/submit-step1", { studentId: "64702a3c1aa3118056b488b3", githubLink: "https://github.com/janedejesus" }, (err, res) =>
//   console.log(res.body)
// );

// needle.post("http://localhost:3001/add-approver", { first_name: "Kat", middle_name: "Loren", last_name: "Tan", type: "adviser" }, (err, res) => console.log(res.body));

needle.post(
  "http://localhost:3001/add-student",
  {
    first_name: "Hello",
    middle_name: "I",
    last_name: "Baymax",
    student_number: "2000-99999",
    up_mail: "baymax@up.edu.ph",
    password: "12345678",
  },
  (err, res) => console.log(res.body)
);
// needle.post(
//   "http://localhost:3001/add-student",
//   {
//     first_name: "Jerico",
//     middle_name: "Pascual",
//     last_name: "Sabile",
//     student_number: "2021-00075",
//     up_mail: "jpsabile@up.edu.ph",
//     password: "12345678",
//   },
//   (err, res) => console.log(res.body)
// );

// needle.post("http://localhost:3001/approve-student-account", { studentId: "6470f707f45884ea8a9ba222", approverId: "6470f649f45884ea8a9ba21e" }, (err, res) =>
//   console.log(res.body)
// );

// needle.post("http://localhost:3001/get-pending-applications-adviser", { adviserId: "6470f649f45884ea8a9ba21e" }, (err, res) => console.log(res.body));

// needle.post("http://localhost:3001/create-application", { studentId: "6470f707f45884ea8a9ba222" }, (err, res) => console.log(res.body));

// needle.post("http://localhost:3001/submit-step1", { studentId: "6470f707f45884ea8a9ba222", githubLink: "github" }, (err, res) => console.log(res.body));
