import React from 'react';

const ProductIdentifier = ({ sku, stockCode, ean, upc, onInputChange }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SKU Field */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            SKU
          </label>
          <input
            type="text"
            value={sku || ""}
            onChange={(e) => onInputChange("sku", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter SKU"
          />
        </div>

        {/* Stock Code Field */}
        {/* <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Stock Code
          </label>
          <input
            type="text"
            value={stockCode || ""}
            onChange={(e) => onInputChange("stockCode", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Stock Code"
          />
        </div> */}

        {/* EAN Field */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            EAN
          </label>
          <input
            type="text"
            value={ean || ""}
            onChange={(e) => onInputChange("ean", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter EAN"
          />
        </div>

        {/* UPC Field */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            UPC
          </label>
          <input
            type="text"
            value={upc || ""}
            onChange={(e) => onInputChange("upc", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter UPC"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductIdentifier;
