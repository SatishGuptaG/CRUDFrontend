import React from 'react'
import CustomAttributeEdit from '../../components/CustomAttribute/CustomAttributeEdit'
import DashboardSideBar from '../../components/Dashboard/DashboardSideBar'
import DashboardHeader from '../../components/Dashboard/DashboardHeader'

const CustomAttributesEditPage = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex items-start justify-between w-full">
           <div className="w-[80px] 800px:w-[330px]">
             <DashboardSideBar active={5} />
           </div>
           <div className="w-full justify-center flex">
           <CustomAttributeEdit />
           </div>
         </div>
   </div>
  )
}

export default CustomAttributesEditPage
