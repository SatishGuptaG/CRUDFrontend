// src/components/DashboardHero.jsx
import React, { useState } from 'react';
import { LoadingSpinner } from '../Loader/LoadingSpinner';

const DashboardHero = () => {
  const [loading, setLoading] = useState(true);
  if (loading) return <LoadingSpinner />; // Show loading spinner
  return (
    <div className="dashboard-hero">
      {/* Add content for the hero section here, like stats, charts, etc. */}
      <h2>Welcome to the Dashboard!</h2>
    </div>
  );
};

export default DashboardHero;
