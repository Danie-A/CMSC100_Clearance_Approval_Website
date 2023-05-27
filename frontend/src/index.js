import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { redirect } from "react-router-dom";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Root from './pages/Root';
import Applications from './pages/Student/applications/Applications';
import Notifications from './pages/Student/notifications/Notifications';
import CreateApplication from './pages/Student/CreateApplication';
import ViewPendingApplications from './pages/Admin/ViewPendingApplications';
import ManageApprovers from './pages/Admin/ManageApprovers';


var userType = "admin";
localStorage.setItem("userType", userType);

// Send a POST request to API to check if the user is logged in. Redirect the user to /student if already logged in
const checkIfLoggedInOnHome = async () => {
  const res = await fetch("http://localhost:3001/checkifloggedin", {
    method: "POST",
    credentials: "include",
  });

  const payload = await res.json();

  if (payload.isLoggedIn) {
    localStorage.setItem("userType", "student");
    return redirect("/student")

  } else {
    return 0;
  }
};

// Send a POST request to API to check if the user is logged in. Redirect the user back to / if not logged in
const checkIfLoggedInOnDash = async () => {
  const res = await fetch("http://localhost:3001/checkifloggedin", {
    method: "POST",
    credentials: "include",
  });

  const payload = await res.json();
  if (payload.isLoggedIn) {
    return true;
  } else {
    return redirect("/");
  }
}

const checkIfLoggedInOnDashApprover = async () => {
  const res = await fetch("http://localhost:3001/checkifloggedinapprover", {
    method: "POST",
    credentials: "include",
  });

  const payload = await res.json();
  if (payload.isLoggedIn) {
    localStorage.setItem("userType", "approver");
    return true;
  } else {
    return redirect("/");
  }
}

const runAdmin = () => {
  if (userType === "admin") {
    return true;
  } else {
    return redirect("/");
  }
}

const router = createBrowserRouter([
  { path: "/", element: <Home />, loader: checkIfLoggedInOnHome },
  {
    path: "/student",
    element: <Root />,
    loader: checkIfLoggedInOnDash,
    children: [
      { path: "/student", element: <Dashboard />, loader: checkIfLoggedInOnDash },
      { path: "/student/applications", element: <Applications />, loader: checkIfLoggedInOnDash },
      { path: "/student/notifications", element: <Notifications />, loader: checkIfLoggedInOnDash },
      { path: "/student/create-application", element: <CreateApplication />, loader: checkIfLoggedInOnDash },
    ],
  },
  // {
  //   path: "/approver",
  //   element: <Root />,
  //   loader: checkIfLoggedInOnDashApprover,
  //   children: [
  //     { path: "/approver", element: <Dashboard />, loader: checkIfLoggedInOnDash },
  //     // { path: "/student/applications", element: <Applications />, loader: checkIfLoggedInOnDash },
  //     // { path: "/student/notifications", element: <Notifications />, loader: checkIfLoggedInOnDash },
  //     // { path: "/student/create-application", element: <CreateApplication />, loader: checkIfLoggedInOnDash },
  //   ],
  // },
  // {
  //   path: "/admin",
  //   element: <Root />,
  //   loader: runAdmin,
  //   children: [
  //     { path: "/admin", element: <ViewPendingApplications /> },
  //     { path: "/admin/manage-approvers", element: <ManageApprovers /> },
  //   ],
  // },


]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
