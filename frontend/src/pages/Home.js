import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // redirect when login is successful
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  function signUp(e) {
    e.preventDefault();
    // form validation goes here
    fetch("http://localhost:3001/signup-student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: document.getElementById("s-fname").value,
        middle_name: document.getElementById("s-mname").value,
        last_name: document.getElementById("s-lname").value,
        student_number: document.getElementById("s-sno").value,
        email: document.getElementById("s-email").value,
        password: document.getElementById("s-password").value,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.success) {
          alert("SUCCESS: You have successfully signed up!");
        } else {
          alert("ERROR: Failed to sign up.");
        }
      });
  }

  function logIn(e) {
    e.preventDefault();

    // form validation goes here

    fetch("http://localhost:3001/login-student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: document.getElementById("l-email").value,
        password: document.getElementById("l-password").value,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.success) {
          setIsLoggedIn(true);
          // successful log in. store the token as a cookie
          const cookies = new Cookies();
          cookies.set("authToken", body.token, {
            path: "localhost:3001/",
            age: 60 * 60,
            sameSite: false,
          });

          localStorage.setItem("username", body.username);
        } else {
          alert("Log in failed");
        }
      });
  }

  // [/] change s-name to s-fname
  // [] @up.edu.ph email validation
  // [] User to Student schema

  return (
    <>
      <h1>Sign Up</h1>
      <form id="sign-up">
        <input id="s-fname" placeholder="First Name" />
        <input id="s-mname" placeholder="Middle Name" />
        <input id="s-lname" placeholder="Last Name" />
        <input id="s-sno" placeholder="Student Number" />
        <input id="s-email" placeholder="UP Mail" />
        <input id="s-password" type="password" placeholder="Password" />
        <button onClick={signUp}>Sign Up</button>
      </form>

      <h1>Log In</h1>
      <form id="log-in">
        <input id="l-email" placeholder="Email" />
        <input id="l-password" type="password" placeholder="Password" />
        <button onClick={logIn}>Log In</button>
      </form>
    </>
  );
}
