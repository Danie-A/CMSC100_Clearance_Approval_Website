
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Cookies from 'universal-cookie';

export default function Home() {

  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // redirect when login is successful
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard")
    }
  }, [isLoggedIn, navigate])

  function signUp(e) {
    e.preventDefault();

    // form validation goes here 

    fetch("http://localhost:3001/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: document.getElementById("s-name").value,
          email: document.getElementById("s-email").value,
          password: document.getElementById("s-password").value
        })
      })
      .then(response => response.json())
      .then(body => {
        if (body.success) {
          alert("Successfully sign up!")
        }
        else { alert("Sign up failed")}
      })
  }

  function logIn(e) {
    e.preventDefault();

    // form validation goes here

    fetch("http://localhost:3001/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: document.getElementById("l-email").value,
          password: document.getElementById("l-password").value
        })
      })
      .then(response => response.json())
      .then(body => {
        if (body.success) {
          setIsLoggedIn(true)
          // successful log in. store the token as a cookie
          const cookies = new Cookies()
          cookies.set(
            "authToken",
            body.token,
            {
              path: "localhost:3001/",
              age: 60*60,
              sameSite: false
            });

          localStorage.setItem("username", body.username);
        }
        else { alert("Log in failed")}
      })
  }
  
  return (
    <>
      <h1>Sign Up</h1>
      <form id="sign-up">
        <input id="s-name" placeholder="Name" />
        <input id="s-email" placeholder="email" />
        <input id="s-password" type="password" placeholder="password" />
        <button onClick={signUp}>Sign Up</button>
      </form>

      <h1>Log In</h1>
      <form id="log-in">
        <input id="l-email" placeholder="email" />
        <input id="l-password" type="password" placeholder="password" />
        <button onClick={logIn}>Log In</button>
      </form>
    </>
  )
}