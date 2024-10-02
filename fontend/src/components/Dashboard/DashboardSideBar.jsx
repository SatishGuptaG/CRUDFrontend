import React from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
const DashboardSideBar = ({ active }) => {
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item 1 to 12 ,13,14,*/}
      <div className="w-full flex items-center p-4">
        <Link to="/" className="w-full flex items-center">
          <RxDashboard size={30} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 0 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/brands" className="w-full flex items-center">
          <FiShoppingBag
            size={30}
            color={`${active === 1 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Brands
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/categories" className="w-full flex items-center">
          <BiCategoryAlt
            size={30}
            color={`${active === 3 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Category
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/Products" className="w-full flex items-center">
          <AiOutlineProduct
            size={30}
            color={`${active === 4 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Product
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/CustomAttributes" className="w-full flex items-center">
          <MdOutlineSpaceDashboard
            size={30}
            color={`${active === 5 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            CustomAttribute
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/settings" className="w-full flex items-center">
          <CiSettings
            size={30}
            color={`${active === 11 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 11 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSideBar;
