import React, { useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineEditAttributes } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"; // Add arrow icons

const DashboardSideBar = ({ active, darkMode }) => {
  const [hovered, setHovered] = useState(null); // State to track hovered icon
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`fixed top-16 left-0 h-full ${
        isExpanded ? "w-[250px]" : "w-[80px]"
      } transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}
    >
      <div className="w-full flex flex-col items-center py-6">
        {/* Dashboard 0 */}
        <div
          className={`w-full flex items-center p-4 hover:bg-gray-100 transition relative ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          onMouseEnter={() => setHovered("dashboard")}
          onMouseLeave={() => setHovered(null)}
        >
          <Link to="/" className="flex items-center">
            <RxDashboard
              size={30}
              color={`${active === 0 ? "crimson" : darkMode ? "#fff" : "#555"}`}
            />
            {isExpanded && (
              <span
                className={`ml-4 text-[16px] font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'} ${
                  active === 0 ? "text-[crimson]" : darkMode ? 'text-gray-400' : 'text-[#555]'
                }`}
              >
                Dashboard
              </span>
            )}
          </Link>
          {/* Show name on hover */}
          {!isExpanded && hovered === "dashboard" && (
            <div className="absolute left-[80px] w-[100px] bg-white shadow-lg p-2 rounded-md">
              <h4 className="font-bold">Dashboard</h4>
            </div>
          )}
        </div>

        {/* Brands 1 */}
        <div
          className={`w-full flex items-center p-4 hover:bg-gray-100 transition relative ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          onMouseEnter={() => setHovered("brands")}
          onMouseLeave={() => setHovered(null)}
        >
          <Link to="/brands" className="flex items-center">
            <FiShoppingBag
              size={30}
              color={`${active === 1 ? "crimson" : darkMode ? "#fff" : "#555"}`}
            />
            {isExpanded && (
              <span
                className={`ml-4 text-[16px] font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'} ${
                  active === 1 ? "text-[crimson]" : darkMode ? 'text-gray-400' : 'text-[#555]'
                }`}
              >
                Brands
              </span>
            )}
          </Link>
          {/* Show name on hover */}
          {!isExpanded && hovered === "brands" && (
            <div className="absolute left-[80px] w-[100px] bg-white shadow-lg p-2 rounded-md">
              <h4 className="font-bold">Brands</h4>
            </div>
          )}
        </div>

        {/* Category 3 */}
        <div
          className={`w-full flex items-center p-4 hover:bg-gray-100 transition relative ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          onMouseEnter={() => setHovered("category")}
          onMouseLeave={() => setHovered(null)}
        >
          <Link to="/categories" className="flex items-center">
            <BiCategoryAlt
              size={30}
              color={`${active === 3 ? "crimson" : darkMode ? "#fff" : "#555"}`}
            />
            {isExpanded && (
              <span
                className={`ml-4 text-[16px] font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'} ${
                  active === 3 ? "text-[crimson]" : darkMode ? 'text-gray-400' : 'text-[#555]'
                }`}
              >
                Category
              </span>
            )}
          </Link>
          {/* Show name on hover 4 */}
          {!isExpanded && hovered === "category" && (
            <div className="absolute left-[80px] w-[100px] bg-white shadow-lg p-2 rounded-md">
              <h4 className="font-bold">Category</h4>
            </div>
          )}
        </div>

        {/* Products */}
        <div
          className={`w-full flex items-center p-4 hover:bg-gray-100 transition relative ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          onMouseEnter={() => setHovered("products")}
          onMouseLeave={() => setHovered(null)}
        >
          <Link to="/products" className="flex items-center">
            <AiOutlineProduct
              size={30}
              color={`${active === 4 ? "crimson" : darkMode ? "#fff" : "#555"}`}
            />
            {isExpanded && (
              <span
                className={`ml-4 text-[16px] font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'} ${
                  active === 4 ? "text-[crimson]" : darkMode ? 'text-gray-400' : 'text-[#555]'
                }`}
              >
                Products
              </span>
            )}
          </Link>
          {/* Show name on hover */}
          {!isExpanded && hovered === "products" && (
            <div className="absolute left-[80px] w-[100px] bg-white shadow-lg p-2 rounded-md">
              <h4 className="font-bold">Products</h4>
            </div>
          )}
        </div>

        {/* CustomAttribute 5 */}
        <div
          className={`w-full flex items-center p-4 hover:bg-gray-100 transition relative ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          onMouseEnter={() => setHovered("customAttribute")}
          onMouseLeave={() => setHovered(null)}
        >
          <Link to="/CustomAttributes" className="flex items-center">
            <MdOutlineEditAttributes
              size={30}
              color={`${active === 5 ? "crimson" : darkMode ? "#fff" : "#555"}`}
            />
            {isExpanded && (
              <span
                className={`ml-4 text-[16px] font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'} ${
                  active === 5 ? "text-[crimson]" : darkMode ? 'text-gray-400' : 'text-[#555]'
                }`}
              >
                CustomAttribute
              </span>
            )}
          </Link>
          {/* Show name on hover */}
          {!isExpanded && hovered === "customAttribute" && (
            <div className="absolute left-[80px] w-[100px] bg-white shadow-lg p-2 rounded-md">
              <h4 className="font-bold">Custom Attribute</h4>
            </div>
          )}
        </div>

        {/* Settings 30 */}
        <div
          className={`w-full flex items-center p-4 hover:bg-gray-100 transition relative ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          onMouseEnter={() => setHovered("settings")}
          onMouseLeave={() => setHovered(null)}
        >
          <Link to="/settings" className="flex items-center">
            <CiSettings
              size={30}
              color={`${active === 11 ? "crimson" : darkMode ? "#fff" : "#555"}`}
            />
            {isExpanded && (
              <span
                className={`ml-4 text-[16px] font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'} ${
                  active === 11 ? "text-[crimson]" : darkMode ? 'text-gray-400' : 'text-[#555]'
                }`}
              >
                Settings
              </span>
            )}
          </Link>
          {/* Show name on hover */}
          {!isExpanded && hovered === "settings" && (
            <div className="absolute left-[80px] w-[100px] bg-white shadow-lg p-2 rounded-md">
              <h4 className="font-bold">Settings</h4>
            </div>
          )}
        </div>
         {/* BrandPage 12 */}
         <div
          className={`w-full flex items-center p-4 hover:bg-gray-100 transition relative ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          onMouseEnter={() => setHovered("settings")}
          onMouseLeave={() => setHovered(null)}
        >
          <Link to="/BrandPage" className="flex items-center">
            <CiSettings
              size={30}
              color={`${active === 12 ? "crimson" : darkMode ? "#fff" : "#555"}`}
            />
            {isExpanded && (
              <span
                className={`ml-4 text-[16px] font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'} ${
                  active === 12 ? "text-[crimson]" : darkMode ? 'text-gray-400' : 'text-[#555]'
                }`}
              >
                BrandPAge
              </span>
            )}
          </Link>
          {/* Show name on hover */}
          {!isExpanded && hovered === "BrandPage" && (
            <div className="absolute left-[80px] w-[100px] bg-white shadow-lg p-2 rounded-md">
              <h4 className="font-bold">BrandPAge</h4>
            </div>
          )}
        </div>
      </div>

      

      {/* Arrow Button for Toggling Sidebar */}
      <div className="w-full flex justify-center py-6">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-gray-200 rounded-full focus:outline-none dark:bg-gray-600"
        >
          {isExpanded ? <FaArrowLeft size={20} /> : <FaArrowRight size={20} />}
        </button>
      </div>
    </div>
  );
};

export default DashboardSideBar;
