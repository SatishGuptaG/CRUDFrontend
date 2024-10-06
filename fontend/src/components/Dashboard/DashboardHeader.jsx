import React from 'react';

const DashboardHeader = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex items-center justify-between px-6 z-50">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li><a href="/">Home</a></li>
          <li>/</li>
          <li>Dashboard</li>
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
