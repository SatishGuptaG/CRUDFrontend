import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import BasicInfo from "./BasicInfo";
import Description from "./Description";
import ImagesVideos from "./ImagesVideos";
import Configuration from "./Configuration";
import axios from "axios";
import { APIBASE_URL } from "../../Utils/Server";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const BRAND_MENU_TABS = [
  { id: 1, title: "Basic Information", iconClass: "icon-basic" },
  { id: 2, title: "Description", iconClass: "icon-description" },
  { id: 3, title: "Images & Videos", iconClass: "icon-media" },
  { id: 4, title: "Configuration", iconClass: "icon-config" },
];

const BrandFormTabs = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    logo: null, // This will store the logo file
    logoPreview: null, // This will store the preview URL or base64 string
    description: "",
    shortDescription: "",
    images: [],
    videos: [],
    flags: {
      isActive: false,
      isFeatured: false,
    },
  });

  const fetchBrand = async () => {
    try {
      //const response = await axios.get(`${APIBASE_URL}/api/Brand/${id}`);
      const response = await axios.get(`https://67075e76a0e04071d229fd45.mockapi.io/api/v1/Brand/Brand/19`);
    //   if (response.data && response.data.result) {
    //     const brand = response.data.result;
    //     const brandjson = {
    //       name: brand.name,
    //       description: brand.description,
    //       shortDescription: brand.shortDescription,
    //       logoPreview:
    //         "https://res.cloudinary.com/dzabikj6s/image/upload/v1727525471/manjit/test-738r423.jpg", // Store URL for preview
    //       flags: {
    //         isActive: false,
    //         isFeatured: false,
    //       },
    //     };
    //     setFormData(brandjson);
        setFormData(response.data);
     // }
    } catch (err) {
      toast.error("Error fetching brand data");
    }
  };

  useEffect(() => {
    fetchBrand();
  }, [id]);

  const handleInputChange = (section, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: value,
    }));
  };

  const handleLogoChange = (file) => {
    if (file) {
      // Create a FileReader to generate the base64 string for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          logo: file, // Store the actual file
          logoPreview: reader.result, // Store the base64 string for preview
        }));
      };
      reader.readAsDataURL(file); // Convert the file to base64
    }
  };

  const handleFlagsChange = (flag, value) => {
    setFormData((prevData) => ({
      ...prevData,
      flags: {
        ...prevData.flags,
        [flag]: value,
      },
    }));
  };

  const handleSubmit = () => {
      // Prepare the form data by removing the base64 prefix from images and logoPreview
  const processedFormData = {
    ...formData,
    images: formData.images.map((image) => ({
      ...image,
      base64: image.base64.replace(/^data:image\/[a-z]+;base64,/, ""),
    })),
    logoPreview: formData.logoPreview
      ? formData.logoPreview.replace(/^data:image\/[a-z]+;base64,/, "")
      : null, // Only process if logoPreview exists
  };

  console.log("Processed Form Data:", processedFormData);
    // Submit form logic goes here
    console.log("Form submitted:", formData);
    try {
      const response = axios.put(
        `https://67075e76a0e04071d229fd45.mockapi.io/api/v1/Brand/Brand/19`,
        processedFormData
      );
      if (response.data) {
        console.log(response.data);
      }
    } catch (err) {
      toast.error("Error submitting brand data");
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Tab.Group defaultIndex={0} onChange={scrollToTop}>
      <div className="grid grid-cols-12 h-full">
        {/* Left Side: Tabs */}
        <div className="col-span-3 border-r border-gray-300 bg-white">
          <div className="flex flex-col h-full">
            <Tab.List className="flex flex-col space-y-2">
              {BRAND_MENU_TABS.map((tab) => (
                <Tab
                  key={tab.id}
                  className={({ selected }) =>
                    `py-3 px-4 flex items-center cursor-pointer outline-none transition-colors duration-200 ease-in-out 
                    ${
                      selected
                        ? "bg-blue-800 text-white font-semibold"
                        : "text-gray-700 hover:text-blue-800 hover:bg-gray-100"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <i
                        className={`icon-sprite ${tab.iconClass} ${
                          selected ? "text-white" : "text-gray-500"
                        }`}
                      />
                      <span className="ml-2">{tab.title}</span>
                    </>
                  )}
                </Tab>
              ))}
            </Tab.List>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="col-span-9 bg-gray-50">
          {/* Header */}
          <div className="px-10 py-6 border-b border-gray-200 flex items-center space-x-4">
            {/* Logo */}
            {formData.logoPreview && (
              <img
                src={formData.logoPreview} // Use logoPreview for displaying image
                alt="Brand Logo"
                className="w-12 h-12 object-cover rounded-full"
              />
            )}
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                {formData.name || "Brand Detail"}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {formData.shortDescription || "Brand Description"}
              </p>
            </div>
          </div>

          {/* Content Panels */}
          <div className="px-10 py-6">
            <Tab.Panels>
              <Tab.Panel>
                <BasicInfo
                  name={formData.name}
                  logo={formData.logoPreview} // Pass logoPreview here for rendering the preview
                  onInputChange={(value) => handleInputChange("name", value)}
                  onLogoChange={handleLogoChange} // Pass handleLogoChange for file input
                />
              </Tab.Panel>
              <Tab.Panel>
                <Description
                  description={formData.description}
                  shortDescription={formData.shortDescription}
                  onInputChange={(field, value) =>
                    handleInputChange(field, value)
                  }
                />
              </Tab.Panel>
              <Tab.Panel>
                <ImagesVideos
                  images={formData.images}
                  videos={formData.videos}
                  onImagesChange={(files) => handleInputChange("images", files)}
                  onVideosChange={(files) => handleInputChange("videos", files)}
                />
              </Tab.Panel>
              <Tab.Panel>
                <Configuration
                  flags={formData.flags}
                  onFlagChange={handleFlagsChange}
                />
              </Tab.Panel>
            </Tab.Panels>

            {/* Save Button */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-10 py-4 flex justify-end !z-10">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 ease-in-out"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </Tab.Group>
  );
};

export default BrandFormTabs;
