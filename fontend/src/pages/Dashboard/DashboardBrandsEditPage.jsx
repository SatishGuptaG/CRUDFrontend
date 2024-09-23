import React from 'react'
import BrandEdit from '../../components/Brand/BrandEdit'
import DashboardSideBar from '../../components/Dashboard/DashboardSideBar'
import DashboardHeader from '../../components/Dashboard/DashboardHeader'

const DashboardBrandsEditPage = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex items-start justify-between w-full">
           <div className="w-[80px] 800px:w-[330px]">
             <DashboardSideBar active={1} />
           </div>
           <div className="w-full justify-center flex">
           <BrandEdit />
           </div>
         </div>
   </div>
  )
}

export default DashboardBrandsEditPage
