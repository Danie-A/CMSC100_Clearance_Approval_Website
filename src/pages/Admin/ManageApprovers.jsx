import { useEffect } from "react";
import { useState } from "react";

function ManageApprovers() {
  const [sortBy, setSortBy] = useState("none");
  const [nameFilter, setNameFilter] = useState("");
  const [approversList, setApproversList] = useState([
    { name: "Rice Ragbourne" },
    { name: "Irene Edgeley" },
    { name: "Larissa Cabrales" },
    { name: "Fredelia Emson" },
    { name: "Karyl De Angelo" },
    { name: "Clovis Budik" },
    { name: "Cathee Scolts" },
    { name: "Melloney Kennermann" },
    { name: "Livvyy Louthe" },
    { name: "Germain Whorlow" },
    { name: "Mannie Benge" },
    { name: "Ogdan Elcoate" },
    { name: "Pennie Saile" },
    { name: "Sukey Halsted" },
    { name: "Valentine Fardon" },
  ]);

  useEffect(() => {
    switch (sortBy) {
      case "name_asc":
        setApproversList([...approversList].sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case "name_desc":
        setApproversList([...approversList].sort((a, b) => b.name.localeCompare(a.name)));
        break;
      default:
        break;
    }
  }, [sortBy]);

  return (
    <>
      <h3>Approvers</h3>
      <span>Name </span>
      <button onClick={() => setSortBy("name_asc")}>↑</button>
      <button onClick={() => setSortBy("name_desc")}>↓</button> <br />
      <input placeholder="Name" onChange={(e) => setNameFilter(e.target.value)} value={nameFilter} />
      <button>Search</button>
      <table>
        <tbody>
          {approversList
            .filter((e) => e.name.toLowerCase().includes(nameFilter.toLowerCase()))
            .map((approver, index) => (
              <tr key={index}>
                <td>{approver.name}</td>
                <td>
                  <button>Edit</button>
                </td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default ManageApprovers;
