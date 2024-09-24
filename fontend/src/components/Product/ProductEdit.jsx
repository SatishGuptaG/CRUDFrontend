import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

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

const ProductEdit = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [stockCode, setStockCode] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [gender, setGender] = useState("");
  const [isActive, setIsActive] = useState(false);

  // Fetch product details for editing
  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7059/api/Product/${id}`
      );
      if (response.data && response.data.result) {
        const product = response.data.result;

        // Set the product details in the state
        setName(product.name);
        setStockCode(product.stockCode);
        setPrice(product.price);
        setGender(product.gender);
        setIsActive(product.isActive);

        // Find and set the brand and category ID based on their names
        const bdId = brands.find((x) => x.name.toLowerCase() === product.brandName.toLowerCase())?.id || "";
        setBrandId(bdId);
        const catId = categories.find((x) => x.name.toLowerCase() === product.categoryName.toLowerCase())?.id || "";
        setCategoryId(catId);
      }
    } catch (err) {
      toast.error("Error fetching product data");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Handle product update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("https://localhost:7059/api/Product", {
        id,
        name,
        stockCode,
        price,
        gender,
        categoryId,
        brandId,
        isActive,
      });

      if (response.data.result.isValid) {
        toast.success(response.data.message);
        fetchProduct(); // Refresh product data after update
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error updating product"
      );
    }
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <form onSubmit={handleUpdate}>
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
            className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setCategoryId(e.target.value)}
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
        <br />
        <div>
          <label className="pb-2">
            Brand <span className="text-red-500">*</span>
          </label>
          <select
            value={brandId}
            className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setBrandId(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Brand
            </option>
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
            Is Active <span className="text-red-500">*</span>
          </label>
          <select
            value={isActive.toString()}
            className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setIsActive(e.target.value === "true")}
            required
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        <br />
        <div>
          <input
            type="submit"
            value="Update"
            className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] cursor-pointer bg-blue-500 text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
