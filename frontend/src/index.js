import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { redirect } from "react-router-dom";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Root from "./pages/Root";
import Applications from "./pages/Student/applications/Applications";
import Notifications from "./pages/Student/notifications/Notifications";
import CreateApplication from "./pages/Student/viewApplication/CreateApplication";
import ViewPendingApplications from "./pages/Admin/ViewPendingApplications";
import ViewApplication from "./pages/Student/viewApplication/ViewApplication";
import ManageApprovers from "./pages/Admin/ManageApprovers";
import AdminHome from "./pages/Admin/AdminHome";
import AdviserViewPendingApplications from "./pages/Adviser/AdviserViewPendingApplications";
import GeneratePDF from "./pages/Student/pdf/GeneratePDF";
import AdviserHome from "./pages/Adviser/AdviserHome";
import AdviserSearch from "./pages/Adviser/AdviserSearch";
import ManagePendingApplications from "./pages/Admin/ManagePendingApplications";
import ViewAllApplications from "./pages/Admin/ViewAllApplications";

// var userType = "student";
// localStorage.setItem("userType", userType);

// Send a POST request to API to check if the user is logged in. Redirect the user to /student if already logged in
const checkIfLoggedIn = route =>
  fetch("http://localhost:3001/checkifloggedin", {
    method: "POST",
    credentials: "include",
  })
    .then(res => res.json())
    .then(payload => {
      if (payload.isLoggedIn === "student" && route !== "student") {
        localStorage.setItem("userType", "student");
        return redirect("/student");
      } else if (payload.isLoggedIn === "adviser" && route !== "adviser") {
        localStorage.setItem("userType", "adviser");
        return redirect("/adviser");
      } else if (payload.isLoggedIn === "admin" && route !== "admin") {
        localStorage.setItem("userType", "admin");
        return redirect("/admin");
      } else {
        return 0;
      }
    });

// // Send a POST request to API to check if the user is logged in. Redirect the user back to / if not logged in

// const checkIfLoggedInOnDashApprover = async () => {
//   const res = await fetch("http://localhost:3001/checkifloggedinapprover", {
//     method: "POST",
//     credentials: "include",
//   });

//   const payload = await res.json();
//   if (payload.isLoggedIn) {
//     localStorage.setItem("userType", "approver");
//     return true;
//   } else {
//     return redirect("/");
//   }
// };

// const runAdmin = () => {
//   if (userType === "admin") {
//     return true;
//   } else {
//     return redirect("/");
//   }
// };

const router = createBrowserRouter([
  { path: "/", element: <Home />, loader: () => checkIfLoggedIn("/") },
  {
    path: "/student",
    element: <Root />,
    loader: () => checkIfLoggedIn("student"),
    children: [
      { path: "/student", element: <Dashboard /> },
      { path: "/student/applications", element: <Applications /> },
      { path: "/student/notifications", element: <Notifications /> },
      { path: "/student/create-application", element: <CreateApplication /> },
      { path: "/student/view-application", element: <ViewApplication /> },
      { path: "/student/generate-pdf", element: <GeneratePDF /> },
    ],
  },
  {
    path: "/adviser",
    element: <Root />,
    loader: () => checkIfLoggedIn("adviser"),
    children: [
      { path: "/adviser", element: <AdviserHome /> },
      { path: "/adviser/view-pending-applications", element: <AdviserViewPendingApplications /> },
      { path: "/adviser/search-students", element: <AdviserSearch /> },
    ],
  },
  {
    path: "/admin",
    element: <Root />,
    loader: () => checkIfLoggedIn("admin"),
    children: [
      { path: "/admin", element: <AdminHome /> },
      { path: "/admin/view-pending-accounts", element: <ViewPendingApplications /> },
      { path: "/admin/manage-pending-applications", element: <ManagePendingApplications /> },
      { path: "/admin/view-applications-details", element: <ViewAllApplications /> },
      { path: "/admin/manage-advisers", element: <ManageApprovers /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
