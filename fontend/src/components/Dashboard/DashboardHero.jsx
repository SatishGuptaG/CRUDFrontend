import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from '../Loader/LoadingSpinner';

const DashboardHero = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-20 bg-white dark:bg-gray-800 shadow-md rounded-md">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
        Welcome to the Dashboard!
      </h2>
      {/* Add more hero section content like charts, stats, etc. */}
    </div>
  );
};

export default DashboardHero;
