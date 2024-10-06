import React from 'react';

const ImagesVideos = ({ images, videos, onImagesChange, onVideosChange }) => {
    
    // Function to remove an image by index
    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        onImagesChange(updatedImages);
    };

    // Function to remove a video by index
    const handleRemoveVideo = (index) => {
        const updatedVideos = videos.filter((_, i) => i !== index);
        onVideosChange(updatedVideos);
    };

    return (
        <div className="space-y-6">
            {/* Image Upload */}
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Upload Images</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => onImagesChange(Array.from(e.target.files))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="mt-4 grid grid-cols-3 gap-4">
                    {images && images.map((image, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${index + 1}`}
                                className="h-24 w-full object-cover rounded-lg shadow-md"
                            />
                            <button
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs shadow-md hover:bg-red-600 transition duration-200"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Video Upload */}
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Upload Videos</label>
                <input
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={(e) => onVideosChange(Array.from(e.target.files))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="mt-4 grid grid-cols-1 gap-4">
                    {videos && videos.map((video, index) => (
                        <div key={index} className="relative group">
                            <video controls className="h-24 w-full object-cover rounded-lg shadow-md">
                                <source src={URL.createObjectURL(video)} />
                            </video>
                            <button
                                onClick={() => handleRemoveVideo(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs shadow-md hover:bg-red-600 transition duration-200"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImagesVideos;
