import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { APIBASE_URL } from '../../Utils/Server';
import axios from 'axios';
import { toast } from 'react-toastify';

export const CreateCustomAttribute = ({ setOpen }) => {
  const [fieldCode, setFieldCode] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [inputType, setInputType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Show loading spinner

    try {
      const response = await axios.post(`${APIBASE_URL}/api/CustomAttribute`, {
        fieldCode,
        fieldName,
        inputType,
      });

      if (response.data.result.isValid) {
        toast.success("Custom Attribute created successfully!");
        setOpen(false);
        setFieldCode("");
        setFieldName("");
        setInputType("");
        // Delay before reloading the page (e.g., 2 seconds)
        setTimeout(() => {
          window.location.reload();
        }, 1000); // 1000 milliseconds = 1 second
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating custom attribute");
    } finally {
      setLoading(false);  // Hide loading spinner
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[90%] md:w-[50%] h-auto bg-white rounded-xl shadow-lg p-6 overflow-y-auto transition-transform transform scale-95 hover:scale-100">
        {/* Close Button */}
        <div className="flex justify-end">
          <RxCross1
            size={30}
            className="cursor-pointer text-gray-600 hover:text-gray-800 transition duration-200"
            onClick={() => setOpen(false)}
          />
        </div>

        {/* Modal Title */}
        <h5 className="text-2xl font-semibold text-gray-800 text-center mb-6">Create Custom Attribute</h5>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Field Code */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Field Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={fieldCode}
              onChange={(e) => setFieldCode(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Enter custom attribute code..."
            />
          </div>

          {/* Field Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Field Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Enter field name..."
            />
          </div>

          {/* Input Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600">
              Input Type <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Enter input type..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 rounded-md text-white font-semibold ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
};
