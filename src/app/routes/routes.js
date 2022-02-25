import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../pages/Login";
import Dashboard from "../../pages/Dashboard";
import Statistics from "../../pages/Statistics";

export default function Routing() {
  //Declaring routes for all apps
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/stats" element={<Statistics />} />
    </Routes>
  );
}
