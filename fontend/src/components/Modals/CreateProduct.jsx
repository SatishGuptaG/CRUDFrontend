import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateProduct = ({ closeModal, refreshProducts }) => {
  const [name, setName] = useState("");
  const [stockCode, setStockCode] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [gender, setGender] = useState(""); // New Gender state

  // Demo data for Brand and Category
  const brands = [
    { id: "40d2b9ad-7b79-ef11-b6ab-8c16f6f17cd6", name: "Nikee" },
    { id: "cebf2979-da78-ef11-b6ab-8c16f6f17cd6", name: "A1" },
  ];

  const categories = [
    { id: "3253ad5b-b178-ef11-b6ab-8c16f6f17cd6", name: "Circuit" },
    { id: "d99a5b4e-b178-ef11-b6ab-8c16f6f17cd6", name: "Monitor" },
    { id: "d89a5b4e-b178-ef11-b6ab-8c16f6f17cd6", name: "Driver" },
    { id: "d79a5b4e-b178-ef11-b6ab-8c16f6f17cd6", name: "Sensor" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:7059/api/Product", {
        name,
        stockCode,
        price,
        categoryId,
        brandId,
        isActive,
        gender, // Include gender in the API request
      });
      if (response.data.result.isValid) {
        toast.success(response.data.message);
        closeModal();
        refreshProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating product");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="pb-2">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={name}
          className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name..."
        />
      </div>
      <br />
      <div>
        <label className="pb-2">
          StockCode <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={stockCode}
          className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={(e) => setStockCode(e.target.value)}
          placeholder="Enter stock code..."
        />
      </div>
      <br />
      <div>
        <label className="pb-2">
          Price <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          required
          value={price}
          className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter product price..."
        />
      </div>
      <br />
      <div>
        <label className="pb-2">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full mt-2 border h-[35px] rounded-[5px]"
        >
          <option value="">Choose a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <br />
      <div>
        <label className="pb-2">Brand</label>
        <select
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
          className="w-full mt-2 border h-[35px] rounded-[5px]"
        >
          <option value="">Choose a brand</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>
      <br />
      <div>
        <label className="pb-2">
          Gender <span className="text-red-500">*</span>
        </label>
        <select
          required
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full mt-2 border h-[35px] rounded-[5px]"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unisex">Unisex</option>
        </select>
      </div>
      <br />
      <div className="flex items-center mt-4">
        <label className="pb-2 mr-2">Active</label>
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </div>
      <br />
      <button
        type="submit"
        className="w-full border h-[40px] rounded-[5px] bg-blue-500 text-white"
      >
        Create Product
      </button>
    </form>
  );
};

export default CreateProduct;
