import { getSubjects, greetByPOST, getSubjectByCode, addSubject, deleteSubject } from './subject-controller.js';

export default function router(app) {

    // Allow Cross Origin Resource Sharing
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
        next();
    })

    app.get("/get-subjects", getSubjects);
    app.post("/greet-by-post", greetByPOST);
    app.get("/get-subject-by-code", getSubjectByCode);
    app.post("/add-subject", addSubject);
    app.post("/delete-subject", deleteSubject);
}