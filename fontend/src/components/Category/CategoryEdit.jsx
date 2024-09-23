import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CategoryEdit = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const fetchCategory = async () => {
    try {
      const response = await axios.get(`https://localhost:7059/api/Category/${id}`);
      if (response.data && response.data.result) {
        setName(response.data.result.name);
        setCode(response.data.result.code);
       
      }
    } catch (err) {
      toast.error("Error fetching category data");
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`https://localhost:7059/api/Category`, {
        id,
        name,
        code,
      });
      if (response.data.result.isValid) {
        fetchCategory();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating category");
    }
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <form onSubmit={handleUpdate}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your brand name..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Code <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="4"
            value={code}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code..."
          />
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

export default CategoryEdit;
