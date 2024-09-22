// src/pages/Dashboard/DashboardPage.jsx
import React from 'react';
import DashboardHeader from '../../components/Dashboard/DashboardHeader'; // Adjust the path as needed
import DashboardSideBar from '../../components/Dashboard/DashboardSideBar'; // Make sure to create this component
import DashboardHero from '../../components/Dashboard/DashboardHero'; // Make sure to create this component

const DashboardPage = () => {
  return (
    <div>
     <DashboardHeader />
     <div className="flex items-start justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={0} />
            </div>
            <DashboardHero />
          </div>
    </div>
  );
};

export default DashboardPage;
