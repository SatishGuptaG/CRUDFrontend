import React, { useState } from 'react'
import CustomAttributeEdit from '../../components/CustomAttribute/CustomAttributeEdit'
import DashboardSideBar from '../../components/Dashboard/DashboardSideBar'
import DashboardHeader from '../../components/Dashboard/DashboardHeader'

const CustomAttributesEditPage = () => {
  const [darkMode, setDarkMode] = useState(false); // Define state for dark mode
  return (
    <div className={`${darkMode ? 'dark' : ''} flex h-screen`}>
    {/* Pass both darkMode and setDarkMode to DashboardHeader */}
    <DashboardHeader darkMode={darkMode} setDarkMode={setDarkMode} />

    {/* Fixed Sidebar */}
    <div className="fixed top-16 left-0">
      <DashboardSideBar active={5} darkMode={darkMode} />
    </div>

    {/* Main Section */}
    <div className="ml-[80px] lg:ml-[60px] mt-16 flex-1 p-6 bg-gray-100 dark:bg-gray-900 h-screen overflow-auto">
      <CustomAttributeEdit />
    </div>
  </div>
  )
}

export default CustomAttributesEditPage
