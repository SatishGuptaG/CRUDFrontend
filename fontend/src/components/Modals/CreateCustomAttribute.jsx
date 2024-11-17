import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { APIBASE_URL } from '../../Utils/Server';
import axios from 'axios';
import { toast } from 'react-toastify';

export const CreateCustomAttribute = ({setOpen}) => {
    const [fieldCode, setFieldCode] = useState("");
    const [fieldName, setFieldName] = useState("");
    const [inputType, setInputType] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(`${APIBASE_URL}/api/CustomAttribute`, {
            fieldCode,
            fieldName,
            inputType
          });
          if (response.data.result.isValid) {
            toast.success("Custom Attribute created successfully!");
            setOpen(false);
            setFieldCode("");
            setFieldName("");
            setInputType("");
            //fetchCustomAttributes(); // Refresh data after creation
              // Delay before reloading the page (e.g., 2 seconds)
        setTimeout(() => {
            window.location.reload();
          }, 1000); // 1000 milliseconds = 1 seconds
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Error creating custom attribute");
        }
      };
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
    <div className="w-[90%] md:w-[40%] h-[80vh] bg-white rounded-md shadow p-4 overflow-y-auto">
      <div className="w-full flex justify-end">
        <RxCross1
          size={30}
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>
      <h5 className="text-[30px] font-Poppins text-center">Create Custom Attribute</h5>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="pb-2">
            Field Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={fieldCode}
            className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setFieldCode(e.target.value)}
            placeholder="Enter custom attribute code..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Field Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={fieldName}
            className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setFieldName(e.target.value)}
            placeholder="Enter field name..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Input Type <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={inputType}
            className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setInputType(e.target.value)}
            placeholder="Enter input type..."
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
}
