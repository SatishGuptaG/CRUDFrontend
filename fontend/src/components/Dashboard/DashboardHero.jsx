import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from '../Loader/LoadingSpinner';

const cardClasses = 'p-4 rounded-lg flex items-center justify-between transition-transform transform hover:scale-105 shadow-lg';
const textClasses = 'text-lg font-semibold text-white';
const imgClasses = 'w-12 h-12 object-cover rounded-full border-2 border-white shadow-lg';

// Tooltip descriptions for each status
const statusDescriptions = {
  Active: 'Indicates products that are live and available to customers.',
  Draft: 'Products in draft mode are still being prepared and are not yet visible to customers.',
  Pending: 'Products awaiting approval or additional setup before going live.',
  Archived: 'Products that are no longer active and have been stored for historical reference.'
};

const ProductCard = ({ status, total, imageUrl, altText, bgColor,showTooltips }) => {
  return (
    <div className={`${bgColor} ${cardClasses}`}>
      <div>
        <p className={textClasses}>{status}</p>
        <p className="text-sm text-white">Total: {total}</p>
      </div>
      <div className="relative group">
        <img
          src={imageUrl}
          alt={altText}
          className={imgClasses}
        />
        {showTooltips  && (
           <span className="absolute left-1/2 transform -translate-x-1/2 -top-8 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
           {statusDescriptions[status]}
         </span>
        )}
       
      </div>
    </div>
  );
};

const DashboardHero = () => {
  const [loading, setLoading] = useState(true);
  const [showTooltips, setShowTooltips] = useState(false);
  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto p-4">
      <h2 className="border p-4 border-zinc-300 rounded-lg shadow-lg text-2xl font-bold text-primary mb-6">
        Product Status
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard status="Active" total={150} imageUrl="https://openui.fly.dev/openui/200x200.svg?text=Active" altText="Active" bgColor="bg-green-500" showTooltips={showTooltips}/>
        <ProductCard status="Draft" total={50} imageUrl="https://openui.fly.dev/openui/200x200.svg?text=Draft" altText="Draft" bgColor="bg-yellow-500" showTooltips={showTooltips} />
        <ProductCard status="Pending" total={30} imageUrl="https://openui.fly.dev/openui/200x200.svg?text=Pending" altText="Pending" bgColor="bg-blue-500" showTooltips={showTooltips}/>
        <ProductCard status="Archived" total={20} imageUrl="https://openui.fly.dev/openui/200x200.svg?text=Archived" altText="Archived" bgColor="bg-red-500" showTooltips={showTooltips}/>
      </div>
    </div>
  );
};

export default DashboardHero;
