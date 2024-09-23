import React from 'react'
import DashboardHeader from '../../components/Dashboard/DashboardHeader'
import DashboardSideBar from '../../components/Dashboard/DashboardSideBar'
import ProductEdit from '../../components/Product/ProductEdit'

const ProductEditPage = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex items-start justify-between w-full">
           <div className="w-[80px] 800px:w-[330px]">
             <DashboardSideBar active={4} />
           </div>
           <div className="w-full justify-center flex">
          <ProductEdit/>
           </div>
         </div>
   </div>
  )
}

export default ProductEditPage
