import { useEffect } from "react";
import { useState } from "react";

function ManageApprovers() {
  const [sortBy, setSortBy] = useState("none");
  const [nameFilter, setNameFilter] = useState("");
  const [approversList, setApproversList] = useState([]);
  const [addApproverInfo, setAddApproverInfo] = useState({ first_name: "", middle_name: "", last_name: "", type: "adviser", email: "", password: "" });
  const [editApproverInfo, setEditApproverInfo] = useState({ first_name: "", middle_name: "", last_name: "", type: "adviser", email: "", password: "" });
  const [editApproverId, setEditApproverId] = useState(null);

  useEffect(() => {
    const e = async () => {
      await fetch("http://localhost:3001/get-all-approvers", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((body) => {
          setApproversList(body.result);
        });
    };
    e();
  }, []);

  useEffect(() => {
    switch (sortBy) {
      case "name_asc":
        setApproversList((prevList) => [...prevList].sort((a, b) => a.first_name.localeCompare(b.first_name)));
        break;
      case "name_desc":
        setApproversList((prevList) => [...prevList].sort((a, b) => b.first_name.localeCompare(a.first_name)));
        break;
      default:
        break;
    }
  }, [sortBy]);

  const handleDeleteApprover = async (approverId) => {
    await fetch("http://localhost:3001/delete-approver", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approverId: approverId }),
    });
    await fetch("http://localhost:3001/get-all-approvers", { method: "GET" })
      .then((response) => response.json())
      .then((body) => {
        setApproversList(body.result);
      });
  };

  const handleEditApprover = async () => {
    if (editApproverId) {
      await fetch("http://localhost:3001/edit-approver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approverId: editApproverId, updatedApprover: editApproverInfo }),
      })
        .then((response) => response.json())
        .then((body) => (body.success ? alert("Succesfully edited") : alert("Failed to edit")));
      setEditApproverId(null);
      setEditApproverInfo({ first_name: "", middle_name: "", last_name: "", type: "adviser", email: "", password: "" });
      await fetch("http://localhost:3001/get-all-approvers", { method: "GET" })
        .then((response) => response.json())
        .then((body) => {
          setApproversList(body.result);
        });
    }
  };

  const handleAddApprover = async () => {
    await fetch("http://localhost:3001/add-approver", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addApproverInfo),
    })
      .then((response) => response.json())
      .then((body) => body.success && setAddApproverInfo({ first_name: "", middle_name: "", last_name: "", type: "adviser", email: "", password: "" }));
    await fetch("http://localhost:3001/get-all-approvers", { method: "GET" })
      .then((response) => response.json())
      .then((body) => {
        setApproversList(body.result);
      });
  };

  const handlePreEdit = (approver) => {
    setEditApproverId(approver._id);
    setEditApproverInfo({
      first_name: approver.first_name,
      middle_name: approver.middle_name,
      last_name: approver.last_name,
      type: approver.type,
      email: approver.email,
      password: approver.password,
    });
  };
  return (
    <>
      {/* Displaying approvers */}
      <h3>Approvers</h3>
      <span>Name </span>
      <button onClick={() => setSortBy("name_asc")}>↑</button>
      <button onClick={() => setSortBy("name_desc")}>↓</button> <br />
      <input placeholder="Name" onChange={(e) => setNameFilter(e.target.value)} value={nameFilter} />
      <button>Search</button>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>Type</td>
          </tr>
          {approversList
            .filter((e) => (e.first_name + " " + e.middle_name + " " + e.last_name).toLowerCase().includes(nameFilter.toLowerCase()))
            .map((approver, index) => (
              <tr key={index}>
                <td>{approver.first_name + " " + approver.middle_name + " " + approver.last_name}</td>
                <td>{approver.type}</td>
                <td>
                  <button onClick={() => handlePreEdit(approver)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteApprover(approver._id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <br />
      <br />
      {/* Adding an approver */}
      <h3>Add an approver</h3>
      <input placeholder="First name" value={addApproverInfo.first_name} onChange={(e) => setAddApproverInfo({ ...addApproverInfo, first_name: e.target.value })} />
      <input placeholder="Middle name" value={addApproverInfo.middle_name} onChange={(e) => setAddApproverInfo({ ...addApproverInfo, middle_name: e.target.value })} />
      <input placeholder="Last name" value={addApproverInfo.last_name} onChange={(e) => setAddApproverInfo({ ...addApproverInfo, last_name: e.target.value })} />
      <br />
      <select value={addApproverInfo.type} onChange={(e) => setAddApproverInfo({ ...addApproverInfo, type: e.target.value })}>
        <option>Adviser</option>
        <option>Clearance officer</option>
      </select>
      <br />
      <input placeholder="email" value={addApproverInfo.email} onChange={(e) => setAddApproverInfo({ ...addApproverInfo, email: e.target.value })} />
      <input type="password" placeholder="password" value={addApproverInfo.password} onChange={(e) => setAddApproverInfo({ ...addApproverInfo, password: e.target.value })} />
      <br />
      <button onClick={handleAddApprover}>Add</button>
      <br />
      <br />
      {/* Editing an approver */}
      <h3>Edit an approver</h3>
      <input placeholder="First name" value={editApproverInfo.first_name} onChange={(e) => setEditApproverInfo({ ...editApproverInfo, first_name: e.target.value })} />
      <input placeholder="Middle name" value={editApproverInfo.middle_name} onChange={(e) => setEditApproverInfo({ ...editApproverInfo, middle_name: e.target.value })} />
      <input placeholder="Last name" value={editApproverInfo.last_name} onChange={(e) => setEditApproverInfo({ ...editApproverInfo, last_name: e.target.value })} />
      <br />
      <select value={editApproverInfo.type} onChange={(e) => setEditApproverInfo({ ...editApproverInfo, type: e.target.value })}>
        <option>Adviser</option>
        <option>Clearance officer</option>
      </select>
      <br />
      <input placeholder="email" value={editApproverInfo.email} onChange={(e) => setEditApproverInfo({ ...editApproverInfo, email: e.target.value })} />
      <input placeholder="password" disabled />
      <br />
      <button onClick={handleEditApprover}>Edit</button>
    </>
  );
}

export default ManageApprovers;
