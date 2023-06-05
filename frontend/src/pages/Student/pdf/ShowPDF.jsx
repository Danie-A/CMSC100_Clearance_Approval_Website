import React from "react";
import { PDFCreator } from "pdf-creator-node";
import fs from "fs";
import { AiFillFilePdf } from "react-icons/ai";

const generatePDF = async () => {
  try {
    // Read the HTML template file
    const templateFile = fs.readFileSync("path/to/clearance.html", "utf-8");

    var date_generated = new Date().toLocaleDateString();
    var student_name = "Danielle Lei Araez";
    var student_number = "2018-12345";
    var adviser = "Dr. Juan Dela Cruz";
    var clearance_officer = "Dr. Juana Dela Cruz";
    // Replace placeholders with variable values
    const variableValues = {
      name: "Danielle Lei Araez",
      student_name: student_name,
      student_number: student_number,
      adviser: adviser,
      clearance_officer: clearance_officer,
      date_generated: date_generated,
    };

    const template = replacePlaceholders(templateFile, variableValues);

    // Create an instance of PDFCreator
    const pdf = new PDFCreator();

    // Generate the PDF file
    const result = await pdf.create(template);

    // Get the PDF file data
    const pdfData = result.toBuffer();

    // Create a Blob object from the PDF data
    const blob = new Blob([pdfData], { type: "application/pdf" });

    // Create a URL from the Blob object
    const url = URL.createObjectURL(blob);

    // Open the PDF file in a new tab
    window.open(url, "_blank");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

const replacePlaceholders = (template, variables) => {
  let modifiedTemplate = template;
  for (const key in variables) {
    const regex = new RegExp(`{{${key}}}`, "g");
    modifiedTemplate = modifiedTemplate.replace(regex, variables[key]);
  }
  return modifiedTemplate;
};

function ShowPDF() {
  return (
    <>
      <button onClick={generatePDF} className="btn btn-danger notifBtn">
        <AiFillFilePdf className="mr-2" style={{ marginRight: "8px" }} />
        Print PDF
      </button>
    </>
  );
}

export default ShowPDF;
