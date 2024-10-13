import React, { useState } from "react";

const ImagesVideos = ({ images, videos, onImagesChange, onVideosChange }) => {
    const [imageDetails, setImageDetails] = useState(images || []);
    const [videoDetails, setVideoDetails] = useState(videos || []);

    // Function to handle image upload and convert to base64
    const handleImageUpload = (files) => {
        const newImages = Array.from(files).map((file, index) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImage = {
                    name: file.name,
                    base64: reader.result,
                    url: file.Url,
                    displayOrder: index + 1,
                    description: `Image ${index + 1}`,
                };
                setImageDetails((prevImages) => [...prevImages, newImage]);
                onImagesChange([...imageDetails, newImage]);
            };
            reader.readAsDataURL(file);
            return file;
        });
    };

    // Function to handle video upload and convert to base64
    const handleVideoUpload = (files) => {
        const newVideos = Array.from(files).map((file, index) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newVideo = {
                    name: file.name,
                    base64: reader.result,
                    displayOrder: index + 1,
                    description: `Video ${index + 1}`,
                };
                setVideoDetails((prevVideos) => [...prevVideos, newVideo]);
                onVideosChange([...videoDetails, newVideo]);
            };
            reader.readAsDataURL(file);
            return file;
        });
    };

    // Function to remove an image by index
    const handleRemoveImage = (index) => {
        const updatedImages = imageDetails.filter((_, i) => i !== index);
        setImageDetails(updatedImages);
        onImagesChange(updatedImages);
    };

    // Function to remove a video by index
    const handleRemoveVideo = (index) => {
        const updatedVideos = videoDetails.filter((_, i) => i !== index);
        setVideoDetails(updatedVideos);
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
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="mt-4 grid grid-cols-3 gap-4">
                    {imageDetails.map((image, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={image.url}
                                alt={image.name}
                                className="h-24 w-full object-cover rounded-lg shadow-md"
                            />
                            <div className="mt-2 text-sm text-gray-700">
                                <p>Name: {image.name}</p>
                                <p>Order: {image.displayOrder}</p>
                                <p>Description: {image.description}</p>
                            </div>
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
                    onChange={(e) => handleVideoUpload(e.target.files)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="mt-4 grid grid-cols-1 gap-4">
                    {videoDetails.map((video, index) => (
                        <div key={index} className="relative group">
                            <video controls className="h-24 w-full object-cover rounded-lg shadow-md">
                                <source src={video.base64} />
                            </video>
                            <div className="mt-2 text-sm text-gray-700">
                                <p>Name: {video.name}</p>
                                <p>Order: {video.displayOrder}</p>
                                <p>Description: {video.description}</p>
                            </div>
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
