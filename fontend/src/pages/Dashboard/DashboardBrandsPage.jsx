// src/pages/Dashboard/DashboardPage.jsx
import React, { useState } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader"; // Adjust the path as needed
import DashboardSideBar from "../../components/Dashboard/DashboardSideBar"; // Make sure to create this component
import BrandList from "../../components/Brand/BrandList";

const DashboardBrandsPage = () => {
  const [darkMode, setDarkMode] = useState(false); // Define state for dark mode
  return (
    <div className={`${darkMode ? 'dark' : ''} flex h-screen`}>
      {/* Pass both darkMode and setDarkMode to DashboardHeader */}
      <DashboardHeader darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Fixed Sidebar */}
      <div className="fixed top-16 left-0">
        <DashboardSideBar active={1} darkMode={darkMode} />
      </div>
      {/* Main Section */}
      <div className="ml-[80px] lg:ml-[60px] mt-16 flex-1 p-6 bg-gray-100 dark:bg-gray-900 h-screen overflow-auto">
        <BrandList/>
      </div>
    </div>
  );
};

export default DashboardBrandsPage;
