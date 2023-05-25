import mongoose from 'mongoose';

await mongoose.connect('mongodb://127.0.0.1:27017/ClearMe')

const User = mongoose.model('User', {
    first_name: String,
    middle_name: String,
    last_name: String,
    user_type: String,
    email: String,
    password: String,
    student_number: {
        type: String,
        default: null
    },
    adviser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    applications: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application'
        }],
        default: []
    },
});

const remarkSchema = new mongoose.Schema({
    remark: String,
    date: Date,
    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    step_given: Number
});

const submissionSchema = new mongoose.Schema({
    step_submitted: Number,
    date_submitted: Date,
    remark_link: String
});

const applicationSchema = new mongoose.Schema({
    status: String,
    step: Number,
    remarks: {
        type: [remarkSchema],
        default: null
    },
    student_submissions: [submissionSchema]
});

const Application = mongoose.model('Application', applicationSchema);

// const getSubjects = async (req, res) => {
//     const subjects = await Subject.find({});
//     res.send(subjects)
// }

// const greetByPOST = async (req, res) => {
//     console.log(req.body.name)

//     const greeting = "Hello, " + req.body.name;
//     res.send(greeting)
// }


// // get subject by code
// const getSubjectByCode = async (req, res) => {
//     const subject = await Subject.findOne({ code: req.query.code })
//     res.send(subject)
// }

// // save new subject
// const addSubject = async (req, res) => {
//     const { code, title, desc, units, sem_offered } = req.body

//     const newSubject = new Subject({ code, title, desc, units, sem_offered })

//     const result = await newSubject.save()

//     if (result._id) {
//         res.send({ success: true })
//         console.log("SUCCESS")
//     } else {
//         res.send({ success: false })
//         console.log("FALSE")
//     }
// }

// // delete
// const deleteSubject = async (req, res) => {
//     const { code } = req.body

//     const result = await Subject.deleteOne({ code })

//     if (result.deletedCount == 1) {
//         res.send({ success: true })
//     } else {
//         res.send({ success: false })
//     }

// }


// export { getSubjects, greetByPOST, getSubjectByCode, addSubject, deleteSubject };