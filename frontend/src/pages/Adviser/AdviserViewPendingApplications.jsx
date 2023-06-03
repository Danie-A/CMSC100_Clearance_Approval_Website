import { useState } from "react";
import { useEffect } from "react";

function AdviserViewPendingApplications() {
  const [pendingApplications, setPendingApplications] = useState([]);
  useEffect(() => {
    const e = async () => {
      await fetch("http://localhost:3001/get-pending-applications-adviser", { method: "GET", credentials: "include" })
        .then((response) => response.json())
        .then((body) => setPendingApplications(body.request));
    };
    e();
  }, []);

  useEffect(() => console.log(pendingApplications));

  return (
    <>
      <h3>{"Adviser's View Pending Applications"}</h3>
      {pendingApplications.map((application, index) => (
        <table>
          <tbody>
            <tr key={index}>
              {application.owner}
            </tr>
          </tbody>
        </table>
      ))}
    </>
  );
}

export default AdviserViewPendingApplications;
