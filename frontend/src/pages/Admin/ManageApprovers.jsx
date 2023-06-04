import { useEffect, useState } from "react";
import ReactModal from "react-modal";

const initialApproverState = {
  first_name: "",
  middle_name: "",
  last_name: "",
  email: "",
  password: "",
};

function ManageApprovers() {
  ReactModal.setAppElement("#root");
  const [sortBy, setSortBy] = useState("none");
  const [nameFilter, setNameFilter] = useState("");
  const [approversList, setApproversList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addApproverInfo, setAddApproverInfo] = useState(initialApproverState);
  const [editApproverInfo, setEditApproverInfo] =
    useState(initialApproverState);
  const [editApproverId, setEditApproverId] = useState(null);
  const modalStyle = {
    content: {
      position: "absolute",
      height: "450px",
      maxWidth: "500px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "auto",
      borderRadius: "15px",
      backgroundColor: "#ffffff75",
    },
  };

  useEffect(() => {
    fetch("http://localhost:3001/get-all-advisers", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((body) => setApproversList(body.result));
  }, []);

  useEffect(() => {
    switch (sortBy) {
      case "name_asc":
        setApproversList((prevList) =>
          [...prevList].sort((a, b) => a.first_name.localeCompare(b.first_name))
        );
        break;
      case "name_desc":
        setApproversList((prevList) =>
          [...prevList].sort((a, b) => b.first_name.localeCompare(a.first_name))
        );
        break;
      default:
        break;
    }
  }, [sortBy]);

  const handleDeleteApprover = async (approverId) => {
    await fetch("http://localhost:3001/delete-approver", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approverId: approverId }),
    });
    await fetch("http://localhost:3001/get-all-advisers", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((body) => setApproversList(body.result));
  };

  const handleEditApprover = async () => {
    if (editApproverId) {
      await fetch("http://localhost:3001/edit-approver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          approverId: editApproverId,
          updatedApprover: editApproverInfo,
        }),
      })
        .then((response) => response.json())
        .then((body) => !body.success && alert("Failed to edit"));
      setEditApproverId(null);
      setShowEditModal(false);
      setEditApproverInfo(initialApproverState);
      await fetch("http://localhost:3001/get-all-advisers", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((body) => {
          setApproversList(body.result);
        });
    }
  };

  const handleAddApprover = async () => {
    await fetch("http://localhost:3001/add-approver", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addApproverInfo),
    })
      .then((response) => response.json())
      .then((body) => body.success && setAddApproverInfo(initialApproverState));
    setShowAddModal(false);
    setAddApproverInfo(initialApproverState);
    await fetch("http://localhost:3001/get-all-advisers", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((body) => {
        setApproversList(body.result);
      });
  };

  const handlePreEdit = (approver) => {
    setShowEditModal(true);
    setEditApproverId(approver._id);
    setEditApproverInfo({
      first_name: approver.first_name,
      middle_name: approver.middle_name,
      last_name: approver.last_name,
      email: approver.email,
    });
  };

  const handlePreAdd = () => {
    setShowAddModal(true);
  };

  return (
    <>
      {/* Displaying approvers */}
      <div className="container d-flex flex-column">
        <h3 className="my-4">Advisers</h3>
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-row gap-1 align-items-center justify-content-start">
            <input
              className="glass-effect-1 m-0 px-4"
              placeholder="Name"
              onChange={(e) => setNameFilter(e.target.value)}
              value={nameFilter}
            />
            <button className="glass-effect-1 m-0 px-3 me-3">Search</button>
            <button
              className="glass-effect-2 m-0 px-3"
              onClick={() => setSortBy("name_asc")}
            >
              ↑
            </button>
            <button
              className="glass-effect-2 m-0 px-3"
              onClick={() => setSortBy("name_desc")}
            >
              ↓
            </button>
          </div>
          <button className="btn px-5 glass-effect-4" onClick={handlePreAdd}>
            Add
          </button>
        </div>
        <br />
        {/* <table>
          <tbody> */}
        {approversList
          .filter((e) =>
            (e.first_name + " " + e.middle_name + " " + e.last_name)
              .toLowerCase()
              .includes(nameFilter.toLowerCase())
          )
          .map((approver, index) => (
            <div
              className="card glass-effect-4 p-2 py-sm-3 px-sm-5 m-1 d-flex flex-row justify-content-between align-items-center"
              key={index}
            >
              <div className="fw-semibold">
                {approver.first_name +
                  " " +
                  approver.middle_name +
                  " " +
                  approver.last_name}
              </div>
              <div className="d-flex flex-row gap-3">
                <button
                  className="glass-effect-4 px-4"
                  onClick={() => handlePreEdit(approver)}
                >
                  Edit
                </button>
                <button
                  className="glass-effect-4 px-4"
                  onClick={() => handleDeleteApprover(approver._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Editing an approver */}
      <ReactModal isOpen={showEditModal} style={modalStyle}>
        <div className="d-flex flex-column gap  -1 p-0 py-sm-3 px-sm-4 w-100 h-100 justify-content-between">
          <button
            type="button"
            className="btn-close btn-right"
            onClick={() => setShowEditModal(false)}
          />
          <h4 className="fw-semibold mb-4">Edit an Adviser</h4>
          <div className="d-flex align-items-center gap-3">
            <label>First Name: </label>
            <input
              className="glass-effect-5 flex-grow-1 px-3"
              placeholder="First name"
              value={editApproverInfo.first_name}
              onChange={(e) =>
                setEditApproverInfo({
                  ...editApproverInfo,
                  first_name: e.target.value,
                })
              }
            />
          </div>
          <div className="d-flex align-items-center gap-3">
            <label>Middle Name: </label>
            <input
              className="glass-effect-5 flex-grow-1 px-3"
              placeholder="Middle name"
              value={editApproverInfo.middle_name}
              onChange={(e) =>
                setEditApproverInfo({
                  ...editApproverInfo,
                  middle_name: e.target.value,
                })
              }
            />
          </div>
          <div className="d-flex align-items-center gap-3">
            <label>Last Name: </label>
            <input
              className="glass-effect-5 flex-grow-1 px-3"
              placeholder="Last name"
              value={editApproverInfo.last_name}
              onChange={(e) =>
                setEditApproverInfo({
                  ...editApproverInfo,
                  last_name: e.target.value,
                })
              }
            />
          </div>
          <div className="d-flex align-items-center gap-3">
            <label>Email: </label>
            <input
              className="glass-effect-5 flex-grow-1 px-3"
              placeholder="email"
              value={editApproverInfo.email}
              onChange={(e) =>
                setEditApproverInfo({
                  ...editApproverInfo,
                  email: e.target.value,
                })
              }
            />
          </div>
          <br />
          <button onClick={handleEditApprover}>Edit</button>
        </div>
      </ReactModal>
      <ReactModal
        isOpen={showAddModal}
        style={modalStyle}
        onAfterClose={() => {}}
      >
        <div className="d-flex flex-column gap-1 p-0 py-sm-3 px-sm-4 w-100 h-100 justify-content-between">
          <button
            type="button"
            className="btn-close btn-right"
            onClick={() => setShowAddModal(false)}
          />
          <h4 className="fw-semibold mb-4">Add an Adviser</h4>

          <input
            className="glass-effect-5 px-4"
            placeholder="First name"
            value={addApproverInfo.first_name}
            onChange={(e) =>
              setAddApproverInfo({
                ...addApproverInfo,
                first_name: e.target.value,
              })
            }
          />
          <input
            className="glass-effect-5 px-4"
            placeholder="Middle name"
            value={addApproverInfo.middle_name}
            onChange={(e) =>
              setAddApproverInfo({
                ...addApproverInfo,
                middle_name: e.target.value,
              })
            }
          />
          <input
            className="glass-effect-5 px-4"
            placeholder="Last name"
            value={addApproverInfo.last_name}
            onChange={(e) =>
              setAddApproverInfo({
                ...addApproverInfo,
                last_name: e.target.value,
              })
            }
          />
          <input
            className="glass-effect-5 px-4"
            placeholder="Email"
            type="email"
            value={addApproverInfo.email}
            onChange={(e) =>
              setAddApproverInfo({ ...addApproverInfo, email: e.target.value })
            }
            required
          />
          <input
            className="glass-effect-5 px-4"
            type="password"
            placeholder="Password"
            value={addApproverInfo.password}
            onChange={(e) =>
              setAddApproverInfo({
                ...addApproverInfo,
                password: e.target.value,
              })
            }
          />
          <button onClick={handleAddApprover}>Add</button>
        </div>
      </ReactModal>
    </>
  );
}

export default ManageApprovers;
