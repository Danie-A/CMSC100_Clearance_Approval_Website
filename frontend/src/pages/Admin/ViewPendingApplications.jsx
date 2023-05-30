import { useEffect, useState } from "react";

function ViewPendingApplications() {
  const [sortBy, setSortBy] = useState("none");
  const [studentsList, setStudentsList] = useState([]);
  const [approversList, setApproversList] = useState([]);
  const [approving, setApproving] = useState(null);
  const [adviser, setAdviser] = useState();

  useEffect(() => {
    const e = async () => {
      await fetch("http://localhost:3001/get-pending-applications", { method: "GET", credentials: "include" })
        .then((response) => response.json())
        .then((body) => {
          setStudentsList(body.request);
        });
    };
    e();
  }, []);

  useEffect(() => {
    switch (sortBy) {
      case "name_asc":
        setStudentsList((prevList) => [...prevList].sort((a, b) => a.first_name.localeCompare(b.first_name)));
        break;
      case "name_desc":
        setStudentsList((prevList) => [...prevList].sort((a, b) => b.first_name.localeCompare(a.first_name)));
        break;
      case "studNum_asc":
        setStudentsList((prevList) => [...prevList].sort((a, b) => b.student_number.localeCompare(a.student_number)));
        break;
      case "studNum_desc":
        setStudentsList((prevList) => [...prevList].sort((a, b) => a.student_number.localeCompare(b.student_number)));
        break;
      default:
        break;
    }
  }, [sortBy]);

  useEffect(() => console.log(adviser));

  const handleReject = async (studentId) => {
    await fetch("http://localhost:3001/reject-student-account", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: studentId }),
    })
      .then((response) => response.json())
      .then((body) => {
        console.log(body);
      });
    await fetch("http://localhost:3001/get-pending-applications", { method: "GET", credentials: "include" })
      .then((response) => response.json())
      .then((body) => {
        setStudentsList(body.request);
      });
  };

  const preApprove = async (student) => {
    setApproving(student);
    await fetch("http://localhost:3001/get-all-advisers", { method: "GET", credentials: "include" })
      .then((response) => response.json())
      .then((body) => {
        setApproversList(body.result);
        setAdviser(body.result[0]?._id);
      });
  };

  const handleApprove = async () => {
    await fetch("http://localhost:3001/approve-student-account", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: approving._id, approverId: adviser }),
    });
    await fetch("http://localhost:3001/get-pending-applications", { method: "GET", credentials: "include" })
      .then((response) => response.json())
      .then((body) => {
        setStudentsList(body.request);
      });
    setApproving(null);
  };

  return (
    <>
      <h3>View Pending Accounts</h3>
      <span>Sort by:</span>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="none">{"None"}</option>
        <option value="name_asc">{"Name (Ascending)"}</option>
        <option value="name_desc">{"Name (Descending)"}</option>
        <option value="studNum_asc">{"Student Number (Ascending)"}</option>
        <option value="studNum_desc">{"Student Number (Descending)"}</option>
      </select>
      <table>
        <tbody>
          {studentsList?.map((student, index) => (
            <tr key={index}>
              <td>{student.first_name + " " + student.middle_name + " " + student.last_name}</td>
              <td>
                <button onClick={() => preApprove(student)}>Approve</button>
              </td>
              <td>
                <button onClick={() => handleReject(student._id)}>Reject</button>
              </td>
              <td>{`Student Number: ${student.student_number} (just to make sure sort by student number works)`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />

      {approving && (
        <>
          <h3>Approving A Student</h3>
          <h6>{"Approving " + approving.first_name}</h6>
          <span>{"Select Adviser: "}</span>
          <select value={adviser} onChange={(e) => setAdviser(e.target.value)}>
            {approversList?.map((approver, index) => (
              <option value={approver._id} key={index}>
                {approver.first_name + " " + approver.middle_name + " " + approver.last_name}
              </option>
            ))}
          </select>
          <button onClick={handleApprove}>Approve</button>
        </>
      )}
    </>
  );
}

export default ViewPendingApplications;
