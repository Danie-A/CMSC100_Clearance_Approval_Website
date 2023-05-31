import React from 'react';
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';


const PDFDocument = ({ date, studentName }) => (
    <Document>
        <Page>
            <Text>Date: {date}</Text>
            <Text>Student Name: {studentName}</Text>
            {/* ...other content */}
        </Page>
    </Document>
);



const GeneratePDF = () => {
    const date = new Date().toLocaleDateString();
    const studentName = 'Danielle Lei Araez';

    return (
        <div>
            {/* Content to be included in the PDF */}
            <h1>PDF Content</h1>
            <p>This is a sample PDF document.</p>
            {/* Use your variables to fill in the placeholders */}
            <p>Date: {date}</p>
            <p>Student Name: {studentName}</p>
            {/* ...other content */}

            {/* PDF download link */}
            <PDFDownloadLink document={<PDFDocument date={date} studentName={studentName} />} fileName="document.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Generating PDF...' : 'Download PDF')}
            </PDFDownloadLink>
        </div>
    );
};

export default GeneratePDF;
