import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";

const CreateBrand = ({ setOpen, fetchBrands }) => {
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:7059/api/Brand", {
        name,
        shortDescription,
        description,
      });
      if (response.data.result.isValid) {
        toast.success("Brand created successfully!");
        setOpen(false);
        fetchBrands(); // Refresh the list after creation
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating brand");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-[90%] md:w-[40%] h-[80vh] rounded-lg p-6 shadow-lg overflow-y-auto">
        <div className="flex justify-end">
          <RxCross1
            size={30}
            className="cursor-pointer text-gray-600"
            onClick={() => setOpen(false)}
          />
        </div>
        <h5 className="text-center text-2xl font-semibold mb-6">Create Brand</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter brand name..."
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">
              Short Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={shortDescription}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Enter short description..."
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={description}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBrand;
