import React from 'react';

const BasicInfo = ({ name, logo, onInputChange, onLogoChange }) => {
    return (
        <div className="space-y-6">
            {/* Name Input */}
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Brand Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => onInputChange(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter brand name"
                />
            </div>

            {/* Logo Upload */}
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Brand Logo</label>
                <input
                    type="file"
                    onChange={(e) => onLogoChange(e.target.files[0])}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
                {logo && (
                    <div className="mt-4">
                        <img src={URL.createObjectURL(logo)} alt="Logo Preview" className="h-16 w-16 object-cover rounded-full shadow-md" />
                    </div>
                )}
            </div>
        </div>
    );
};


export default BasicInfo;
