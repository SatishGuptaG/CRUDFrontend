import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { APIBASE_URL } from '../../Utils/Server';
import axios from 'axios';
import { toast } from 'react-toastify';

export const CreateCategory = ({ setOpen, open }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${APIBASE_URL}/api/Category`, {
        name,
        code
      });
      if (response.data.result.isValid) {
        toast.success("Category created successfully!");
        setOpen(false);
        setName("");
        setCode("");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating category");
    }
  };

  return (
    open && (
      <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
        <div className="w-[90%] md:w-[40%] h-[80vh] bg-white rounded-md shadow p-4 overflow-y-auto">
          <div className="w-full flex justify-end">
            <RxCross1
              size={30}
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>
          <h5 className="text-[30px] font-Poppins text-center">Create Category</h5>
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
                placeholder="Enter category name..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={code}
                className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter category code..."
              />
            </div>
            <br />
            <div>
              <input
                type="submit"
                value="Create"
                className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] cursor-pointer bg-blue-500 text-white"
              />
            </div>
          </form>
        </div>
      </div>
    )
  );
};
