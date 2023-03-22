import React from "react";
import HomePage from "./components/HomePage/HomePage";
import { Routes as BaseRoutes, Route, Navigate } from "react-router-dom";
import GoPage from "./components/GoPage/GoPage";

const Routes = () => {
    return (
      <BaseRoutes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/go" element={<GoPage/>} />
      </BaseRoutes>
    );
  };
  
  export default Routes;