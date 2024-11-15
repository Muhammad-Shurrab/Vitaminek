import React from "react";
import AdminDashboard from "./AdminDashboard";

const DashboardLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <AdminDashboard />
      <div className="flex-grow-1 p-4">
        {children}{" "}
        {/* This will render any child components passed to the layout */}
      </div>
    </div>
  );
};

export default DashboardLayout;
