import React from "react";
import { Outlet } from "react-router-dom";
import FilterSection from "../components/FilterSection";

const DashboardLayout: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-[#F4F5F6] flex p-2 rounded-2xl py-10">
      {/* Shared Left Panel */}
      <FilterSection />

      {/* Main Content changes by route */}
      <div className="flex-1 bg-white border border-gray-200 ml-6 rounded-2xl p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
