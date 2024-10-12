import React from 'react';

const Description = ({ description, shortDescription, onInputChange }) => {
    return (
        <div className="space-y-6">
            {/* Short Description */}
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Short Description</label>
                <textarea
                    value={shortDescription}
                    onChange={(e) => onInputChange('shortDescription', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    placeholder="Enter short description"
                />
            </div>

            {/* Full Description */}
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Full Description</label>
                <textarea
                    value={description}
                    onChange={(e) => onInputChange('description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                    rows="6"
                    placeholder="Enter full description"
                />
            </div>
        </div>
    );
};


export default Description;
