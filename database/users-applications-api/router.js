import { addStudent, addApprover } from './users-applications-controller.js';

export default function router(app) {

    // Allow Cross Origin Resource Sharing
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
        next();
    })

    app.post("/add-student", addStudent);
    app.post("/add-approver", addApprover);
    // app.get("/get-subjects", getSubjects);
    // app.post("/greet-by-post", greetByPOST);
    // app.get("/get-subject-by-code", getSubjectByCode);

    // app.post("/delete-subject", deleteSubject);
}