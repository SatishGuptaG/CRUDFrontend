import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CustomAttributeEdit = () => {
  const { id } = useParams();
  const [fieldCode, setFieldCode] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [inputType, setInputType] = useState("");

  const fetchCustomAttribute = async () => {
    try {
      const response = await axios.get(`https://localhost:7059/api/CustomAttribute/${id}`);
      if (response.data && response.data.result) {
        setFieldCode(response.data.result?.fieldCode);
        setFieldName(response.data.result?.fieldName);
        setInputType(response.data.result?.inputType);
      }
    } catch (err) {
      toast.error("Error fetching customAttribute data");
    }
  };

  useEffect(() => {
    fetchCustomAttribute();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`https://localhost:7059/api/CustomAttribute`, {
        id,
        fieldCode,
        fieldName,
        inputType
       //Option
      });
      if (response.data.result.isValid) {
        fetchCustomAttribute();
        toast.success("CustomAttribute updated successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating customAttribute");
    }
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <form onSubmit={handleUpdate}>
        <br />
        <div>
          <label className="pb-2">
            Field Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fieldCode"
            value={fieldCode}
            disabled
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setFieldCode(e.target.value)}
            placeholder="Enter your fieldCode name..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Field Name <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="4"
            value={fieldName}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setFieldName(e.target.value)}
            placeholder="Enter short description..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Input Type <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            value={inputType}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setInputType(e.target.value)}
            placeholder="Enter input type..."
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

export default CustomAttributeEdit;
