import "./App.css";
// import CommentSection from "./Components/CommentSection";
import LoginPage from "./Components/LoginPage";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { useState } from "react";
import Home from "./Components/Home";

export default function App() {

  const [userDetails, setUserDetails] = useState({userId:"", password:"", role:"", name: ""});

  const router = createBrowserRouter([
    {
      path: "/",
      element: userDetails.userId !== "" ? <Navigate to="/home"/> : <LoginPage setUserDetails={setUserDetails}/>,
    },
    {
      path: "/login",
      element: userDetails.userId !== "" ? <Navigate to="/home"/> : <LoginPage setUserDetails={setUserDetails}/>,
    },
    {
      path: "/home",
      element:  userDetails.userId !== "" ? <Home userDetails={userDetails}/> : <Navigate to="/login"/>,
    },
    ]);

  return <RouterProvider router={router} />;
}
