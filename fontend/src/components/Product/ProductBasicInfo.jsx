import React from "react";

const ProductBasicInfo = ({
  basicInfo,
  categories,
  brands,
  stockCode,
  selectedCategoryId,
  selectedBrandId,
  onInputChange,
}) => {
  return (
    <div className="space-y-6">
      {/* Name Input */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            value={basicInfo.name || ""}
            onChange={(e) => onInputChange("basicInfo.name", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter product name"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Stock Code
          </label>
          <input
            type="text"
            value={stockCode || ""}
            onChange={(e) => onInputChange("identifier.stockCode", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            disabled
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Price
          </label>
          <input
            type="text"
            value={basicInfo.price || ""}
            onChange={(e) => onInputChange("basicInfo.price", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter product price..."
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={basicInfo.categoryId || ""}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => selectedCategoryId(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Brands <span className="text-red-500">*</span>
          </label>
          <select
            value={basicInfo.brandId || ""}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => selectedBrandId(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Brands
            </option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductBasicInfo;
