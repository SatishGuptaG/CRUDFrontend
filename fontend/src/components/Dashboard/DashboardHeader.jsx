import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DashboardHeader = () => {
  const location = useLocation();

  // This function maps routes to meaningful breadcrumb names
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

  // Split the pathname into an array for breadcrumbs
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex items-center justify-between px-6 z-50">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link to="/">Home</Link>
          </li>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const breadcrumb = breadcrumbNameMap[to] || value; // Map route to name or default to value
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

      {/* Domain Name and Dropdown */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-800 font-medium">example.com</span>
        <select className="border rounded px-2 py-1 text-gray-600">
          <option>EN</option>
          <option>FR</option>
        </select>
      </div>
    </header>
  );
};

export default DashboardHeader;
