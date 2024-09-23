import React from 'react'
import DashboardHeader from '../../components/Dashboard/DashboardHeader'
import DashboardSideBar from '../../components/Dashboard/DashboardSideBar'
import ProductList from '../../components/Product/ProductList'

const ProductPage = () => {
  return (
    <div>
       <DashboardHeader />
       <div className="flex items-start justify-between w-full">
              <div className="w-[80px] 800px:w-[330px]">
                <DashboardSideBar active={4} />
              </div>
              <ProductList/>
            </div>
      </div>
  )
}

export default ProductPage
