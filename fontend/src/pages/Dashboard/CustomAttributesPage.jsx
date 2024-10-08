// src/pages/Dashboard/DashboardPage.jsx
import React from 'react';
import DashboardHeader from '../../components/Dashboard/DashboardHeader'; // Adjust the path as needed
import DashboardSideBar from '../../components/Dashboard/DashboardSideBar'; // Make sure to create this component
import CustomAttributeList from '../../components/CustomAttribute/CustomAttributeList';

const CustomAttributesPage = () => {
  return (
    <div className="flex h-screen">
    {/* Fixed Header */}
    <DashboardHeader />
    
    {/* Fixed Sidebar */}
    <div className="fixed top-16 left-0">
      <DashboardSideBar active={5} />
    </div>
    
    {/* Main Section */}
    <div className="ml-[80px] lg:ml-[60px] mt-16 flex-1 p-6 bg-gray-100 h-screen overflow-auto">
        <CustomAttributeList />
      </div>
  </div>
  );
};

export default CustomAttributesPage;
