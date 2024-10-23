import React from 'react';
import AssetManager from './AssetManager'; // Ensure this path is correct

const AssetManagerModal = ({ onClose , onFileSelect}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-screen-1000px h-[500px]   overflow-auto">
        {/* Call the Asset Manager Component */}
        <AssetManager  onFileSelect={onFileSelect}/>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white p-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AssetManagerModal;
