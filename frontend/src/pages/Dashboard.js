import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import { useNavigate, useLoaderData } from 'react-router-dom';

export default function Dashboard() {
  const username = localStorage.getItem("username")
  const [isLoggedIn, setIsLoggedIn] = useState(useLoaderData())
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/")
    }
  }, [isLoggedIn, navigate])

  function logout() {
    const cookies = new Cookies();
    cookies.remove("authToken");

    localStorage.removeItem("username");

    setIsLoggedIn(false)
  }

  return (
    <>
      Welcome to the dashboard, {username} !<br />

      <button onClick={logout}>Log Out</button>
    </>
  )
}