import { useState, useEffect } from "react";

export default function AdviserSearch() {
  const [sortBy, setSortBy] = useState("none");
  const [studentsList, setStudentsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredItems = studentsList.filter(
    (item) =>
      (item.first_name + " " + item.middle_name + " " + item.last_name)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.student_number.toString().includes(searchTerm)
  );
  const username = localStorage.getItem("username");

  useEffect(() => {
    const e = async () => {
      await fetch("http://localhost:3001/search-students", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((body) => {
          console.log(body.result);
          setStudentsList(body.result);
        });
    };
    e();
  }, []);

  useEffect(() => {
    switch (sortBy) {
      case "name_asc":
        setStudentsList((prevList) =>
          [...prevList].sort((a, b) => a.last_name.localeCompare(b.last_name))
        );
        break;
      case "name_desc":
        setStudentsList((prevList) =>
          [...prevList].sort((a, b) => b.last_name.localeCompare(a.last_name))
        );
        break;
      default:
        break;
    }
  }, [sortBy]);

  return (
    <div className="container">
      <h3>Advisees</h3>
      <span className="">Name </span>
      <button onClick={() => setSortBy("name_asc")}>↑</button>
      <button onClick={() => setSortBy("name_desc")}>↓</button> <br />
      <div>
        <br></br>
        <input
          type="text"
          placeholder="Search by Student Number or Name"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <div>
          {filteredItems.map((student, index) => (
            <div
              className="glass-effect-1a d-flex flex-column px-5 py-3 my-2 gap-1"
              key={index}
            >
              Student:{" "}
              {student.last_name +
                ", " +
                student.first_name +
                " " +
                student.middle_name}
              <div>Student Number: {student.student_number}</div>
              <div>Adviser: {username}</div>
              <div>Application: {student.open_application}</div>
            </div>
          ))}
        </div>
      </div>
      <br />
    </div>
  );
}
