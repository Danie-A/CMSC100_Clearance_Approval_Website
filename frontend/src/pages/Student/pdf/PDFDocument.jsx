import { Document, Page, Text, View, Line, Svg } from '@react-pdf/renderer';

const PDFDocument = ({ applicationId, dateGenerated, studentName, studentNumber, adviser, clearanceOfficer }) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.heading}>University of the Philippines Los Baños</Text>
                <Text style={styles.subHeading}>College of Arts and Sciences</Text>
                <Text style={styles.subHeading}>Institute of Computer Science</Text>
            </View>
            <Svg height="10" width="495">
                <Line x1="0" y1="6" x2="600" y2="5" strokeWidth={1} stroke="rgb(0,0,0)" />
            </Svg>

            <View style={styles.content}>
                <Text>Application ID: {applicationId}</Text>
                <Text>Date Generated: {dateGenerated}</Text>

                <View style={styles.certifies}>
                    <Text className="certifies">This document certifies that {studentName} ({studentNumber}) has satisfied the clearance requirements of the institute.</Text>
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
    document: {
        width: "Letter",
        height: "Letter",
    },
    page: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 40,
    },
    header: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    heading: {
        fontSize: 19,
        fontWeight: "bold",
    },
    subHeading: {
        fontSize: 18,
    },
    content: {
        fontSize: 14,
        marginTop: 60,
        marginBottom: 60,
        marginRight: 40,
        marginLeft: 40,
    },
    certifies: {
        marginTop: 60,
        marginBottom: 80,
    },
    signatures: {
        marginBottom: 10,
    },
};


export default PDFDocument;
