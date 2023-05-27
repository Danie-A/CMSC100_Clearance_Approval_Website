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

// Send a POST request to API to check if the user is logged in. Redirect the user to /student if already logged in
const checkIfLoggedInOnHome = async () => {
  const res = await fetch("http://localhost:3001/checkifloggedin", {
    method: "POST",
    credentials: "include",
  });

  const payload = await res.json();

  if (payload.isLoggedIn) {
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
      { path: "/student/admin/view-pending-applications", element: <ViewPendingApplications />, loader: checkIfLoggedInOnDash },
      { path: "/student/admin/manage-approvers", element: <ManageApprovers />, loader: checkIfLoggedInOnDash },
    ],
  },


]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
