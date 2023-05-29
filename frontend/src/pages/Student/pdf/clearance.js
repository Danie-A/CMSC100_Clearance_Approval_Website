//Required package
var pdf = require("pdf-creator-node");
var fs = require("fs");

// Read HTML Template
var html = fs.readFileSync("clearance.html", "utf8");

var options = {
    format: "Letter",
    orientation: "portrait",
    border: "10mm",
};

var date_generated = new Date().toLocaleDateString();
var student_name = "Danielle Lei Araez";
var student_number = "2018-12345";
var adviser = "Dr. Juan Dela Cruz";
var clearance_officer = "Dr. Juana Dela Cruz";

var document = {
    html: html,
    data: {
        date_generated: date_generated,
        student_name: student_name,
        student_number: student_number,
        adviser: adviser,
        clearance_officer: clearance_officer,
    },
    path: "./clearance.pdf",
    type: "",
};
// By default a file is created but you could switch between Buffer and Streams by using "buffer" or "stream" respectively.

pdf
    .create(document, options)
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.error(error);
    });