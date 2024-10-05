import React from 'react'
import DashboardHeader from '../../components/Dashboard/DashboardHeader'
import DashboardSideBar from '../../components/Dashboard/DashboardSideBar'
import Settings from '../../components/Setting/Settings'
const Setting = () => {
  return (
    <div>
       <DashboardHeader />
       <div className="flex items-start justify-between w-full">
              <div className="w-[80px] 800px:w-[330px]">
                <DashboardSideBar active={30} />
              </div>
              <Settings/>
            </div>
      </div>
  )
}

export default Setting
