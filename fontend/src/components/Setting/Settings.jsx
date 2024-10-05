import React, { useState } from 'react'
import { LoadingSpinner } from '../Loader/LoadingSpinner';

 const Settings = () => {
    const [loading, setLoading] = useState(true);
    if (loading) return <LoadingSpinner />; // Show loading spinner
  return (
    <div>settings</div>
   
  )
}
export default Settings;