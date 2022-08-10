import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import WebForm from "./pages/WebForm";
import UserStoryInput from "./pages/UserStoryInput";
import WebFormDetails from "./pages/WebFormDetails";
import Loader from "./pages/Loader";
import ProgressBar from "./pages/ProgressBar";
import UpdateExisting from "./pages/UpdateExisting";
import UpdateLoader from "./pages/UpdateLoader";
import UpdateWebForm from "./pages/UpdateWebForm";





const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/userstory" element={<UserStoryInput />} />
        <Route exact path="/updateexisting" element={<UpdateExisting />} />
        <Route exact path="/webform" element={<WebForm />} />
        <Route exact path="/updateform/:id" element={<UpdateWebForm />} />

        <Route exact path="/spinner" element={<Loader />} />
        <Route exact path="/spinnerupdate" element={<UpdateLoader />} />
        <Route exact path="/progress" element={<ProgressBar />} />


        <Route exact path="/webformdetails" element={<WebFormDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
