import React from "react";

const CategoryBasicInfo = ({
  name,
  code,
  logo,
  onInputChange,
  onLogoChange,
}) => {
  return (
    <div className="space-y-6">
      {/* Name Input */}
      <div className="grid grid-cols-3 gap-x-6">
        <div className="col-span-1">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => onInputChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter brand name"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => onInputChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            disabled
          />
        </div>
      </div>

      {/* Logo Upload */}
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Logo
        </label>
        <input
          type="file"
          onChange={(e) => onLogoChange(e.target.files[0])}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
        />
        {logo && (
          <div className="mt-4">
            {/* Display the logo preview */}
            <img
              src={logo} // Directly use the 'logo' prop which now contains the preview URL or base64 string
              alt="Logo Preview"
              className="h-16 w-16 object-cover rounded-full shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryBasicInfo;
