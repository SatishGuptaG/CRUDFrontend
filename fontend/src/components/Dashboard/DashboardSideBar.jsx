import React from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { BiCategoryAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const DashboardSideBar = ({ active }) => {
  return (
    <div className="fixed top-16 left-0 h-full w-[80px] lg:w-[80px] group hover:w-[250px] transition-all duration-300 bg-white shadow-md ">
      <div className="w-full flex flex-col items-center py-6">
        {/* Dashboard */}
        <div className="w-full flex items-center p-4 hover:bg-gray-100 transition">
          <Link to="/" className="flex items-center group">
            <RxDashboard size={30} />
            <span
              className={`ml-4 text-[16px] font-medium text-gray-800 hidden group-hover:inline-block ${
                active === 0 ? "text-[crimson]" : "text-[#555]"
              }`}
            >
              Dashboard
            </span>
          </Link>
        </div>

        {/* Brands */}
        <div className="w-full flex items-center p-4 hover:bg-gray-100 transition">
          <Link to="/brands" className="flex items-center group">
            <FiShoppingBag
              size={30}
              color={`${active === 1 ? "crimson" : "#555"}`}
            />
            <span
              className={`ml-4 text-[16px] font-medium hidden group-hover:inline-block ${
                active === 1 ? "text-[crimson]" : "text-[#555]"
              }`}
            >
              Brands
            </span>
          </Link>
        </div>

        {/* Category */}
        <div className="w-full flex items-center p-4 hover:bg-gray-100 transition">
          <Link to="/categories" className="flex items-center group">
            <BiCategoryAlt
              size={30}
              color={`${active === 3 ? "crimson" : "#555"}`}
            />
            <span
              className={`ml-4 text-[16px] font-medium hidden group-hover:inline-block ${
                active === 3 ? "text-[crimson]" : "text-[#555]"
              }`}
            >
              Category
            </span>
          </Link>
        </div>

        {/* Products */}
        <div className="w-full flex items-center p-4 hover:bg-gray-100 transition">
          <Link to="/products" className="flex items-center group">
            <AiOutlineProduct
              size={30}
              color={`${active === 4 ? "crimson" : "#555"}`}
            />
            <span
              className={`ml-4 text-[16px] font-medium hidden group-hover:inline-block ${
                active === 4 ? "text-[crimson]" : "text-[#555]"
              }`}
            >
              Products
            </span>
          </Link>
        </div>

        {/* CustomAttribute */}
        <div className="w-full flex items-center p-4 hover:bg-gray-100 transition">
          <Link to="/CustomAttributes" className="flex items-center group">
            <AiOutlineProduct
              size={30}
              color={`${active === 5 ? "crimson" : "#555"}`}
            />
            <span
              className={`ml-4 text-[16px] font-medium hidden group-hover:inline-block ${
                active === 5 ? "text-[crimson]" : "text-[#555]"
              }`}
            >
              CustomAttribute
            </span>
          </Link>
        </div>

        {/* Settings */}
        <div className="w-full flex items-center p-4 hover:bg-gray-100 transition">
          <Link to="/settings" className="flex items-center group">
            <CiSettings
              size={30}
              color={`${active === 11 ? "crimson" : "#555"}`}
            />
            <span
              className={`ml-4 text-[16px] font-medium hidden group-hover:inline-block ${
                active === 11 ? "text-[crimson]" : "text-[#555]"
              }`}
            >
              Settings
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardSideBar;
