import { Document, Page, Text, View } from '@react-pdf/renderer';

const PDFDocument = ({ applicationId, dateGenerated, studentName, studentNumber, adviser, clearanceOfficer }) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.heading}>University of the Philippines Los Baños</Text>
                <Text style={styles.subHeading}>College of Arts and Sciences</Text>
                <Text style={styles.subHeading}>Institute of Computer Science</Text>
            </View>

            <View style={styles.content}>
                <Text>Application ID: {applicationId}</Text>
                <Text>Date Generated: {dateGenerated}</Text>

                <View style={styles.certifies}>
                    <Text>This document certifies that {studentName} ({studentNumber}) has satisfied the clearance requirements of the institute.</Text>
                </View>

                <Text>Verified:</Text>

                <View style={styles.signatures}>
                    <Text>Academic Adviser: {adviser}</Text>
                    <Text>Clearance Officer: {clearanceOfficer}</Text>
                </View>
            </View>
        </Page>
    </Document>
);

const styles = {
    page: {
        margin: 20,
    },
    header: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subHeading: {
        fontSize: 14,
    },
    content: {
        marginBottom: 20,
    },
    certifies: {
        marginBottom: 10,
    },
    signatures: {
        marginBottom: 10,
    },
};

export default PDFDocument;
