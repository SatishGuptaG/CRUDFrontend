// src/pages/Dashboard/DashboardPage.jsx

import React from "react";
import DashboardHeader from '../../components/Dashboard/DashboardHeader'; // Adjust the path as needed
import DashboardSideBar from '../../components/Dashboard/DashboardSideBar'; // Make sure to create this component
import CategoryList from '../../components/Category/CategoryList';

const DashboardCategoriesPage = () => {
    return (
      <div>
       <DashboardHeader />
       <div className="flex items-start justify-between w-full">
              <div className="w-[80px] 800px:w-[330px]">
                <DashboardSideBar active={3} />
              </div>
              <CategoryList/>
            </div>
      </div>
    );
  };
  
  export default DashboardCategoriesPage;