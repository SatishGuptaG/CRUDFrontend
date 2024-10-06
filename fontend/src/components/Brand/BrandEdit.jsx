import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { APIBASE_URL } from '../../Utils/Server';

const BrandEdit = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");

  const fetchBrand = async () => {
    try {
      const response = await axios.get(`${APIBASE_URL}/api/Brand/${id}`);
      if (response.data && response.data.result) {
        setName(response.data.result.name);
        setShortDescription(response.data.result.shortDescription);
        setDescription(response.data.result.description);
      }
    } catch (err) {
      toast.error("Error fetching brand data");
    }
  };

  useEffect(() => {
    fetchBrand();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${APIBASE_URL}/api/Brand`, {
        id,
        name,
        shortDescription,
        description,
      });
      if (response.data.result.isValid) {
        fetchBrand();
        toast.success("Brand updated successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating brand");
    }
  };

  return (
    <div className="p-20 shadow-lg rounded-lg w-full">
      <h2 className="text-2xl font-semibold mb-4">Edit Brand</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your brand name..."
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Short Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            rows="4"
            value={shortDescription}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="Enter short description..."
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            rows="8"
            value={description}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter full description..."
            required
          />
        </div>
        
        <div>
          <input
            type="submit"
            value="Update"
            className="w-full bg-blue-500 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300"
          />
        </div>
      </form>
    </div>
  );
};

export default BrandEdit;
