import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";

export default function Dashboard() {
  const username = localStorage.getItem("username");
  const [isLoggedIn, setIsLoggedIn] = useState(useLoaderData());
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  function logout() {
    const cookies = new Cookies();
    cookies.remove("authToken");

    localStorage.removeItem("username");

    setIsLoggedIn(false);
  }

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
      Welcome to the dashboard, {username} !<br />
      <button onClick={logout}>Log Out</button>
      <button onClick={viewMyInfo}>View My Info</button>
    </>
  );
}
