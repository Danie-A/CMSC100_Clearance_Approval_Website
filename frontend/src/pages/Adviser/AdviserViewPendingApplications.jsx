import { useState } from "react";
import { useEffect } from "react";

function AdviserViewPendingApplications() {

  const [pendingApplications, setPendingApplications] = useState([]);
  const [advisees, setAdvisees] = useState([]);

  // get advisees with pending applications

  useEffect(() => {
    const e = async () => { // still not working
      await fetch("http://localhost:3001/get-pending-applications-adviser", { method: "GET", credentials: "include" })
        .then((response) => response.json())
        .then((body) => {
          setPendingApplications(body.applications)
          console.log('body applications is', body.applications)
          console.log('body advisees are', body.advisees)
          setAdvisees(body.advisees);

        });
    };
    e();
  }, []);


  return (
    <>
      <h3>{"Adviser's View Pending Applications"}</h3>
      {pendingApplications.map((application, index) => (
        <div key={index}> {application.owner}</div>


      ))}
    </>
  );
}


export default AdviserViewPendingApplications;
