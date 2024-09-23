import React from 'react'
import DashboardSideBar from '../../components/Dashboard/DashboardSideBar'
import DashboardHeader from '../../components/Dashboard/DashboardHeader'
import CategoryEdit from '../../components/Category/CategoryEdit'

const DashboardCategoryEditPage = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex items-start justify-between w-full">
           <div className="w-[80px] 800px:w-[330px]">
             <DashboardSideBar active={3} />
           </div>
           <div className="w-full justify-center flex">
           <CategoryEdit/>
           </div>

       
         </div>
   </div>
  )
}

export default DashboardCategoryEditPage
