import React from 'react'
import DashboardHeader from '../../components/Dashboard/DashboardHeader'
import DashboardSideBar from '../../components/Dashboard/DashboardSideBar'
import AssetManager from '../../components/AssetManager/AssetManager'

const AssetManagerPage = () => {
  return (
    <div className="flex h-screen">
    {/* Fixed Header */}
    <DashboardHeader />
    
    {/* Fixed Sidebar */}
    <div className="fixed top-16 left-0">
      <DashboardSideBar active={6} />
    </div>
    
    {/* Main Section */}
    <div className="ml-[80px] lg:ml-[60px] mt-16 flex-1 p-6 bg-gray-100 h-screen ">
        {/* <Settings /> */}
       <AssetManager/>
      </div>
  </div>
  )
}

export default AssetManagerPage