import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';

function GeneratePDF() {

    return (
        <div>
            {/* Content to be included in the PDF */}
            <h1>PDF Content</h1>
            <p>This is a sample PDF document.</p>
            {/* Use your variables to fill in the placeholders */}
            {/* <p>Date: {date}</p>
            <p>Student Name: {studentName}</p> */}
            {/* ...other content */}

            {/* PDF download link */}
            <PDFDownloadLink document={<PDFDocument />} fileName="document.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Generating PDF...' : 'Download PDF')}
            </PDFDownloadLink>
        </div>
    );
};

export default GeneratePDF;
