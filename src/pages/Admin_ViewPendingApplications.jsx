import { useState } from "react";

function ViewPendingApplication() {
  const students = [
    {
      name: "Celine Reynolds",
    },
    {
      name: "Velva Corkery",
    },
    {
      name: "Mellie Boyle",
    },
    {
      name: "Winnifred White",
    },
    {
      name: "Luisa Beatty",
    },
    {
      name: "Elias Bayer",
    },
    {
      name: "Titus Considine",
    },
    {
      name: "Alisa Barrows",
    },
    {
      name: "Russell Gorczany",
    },
    {
      name: "Francisca Hoeger",
    },
  ];

  const [nameFilter, setNameFilter] = useState("");

  return (
    <>
      <h3>View Pending Applications</h3>
      <input placeholder="Name" onChange={(e) => setNameFilter(e.target.value)} value={nameFilter} />
      <button>Search</button>
      <table>
        <tbody>
          {students
            .filter((e) => e.name.toLowerCase().includes(nameFilter.toLowerCase()))
            .map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>
                  <input placeholder="Approver" />
                  <button onclick={() => {}}>Assign</button>
                </td>
                <td>
                  <button>Approve</button>
                </td>
                <td>
                  <button>Reject</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default ViewPendingApplication;
