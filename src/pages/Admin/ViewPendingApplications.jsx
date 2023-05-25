import { useEffect } from "react";
import { useState } from "react";

function ViewPendingApplications() {
  const [sortBy, setSortBy] = useState("none");
  const [studentsList, setStudentsList] = useState([
    {
      name: "Celine Reynolds",
      studentNum: "2021-12345",
    },
    {
      name: "Velva Corkery",
      studentNum: "2021-02345",
    },
    {
      name: "Mellie Boyle",
      studentNum: "2021-22345",
    },
    {
      name: "Winnifred White",
      studentNum: "2021-12343",
    },
    {
      name: "Luisa Beatty",
      studentNum: "2021-12245",
    },
    {
      name: "Elias Bayer",
      studentNum: "2021-12545",
    },
    {
      name: "Titus Considine",
      studentNum: "2021-12347",
    },
    {
      name: "Alisa Barrows",
      studentNum: "2020-12345",
    },
    {
      name: "Russell Gorczany",
      studentNum: "2022-12345",
    },
    {
      name: "Francisca Hoeger",
      studentNum: "2021-10025",
    },
  ]);

  useEffect(() => {
    switch (sortBy) {
      case "name_asc":
        setStudentsList((prevList) => [...prevList].sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case "name_desc":
        setStudentsList((prevList) => [...prevList].sort((a, b) => b.name.localeCompare(a.name)));
        break;
      case "studNum_asc":
        setStudentsList((prevList) => [...prevList].sort((a, b) => b.studentNum.localeCompare(a.studentNum)));
        break;
      case "studNum_desc":
        setStudentsList((prevList) => [...prevList].sort((a, b) => a.studentNum.localeCompare(b.studentNum)));
        break;
      default:
        break;
    }
  }, [sortBy]);

  return (
    <>
      <h3>View Pending Applications</h3>
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
          {studentsList.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>
                <button>Approve</button>
              </td>
              <td>
                <button>Reject</button>
              </td>
              <td>{`Student Number: ${student.studentNum} (just to make sure sort by student number works)`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  // Incorrect
  // return (
  //   <>
  //     <h3>View Pending Applications</h3>
  //     <input placeholder="Name" onChange={(e) => setNameFilter(e.target.value)} value={nameFilter} />
  //     <button>Search</button>
  //     <table>
  //       <tbody>
  //         {students
  //           .filter((e) => e.name.toLowerCase().includes(nameFilter.toLowerCase()))
  //           .map((student, index) => (
  //             <tr key={index}>
  //               <td>{student.name}</td>
  //               <td>
  //                 <input placeholder="Approver" />
  //                 <button onclick={() => {}}>Assign</button>
  //               </td>
  //               <td>
  //                 <button>Approve</button>
  //               </td>
  //               <td>
  //                 <button>Reject</button>
  //               </td>
  //             </tr>
  //           ))}
  //       </tbody>
  //     </table>
  //   </>
  // );
}

export default ViewPendingApplications;
