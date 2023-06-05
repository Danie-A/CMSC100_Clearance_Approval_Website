import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // redirect when login is successful
  useEffect(() => {
    if (isLoggedIn === "student") {
      navigate("/student");
    } else if (isLoggedIn === "adviser") {
      navigate("/adviser");
    } else if (isLoggedIn === "admin") {
      navigate("/admin");
    }
  }, [isLoggedIn, navigate]);

  function clearSignUpFields() {
    document.getElementById("s-fname").value = ""; // clear fields again
    document.getElementById("s-mname").value = "";
    document.getElementById("s-lname").value = "";
    document.getElementById("s-sno").value = "";
    document.getElementById("s-email").value = "";
    document.getElementById("s-password").value = "";
  }

  function signUp(e) {
    e.preventDefault();
    // Regular expression for email validation
    var sno = document.getElementById("s-sno").value;
    var email = document.getElementById("s-email").value;
    var emailRegex = /^[^\s@]+@up\.edu\.ph$/;
    var snoRegex = /^\d{4}-\d{5}$/;

    if (!emailRegex.test(email)) {
      // Display an error message or perform any desired actions
      alert(
        "ERROR: Invalid Email Address! Make sure it is a UP Mail: @up.edu.ph"
      );
      return false; // Prevent form submission
    } else if (!snoRegex.test(sno)) {
      // Display an error message or perform any desired actions
      alert(
        "ERROR: Invalid Student Number Format. Please enter in the format: ____-_____"
      );
      return false; // Prevent form submission
    }
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
          clearSignUpFields();
        } else {
          alert(
            "ERROR: Failed to sign up. The account may already exist. You may also have entered invalid account details."
          );
          clearSignUpFields();
        }
      });
  }

  function logInStudent(e) {
    e.preventDefault();

    // form validation goes here

    fetch("http://localhost:3001/login-student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: document.getElementById("ls-email").value,
        password: document.getElementById("ls-password").value,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.success) {
          setIsLoggedIn("student");
          console.log("logged in");
          // successful log in. store the token as a cookie
          const cookies = new Cookies();
          cookies.set("authToken", body.token, {
            path: "localhost:3001/",
            age: 60 * 60,
            sameSite: false,
          });

          localStorage.setItem("username", body.username);
        } else {
          alert(
            "Failed to Log In. Admin must approve your account first or you may have entered the wrong credentials."
          );
          document.getElementById("ls-email").value = "";
          document.getElementById("ls-password").value = "";
        }
      });
  }

  function logInApprover(e) {
    e.preventDefault();

    // form validation goes here

    fetch("http://localhost:3001/login-approver", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: document.getElementById("la-email").value,
        password: document.getElementById("la-password").value,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.success) {
          setIsLoggedIn("adviser");
          // successful log in. store the token as a cookie
          const cookies = new Cookies();
          cookies.set("authToken", body.token, {
            path: "localhost:3001/",
            age: 60 * 60,
            sameSite: false,
          });

          localStorage.setItem("username", body.username);
        } else {
          alert(
            "Log In for Adviser Failed. You may have entered the wrong credentials."
          );
          document.getElementById("la-email").value = "";
          document.getElementById("la-password").value = "";
        }
      });
  }

  const logInAdmin = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/login-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: document.getElementById("lad-email").value,
        password: document.getElementById("lad-password").value,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.success) {
          setIsLoggedIn("admin");
          // successful log in. store the token as a cookie
          const cookies = new Cookies();
          cookies.set("authToken", body.token, {
            path: "localhost:3001/",
            age: 60 * 60,
            sameSite: false,
          });

          localStorage.setItem("username", body.username);
        } else {
          alert("Log In for Admin Failed.");
          document.getElementById("lad-email").value = "";
          document.getElementById("lad-password").value = "";
        }
      });
  };

  return (
    <>
      <div id="header-container">
        <div id="glass-background">
          <img
            id="image"
            src="https://i.pinimg.com/originals/38/4c/20/384c20132bda8dba92a55ddcebf29038.jpg"
            alt="home"
          ></img>
          <header id="header">Welcome To ClearMe</header>
        </div>
      </div>
      <br></br>

      <h1 id="sign-up-forstudents">Sign Up for Students</h1>

      <form id="sign-up">
        <input id="s-fname" placeholder="First Name" required />
        <input id="s-mname" placeholder="Middle Name" required />
        <input id="s-lname" placeholder="Last Name" required />
        <input
          id="s-sno"
          pattern="\d{4}-\d{5}"
          placeholder="Student Number"
          required
        />
        <input type="email" id="s-email" placeholder="UP Mail" required />
        <input
          id="s-password"
          type="password"
          placeholder="Password"
          required
        />
        <button onClick={signUp}>Sign Up</button>
      </form>
      <br />
      <h1>Log In for Students</h1>
      <form id="log-in-student">
        <input
          type="email"
          id="ls-email"
          placeholder="Student Email"
          required
        />
        <input
          id="ls-password"
          type="password"
          placeholder="Student Password"
          required
        />
        <button onClick={logInStudent}>Log In</button>
      </form>
      <br />
      <h1>Log In for Advisers</h1>
      <form id="log-in-approver">
        <input
          type="email"
          id="la-email"
          placeholder="Adviser Email"
          required
        />
        <input
          id="la-password"
          type="password"
          placeholder="Adviser Password"
          required
        />
        <button onClick={logInApprover}>Log In</button>
      </form>
      <br />
      <h1>Log In for Admin</h1>
      <form id="log-in-admin">
        <input id="lad-email" placeholder="Admin Email" />
        <input id="lad-password" type="password" placeholder="Admin Password" />
        <button onClick={logInAdmin}>Log In</button>
      </form>

      <p className="note">
        Note: Coordinate with the Admin to create an Adviser account.
      </p>
      <br />
      <br />
      <br />
      <footer>
        <p>
          Unlock the Path to Success with Effortless Efficiency: Experience
          Seamless Clearance Approval in the Institute of Computer Science.
        </p>
      </footer>
    </>
  );
}
