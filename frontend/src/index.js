import React from 'react';
import ReactDOM from 'react-dom/client';
import { redirect } from 'react-router-dom';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';

const checkIfLoggedIn = async ({ request }) => {
  const res = await fetch("http://localhost:3001/checkifloggedin",
    {
      method: "POST",
      credentials: "include" 
    });

    console.log(res)
  
    if (res.isLoggedIn) {
      console.log("is logged in")

      // @TODO: Failing at CORS here
      return redirect("/dashboard")
    } else {
      console.log("not logged in")
      return 0
    }
}

const router = createBrowserRouter([
  { path: '/', element: <Home />, loader: checkIfLoggedIn },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/admin', element: <AdminDashboard /> }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
