import { useState } from "react";

function AdminHome() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleCSVUpload = async () => {
    try {
      if (!selectedFile) alert("Upload a csv first!");
      else {
        const formData = new FormData();
        formData.append("file", selectedFile);
        fetch("http://localhost:3001/upload-csv-file", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((body) => {
            if (body.success) alert("Successfully uploaded CSV file!");
            else alert("Error uploading CSV file!");
          });
      }
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  };

  return (
    <>
      <div
        id="welcome-admin"
        className="container d-flex flex-column align-items-start"
      >
        <h3 className="my-4">{"Welcome Admin!"}</h3>
        <span>CSV File to Map Students with their Adviser: </span>
        <label className="custom-file-upload">
          <input
            type="file"
            name="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          Click to Upload CSV
        </label>
        <button onClick={handleCSVUpload}>Submit</button>
        <img
          id="image"
          src="https://i.pinimg.com/originals/1b/0f/b0/1b0fb0ed95b7ee77ac662af8adcc29e7.png"
          alt="admin-home"
        ></img>
      </div>
    </>
  );
}

export default AdminHome;
