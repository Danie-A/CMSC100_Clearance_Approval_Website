import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from "./pages/Root";
import Applications from "./pages/Applications";
import Notifications from "./pages/Notifications";
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: "/", element: <Root />, children: [
      { path: "/", element: <Home /> },
      { path: "applications", element: <Applications /> },
      { path: "notifications", element: <Notifications /> },
    ]
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

