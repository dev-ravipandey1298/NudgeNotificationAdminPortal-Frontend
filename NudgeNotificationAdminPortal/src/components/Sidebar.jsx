// src/components/Sidebar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Home");

    const handleTabClick = (tabName) => {
        navigate("/maker/create/nudge-template-form/templateId/NA")
        setActiveTab(tabName); 
    }

  return (
    <div className="min-h-screen flex flex-col bg-blue-900 text-white w-64">
      <div className="flex items-center justify-center h-16 border-b border-blue-700">
        <h1 className="text-2xl font-semibold">Menu</h1>
      </div>
      <nav className="flex-1 p-4 space-y-4">
        {/* Home */}
        <div onClick={() => handleTabClick("Home")}
            className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md transition-all duration-300 ${
              activeTab === "Home"
                ? "bg-blue-700 font-bold"
                : "hover:bg-blue-700"
            }`}
          >
          <span className="text-lg">Home</span>
        </div>
        {/* Create Nudge Template */}
        <div 
        onClick={() => handleTabClick("Create Nudge Template")} 
        className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md transition-all duration-300 ${
              activeTab === "Create Nudge Template"
                ? "bg-blue-700 font-bold"
                : "hover:bg-blue-700"
            }`}>
          <span className="text-lg">Create Nudge Template</span>
        </div>
        {/* Drafts */}
        <div 
        onClick={() => handleTabClick("Drafts")}
        className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md transition-all duration-300 ${
              activeTab === "Drafts" ? "bg-blue-700 font-bold" : "hover:bg-blue-700"
            }`}>
          <span className="text-lg">Drafts</span>
        </div>
        {/* Action Templates */}
        <div 
        onClick={() => handleTabClick("Action Templates")}
        className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md transition-all duration-300 ${
              activeTab === "Action Templates"
                ? "bg-blue-700 font-bold"
                : "hover:bg-blue-700"
            }`}>
          <span className="text-lg">Action Templates</span>
        </div>
        {/* Search All Requests */}
        <div 
        onClick={() => handleTabClick("Search All Requests")}
        className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md transition-all duration-300 ${
              activeTab === "Search All Requests"
                ? "bg-blue-700 font-bold"
                : "hover:bg-blue-700"
            }`}>
          <span className="text-lg">Search All Requests</span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
