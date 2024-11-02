import React, {useState} from "react";
import AssetManagerModal from "../AssetManager/AssetManagerModal";
const CategoryBasicInfo = ({name, code, logo, onInputChange, onLogoChange, onLogoNameChange
}) => {

  const [showModal, setShowModal] = useState(false); // Modal state

  // Handle showing the modal with file details
  const handleShowAssetManager = () => {
    setShowModal(true); // Show the modal
  };

  // Handle file selection from the asset manager
  const handleFileSelect = (fileDetails) => {
    setShowModal(false); // Close the modal after file selection
    // Call onLogoChange with the file's URL from asset manager
    onLogoChange(fileDetails.secure_url, "url"); // Passing "url" type to distinguish between URL and file
    onLogoNameChange(fileDetails.public_id); // Pass the file name/public_id to parent component

  };

  // Handle file input change for manual upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    onLogoNameChange(e.target.files[0].name); // Pass the file name/public_id to parent component

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onLogoChange(reader.result, "file"); // Passing "file" type to distinguish between URL and file
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Name Input */}
      <div className="grid grid-cols-3 gap-x-6">
        <div className="col-span-1">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => onInputChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter brand name"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => onInputChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            disabled
          />
        </div>
      </div>

      {/* Logo Upload */}
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Logo
        </label>
        <input
          type="file"
          onChange={handleFileUpload}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
        />
        {logo && (
          <div className="mt-4">
            {/* Display the logo preview */}
            <img
              src={logo} // Directly use the 'logo' prop which now contains the preview URL or base64 string
              alt="Logo Preview"
              className="h-16 w-16 object-cover rounded-full shadow-md"
            />
          </div>
        )}
      </div>
      {/* Button to Open Asset Manager Modal */}
      <div>
        <button
          onClick={handleShowAssetManager}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add From Asset Manager
        </button>
      </div>

      {/* Modal to show file details */}
      {showModal && (
        <AssetManagerModal
          onClose={() => setShowModal(false)}
          onFileSelect={handleFileSelect} // Pass handleFileSelect to AssetManagerModal
        />
      )}
    </div>
  );
};

export default CategoryBasicInfo;
