import React, { useState } from 'react';
import BasicInfo from './BasicInfo';
import Description from './Description';
import ImagesVideos from './ImagesVideos';
import Configuration from './Configuration';

const BrandForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        logo: null,
        description: '',
        shortDescription: '',
        images: [],
        videos: [],
        flags: {
            isActive: false,
            isFeatured: false,
        },
    });

    // Handler for input changes
    const handleInputChange = (section, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [section]: value,
        }));
    };

    // Handler for flags (configuration)
    const handleFlagsChange = (flag, value) => {
        setFormData((prevData) => ({
            ...prevData,
            flags: {
                ...prevData.flags,
                [flag]: value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form data (you can integrate API call here)
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create a New Brand</h1>
            
            <BasicInfo
                name={formData.name}
                logo={formData.logo}
                onInputChange={(value) => handleInputChange('name', value)}
                onLogoChange={(file) => handleInputChange('logo', file)}
            />
            
            <Description
                description={formData.description}
                shortDescription={formData.shortDescription}
                onInputChange={(field, value) => handleInputChange(field, value)}
            />

            <ImagesVideos
                images={formData.images}
                videos={formData.videos}
                onImagesChange={(files) => handleInputChange('images', files)}
                onVideosChange={(files) => handleInputChange('videos', files)}
            />

            <Configuration
                flags={formData.flags}
                onFlagChange={handleFlagsChange}
            />

            <button type="submit">Create Brand</button>
        </form>
    );
};

export default BrandForm;
