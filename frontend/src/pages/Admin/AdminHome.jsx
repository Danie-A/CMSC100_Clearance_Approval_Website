function AdminHome() {
  const handleCSVUpload = async (event) => {
    try {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);

      const options = { method: "POST", body: formData };

      const response = await fetch("http://localhost:3001/upload-csv-file", options);
      if (response.ok) {
        console.log("File uploaded successfully!");
      } else {
        console.error("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <h3>{"Welcome admin"}</h3>
      <span>Csv file: </span> <br />
      <input type="file" name="file" onChange={handleCSVUpload} />
    </>
  );
}

export default AdminHome;
