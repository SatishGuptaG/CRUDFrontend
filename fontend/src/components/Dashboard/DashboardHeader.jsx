import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa'; // Moon and Sun icons

const DashboardHeader = ({ darkMode, setDarkMode }) => {
  const location = useLocation();

  const breadcrumbNameMap = {
    '/': 'Home',
    '/brands': 'Brands',
    '/brandDetail': 'Brand Detail',
    '/categories': 'Categories',
    '/categoryDetail': 'Category Detail',
    '/products': 'Products',
    '/productDetail': 'Product Detail',
    '/CustomAttributes': 'Custom Attributes',
    '/customAttributeDetail': 'Custom Attribute Detail',
    '/settings': 'Settings',
  };

  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white dark:bg-gray-800 shadow-md flex items-center justify-between px-6 z-50">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center">
        <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
          <li>
            <Link to="/">Home</Link>
          </li>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const breadcrumb = breadcrumbNameMap[to] || value;
            const isLast = index === pathnames.length - 1;

            return (
              <React.Fragment key={to}>
                <li>/</li>
                <li>
                  {!isLast ? (
                    <Link to={to}>{breadcrumb}</Link>
                  ) : (
                    <span>{breadcrumb}</span>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </nav>

      {/* Dark Mode Toggle Button */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-800 dark:text-gray-200 font-medium">example.com</span>
        <select className="border rounded px-2 py-1 text-gray-600 dark:bg-gray-700 dark:text-white">
          <option>EN</option>
          <option>FR</option>
        </select>

        {/* Dark Mode Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="focus:outline-none text-xl"
        >
          {darkMode ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-gray-600" />
          )}
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
