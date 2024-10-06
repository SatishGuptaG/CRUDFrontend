import React from 'react';
import DashboardHeader from '../../components/Dashboard/DashboardHeader';
import DashboardSideBar from '../../components/Dashboard/DashboardSideBar';
import DashboardHero from '../../components/Dashboard/DashboardHero';

const DashboardPage = () => {
  return (
    <div className="flex h-screen">
      {/* Fixed Header */}
      <DashboardHeader />
      
      {/* Fixed Sidebar */}
      <div className="fixed top-16 left-0">
        <DashboardSideBar active={0} />
      </div>
      
      {/* Main Section */}
      <div className="ml-[80px] lg:ml-[60px] mt-16 flex-1 p-6 bg-gray-100 h-screen overflow-auto">
          <DashboardHero />
        </div>
    </div>
  );
};

export default DashboardPage;
