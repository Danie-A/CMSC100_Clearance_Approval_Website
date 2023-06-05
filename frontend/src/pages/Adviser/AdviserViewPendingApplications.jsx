import { useState } from "react";
import { useEffect } from "react";
import ReactModal from "react-modal";
import { AiFillFolderOpen } from "react-icons/ai";
import SeeProfile from "./SeeProfile.jsx";

function AdviserViewPendingApplications() {
  const handleOpenModal = (index) => {
    setShowModal(index);
  };
  const handleCloseModal = async () => {
    setShowModal(-1);
    await fetch("http://localhost:3001/get-students-with-pending-application", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((body) => {
        setStudents(body.students);
      });
    fetch("http://localhost:3001/get-students-with-pending-application", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((body) => {
        console.log(body);
        setStudents(body.students);
      });
  };

  ReactModal.setAppElement("#root"); // Set the app element
  const [showModal, setShowModal] = useState(-1);
  const [students, setStudents] = useState([]);
  const [studentNumber, setStudentNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStep, setFilterStep] = useState("None");
  const [sortBy, setSortBy] = useState("None");

  var options = { year: "numeric", month: "2-digit", day: "2-digit" };

  useEffect(() => {
    async function fetchData() {
      await fetch(
        "http://localhost:3001/get-students-with-pending-application",
        { method: "GET", credentials: "include" }
      )
        .then((response) => response.json())
        .then((body) => {
          console.log(body);
          setStudents(body.students);
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    switch (sortBy) {
      case "name_asc":
        setStudents((prevList) =>
          [...prevList].sort((a, b) => a.first_name.localeCompare(b.first_name))
        );
        break;
      case "name_desc":
        setStudents((prevList) =>
          [...prevList].sort((a, b) => b.first_name.localeCompare(a.first_name))
        );
        break;
      case "date_asc":
        setStudents((prevList) =>
          [...prevList].sort((a, b) =>
            a.open_application.student_submissions[
              a.open_application.student_submissions.length - 1
            ].date.localeCompare(
              b.open_application.student_submissions[
                b.open_application.student_submissions.length - 1
              ].date
            )
          )
        );
        break;
      case "date_desc":
        setStudents((prevList) =>
          [...prevList].sort((a, b) =>
            b.open_application.student_submissions[
              b.open_application.student_submissions.length - 1
            ].date.localeCompare(
              a.open_application.student_submissions[
                a.open_application.student_submissions.length - 1
              ].date
            )
          )
        );
        break;
      default:
        break;
    }
  }, [sortBy]);

  useEffect(() => {
    console.log(filterDate);
  });

  function showStudents() {
    if (students.length > 0) {
      return (
        <div className="container">
          <div className="d-flex flex-row align-items-center gap-2">
            <div>{"Search: "}</div>
            <input
              type="text"
              placeholder="Student Number"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="Student Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
            <input
              type="date"
              placeholder="Date"
              className="glass-effect-5"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
            <label>{"Step: "}</label>
            <select
              className="glass-effect-3"
              value={filterStep}
              onChange={(e) => setFilterStep(e.target.value)}
            >
              <option value="None">{"None"}</option>
              <option value="1">{"1"}</option>
              <option value="2">{"2"}</option>
            </select>
          </div>
          <div className="d-flex flex-row align-items-center">
            <div>{"Sort by:"}</div>
            <span className="ms-4 me-1">{"Name"}</span>
            <button onClick={() => setSortBy("name_asc")}>↑</button>
            <button onClick={() => setSortBy("name_desc")}>↓</button>
            <span className="ms-4 me-1">{"Date"}</span>
            <button onClick={() => setSortBy("date_asc")}>↑</button>
            <button onClick={() => setSortBy("date_desc")}>↓</button>
          </div>
          <br />
          <div className="p-2 py-sm-3 px-sm-5 m-2 d-flex flex-row">
            <div className="flex-fill text-left">{"Name"}</div>
            <div className="flex-fill text-left">{"Student Number"}</div>
            <div className="flex-fill text-left">{"Adviser"}</div>
            <div className="flex-fill text-left">{"Step"}</div>
            <div className="flex-fill" />
            <div className="flex-fill" />
          </div>
          {students
            .filter((e) => e.student_number.includes(studentNumber))
            .filter((e) =>
              (e.first_name + " " + e.middle_name + " " + e.last_name)
                .toLocaleLowerCase()
                .includes(studentName.toLocaleLowerCase())
            )
            .filter((e) => {
              var submissionDate = new Date(
                e.open_application.student_submissions[
                  e.open_application.student_submissions.length - 1
                ].date
              );
              var formattedDate = submissionDate.toLocaleDateString(
                "en-US",
                options
              );
              var dateParts = formattedDate.split("/");
              formattedDate =
                dateParts[2] +
                "-" +
                dateParts[0].padStart(2, "0") +
                "-" +
                dateParts[1].padStart(2, "0");
              console.log(formattedDate);
              return filterDate === "" || formattedDate === filterDate;
            })
            .filter(
              (e) =>
                filterStep === "None" ||
                e.open_application.student_submissions[
                  e.open_application.student_submissions.length - 1
                ].step.toString() === filterStep
            )
            .map((student, index) => (
              <div
                key={index}
                className="card glass-effect-4 p-2 py-sm-3 px-sm-5 m-2 d-flex flex-row justify-content-between align-items-center"
              >
                {/* Student Name */}
                <div className="flex-fill col-3">
                  {student.first_name} {student.last_name}
                </div>
                <div className="flex-fill col-3">{student.student_number}</div>
                <div className="flex-fill col-3">
                  {localStorage.getItem("username")}
                </div>
                <div className="flex-fill col-3">
                  {
                    student.open_application.student_submissions[
                      student.open_application.student_submissions.length - 1
                    ].step
                  }
                </div>

                {/* View Application Button */}
                <div className="flex-fill col-2">
                  <button
                    className="glass-effect-3"
                    onClick={() => handleOpenModal(index)}
                  >
                    <AiFillFolderOpen
                      className="mr-2"
                      style={{ marginRight: "8px" }}
                    />
                    View Application
                  </button>
                </div>

                {/* Will Pop Up If View Application is Clicked */}
                <ReactModal
                  isOpen={showModal === index}
                  contentLabel="Remarks"
                  onRequestClose={handleCloseModal}
                  shouldCloseOnOverlayClick={false}
                  appElement={document.getElementById("root")} // Set the app element
                >
                  <SeeProfile
                    handleCloseModal={handleCloseModal}
                    student={student}
                  />
                </ReactModal>
              </div>
            ))}
        </div>
      );
    } else {
      return <div>You have no advisees with a pending application.</div>;
    }
  }

  return (
    <div className="whole-container">
      <h3>{"View Students with Pending Application"}</h3>
      {showStudents()}
    </div>
  );
}

export default AdviserViewPendingApplications;
