import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductInputType, ProductInputTypeNames } from "../../Utils/Enun/Enum";
import { FaTrash, FaEdit } from "react-icons/fa";
import { APIBASE_URL } from "../../Utils/Server";

const CustomAttributeView = () => {
  const { id } = useParams();
  const [fieldCode, setFieldCode] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [inputType, setInputType] = useState("");
  const [options, setOptions] = useState([]);

  // Fetch the custom attribute details
  const fetchCustomAttribute = async () => {
    try {
      const response = await axios.get(
        `${APIBASE_URL}/api/CustomAttribute/${id}`
      );
      if (response.data && response.data.result) {
        setFieldCode(response.data.result?.fieldCode);
        setFieldName(response.data.result?.fieldName);
        setInputType(response.data.result?.inputType);
        setOptions(response.data.result?.options);
      }
    } catch (err) {
      toast.error("Error fetching custom attribute data");
    }
  };

  // Handle updates to options
  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...options];
    
    // Replace spaces in the option value with hyphens
    if (field === "optionValue") {
      value = value.replace(/\s+/g, '-'); // Replace spaces with hyphens
    }

    updatedOptions[index][field] = value;
    setOptions(updatedOptions);
  };

  // Handle adding a new option
  const handleAddOption = () => {
    const newOption = {
      displayOrder: options.length + 1,
      optionText: "",
      optionValue: "",//`Option${options.length + 1}`,
      isDefault: false,
    };
    setOptions([...options, newOption]);
  };

  // Handle deleting an option
  const handleDeleteOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  // Save the updated custom attribute
  const handleSave = async () => {
    const updatedAttribute = {
      id: id,
      fieldCode: fieldCode,
      fieldName: fieldName,
      inputType: inputType,
      options: options,
    };

    try {
      const response = await axios.put(
        `${APIBASE_URL}/api/CustomAttribute`,
        updatedAttribute
      );
      if (response.data.statusCode === 200) {
        toast.success(response.data.result.message);
        fetchCustomAttribute(); // Refetch the updated data after saving
      } else {
        toast.error(response.data.result.message);
      }
    } catch (error) {
      toast.error("Error updating custom attribute.");
    }
  };

  useEffect(() => {
    fetchCustomAttribute();
  }, [id]);

  return (
    <div className="w-full md:w-[80%] lg:w-[60%] bg-white shadow-lg rounded-md p-6 mx-auto my-8">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
        Basic Information
        </h1>
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <button className="text-lg text-gray-800 mt-1">
            {ProductInputTypeNames[inputType] || "N/A"}
          </button>
        </div>
      </div>

      {/* Field Code and Editable Field Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <h2 className="text-sm font-semibold text-gray-600">Field Name</h2>
          <input
            type="text"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Field Name"
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <h2 className="text-sm font-semibold text-gray-600">Field Code</h2>
          <p className="text-lg text-gray-800 mt-1">{fieldCode || "N/A"}</p>
        </div>
      </div>

      {/* Editable Options List */}
      {inputType === ProductInputType.Dropdown ||
      inputType === ProductInputType.MulipleSelect ? (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Options (White space not allowed in option value)
          </h2>

          {/* Options Table Header */}
          <div className="grid grid-cols-7 gap-4 font-semibold text-gray-600 bg-gray-100 p-2 rounded-md">
            <div className="text-center col-span-1">Position</div>
            <div className="col-span-2">Display</div>
            <div className="col-span-2">Option Value</div>
            <div className="text-center col-span-1">Is Default</div>
            <div className="text-center col-span-1">Actions</div>
          </div>

          {/* Render Editable Options */}
          {options.length > 0 ? (
            options.map((option, index) => (
              <div
                key={index}
                className="grid grid-cols-7 gap-4 py-2 items-center border-b last:border-none"
              >
                <div className="text-center col-span-1 font-medium">
                  {option.displayOrder}
                </div>
                {/* Editable Display Field */}
                <div className="col-span-2">
                  <input
                    type="text"
                    value={option.optionText || ""}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) =>
                      handleOptionChange(index, "optionText", e.target.value)
                    }
                    placeholder="Enter display text..."
                  />
                </div>
                {/* Editable Option Value */}
                <div className="col-span-2">
                  <input
                    type="text"
                    value={option.optionValue || ""}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) =>
                      handleOptionChange(index, "optionValue", e.target.value)
                    }
                    placeholder="Enter option value..."
                  />
                </div>
                {/* Editable Is Default Field */}
                <div className="text-center col-span-1">
                  <input
                    type="checkbox"
                    checked={option.isDefault}
                    onChange={(e) =>
                      handleOptionChange(index, "isDefault", e.target.checked)
                    }
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                {/* Actions Column */}
                <div className="text-center col-span-1">
                  <button
                    onClick={() => handleDeleteOption(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => {/* Add action logic here */}}
                    className="text-blue-600 hover:text-blue-800 ml-2"
                  >
                    {/* <FaEdit /> */}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">
              No options available.
            </p>
          )}

          {/* Add Option Button */}
          <div className="mt-4 text-right">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleAddOption}
            >
              Add Option
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">
          This field type does not have options.
        </p>
      )}

      {/* Save Button */}
      <div className="mt-6 text-right">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CustomAttributeView;
