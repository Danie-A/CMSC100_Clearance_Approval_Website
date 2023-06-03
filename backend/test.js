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

// needle.post(
//   "http://localhost:3001/add-student",
//   {
//     first_name: "Hello",
//     middle_name: "I",
//     last_name: "Baymax",
//     student_number: "2000-99999",
//     up_mail: "baymax@up.edu.ph",
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

// needle.post("http://localhost:3001/approve-student-account", { studentId: "6470f707f45884ea8a9ba222", approverId: "6470f649f45884ea8a9ba21e" }, (err, res) =>
//   console.log(res.body)
// );

// needle.post("http://localhost:3001/get-pending-applications-adviser", { adviserId: "6470f649f45884ea8a9ba21e" }, (err, res) => console.log(res.body));

// needle.post("http://localhost:3001/create-application", { studentId: "6470f707f45884ea8a9ba222" }, (err, res) => console.log(res.body));

// needle.post("http://localhost:3001/submit-step1", { studentId: "6470f707f45884ea8a9ba222", githubLink: "github" }, (err, res) => console.log(res.body));

needle.post(
  "http://localhost:3001/add-approver",
  {
    first_name: "kat",
    middle_name: "loren",
    last_name: "tan",
    type: "adviser",
    email: "kmtan4@up.edu.ph",
    password: "12345678",
  },
  (err, res) => console.log(res.body)
);

// needle.post("http://localhost:3001/login-admin", { email: "admin", password: "admin" }, (err, res) => console.log(res.body));

// needle.get("http://localhost:3001/get-all-approvers", (err, res) => console.log(res.body));

// needle.post("http://localhost:3001/delete-approver", { approverId: "6471d39cfd663db0a7295286" }, (err, res) => console.log(res.body));


/**
 
sample

{
  "_id": {
    "$oid": "6476ee06b9db7ec1fa6b86cf"
  },
  "owner": {
    "$oid": "6476a763ec861a3e3bb821d1"
  },
  "current_step": 1,
  "status": "pending",
  "student_submissions": [
    {
      "github_link": "ayawkonapls.com",
      "step": 1,
      "_id": {
        "$oid": "6476ee06b9db7ec1fa6b86d0"
      },
      "date": {
        "$date": "2023-05-31T06:49:42.024Z"
      }
    }
  ],
  "remarks": [
    {
      "remarks": "wrong github link sent",
      "step": 2,
      "date": {
        "$date": "2023-05-31T06:49:42.024Z"
      },
      "commenter": {
        "$oid": "6476aa06ec861a3e3bb82207"
      }
    },
    {
      "remarks": "unpaid tuition",
      "step": 3,
      "date": {
        "$date": "2023-05-31T06:49:42.024Z"
      },
      "commenter": "admin"
    }
  ],
  "__v": 0
}



 */