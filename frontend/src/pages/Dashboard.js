import Cookies from "universal-cookie";
import { useState } from "react";
import { redirect } from 'react-router-dom';

export default function Dashboard() {
  const username = localStorage.getItem("username")

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  function logout() {

    // Delete cookie with authToken
    const cookies = new Cookies();
    cookies.remove("authToken");

    // Delete username in local storage
    localStorage.removeItem("username");

    //@TODO: Redirect to Home
    // use state and effects
  }

  return (
    <>
      Welcome to the dashboard, {username} !<br />

      <button onClick={logout}>Log Out</button>
    </>
  )
}