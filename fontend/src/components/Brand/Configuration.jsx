import React from 'react';

const Configuration = ({ flags, onFlagChange }) => {
    return (
        <div className="space-y-6">
            {/* Active Flag */}
            <div className="flex items-center">
                <label className="block text-gray-700 text-sm font-medium mr-4">Is Active</label>
                <input
                    type="checkbox"
                    checked={flags.isActive}
                    onChange={(e) => onFlagChange('isActive', e.target.checked)}
                    className="toggle-checkbox"
                />
            </div>

            {/* Featured Flag */}
            <div className="flex items-center">
                <label className="block text-gray-700 text-sm font-medium mr-4">Is Featured</label>
                <input
                    type="checkbox"
                    checked={flags.isFeatured}
                    onChange={(e) => onFlagChange('isFeatured', e.target.checked)}
                    className="toggle-checkbox"
                />
            </div>
        </div>
    );
};


export default Configuration;
