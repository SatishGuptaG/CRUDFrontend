import React, { useState } from 'react'
import { LoadingSpinner } from '../Loader/LoadingSpinner';

 const Settings = () => {
    const [loading, setLoading] = useState(true);
   // if (loading) return <LoadingSpinner />; // Show loading spinner
  return (
    <div className="p-20 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold">Welcome to the Setting!</h2>
      {/* Add more hero section content like charts, stats, etc. */}
    </div>
   
  )
}
export default Settings;