export default function Dashboard() {
  const viewMyInfo = async () => {
    await fetch("http://localhost:3001/view-student-info", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((body) => {
        console.log(body);
      });
  };

  return (
    <>

      <div className="whole-container">
        <p>You have no pending clearance application.</p>
        <button type="button" class="btn btn-primary">Create Clearance Application</button>
        <br></br>
        <button type="button" class="btn btn-primary" onClick={viewMyInfo}>View My Info</button>
      </div>

    </>
  );
}
