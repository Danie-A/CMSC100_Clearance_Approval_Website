import { useState } from "react";

function AdminHome() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleCSVUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      fetch("http://localhost:3001/upload-csv-file", { method: "POST", body: formData })
        .then((res) => res.json())
        .then((body) => {
          if (body.success) alert("Successfully uploaded CSV file!");
          else alert("Error uploading CSV file!");
        });
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  };

  return (
    <>
      <h3>{"Welcome admin"}</h3>
      <span>Csv file: </span> <br />
      <form></form>
      <input type="file" name="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
      <br />
      <button onClick={handleCSVUpload}>Submit</button>
    </>
  );
}

export default AdminHome;
