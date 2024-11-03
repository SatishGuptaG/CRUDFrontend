import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import Description from "../Brand/Description";
import ImagesVideos from "../Brand/ImagesVideos";
import Configuration from "../Brand/Configuration";
import axios from "axios";
import { APIBASE_URL } from "../../Utils/Server";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import ProductBasicInfo from "./ProductBasicInfo";
import ProductIdentifier from "./ProductIdentifier";

const CATEGORY_MENU_TABS = [
  { id: 1, title: "Basic Information", iconClass: "icon-basic" },
  { id: 2, title: "Description", iconClass: "icon-description" },
  { id: 3, title: "Images & Videos", iconClass: "icon-media" },
  { id: 4, title: "Configuration", iconClass: "icon-config" },
  { id: 5, title: "Identifier", iconClass: "icon-identifier" }, // New Identifier Tab
];

const ProductFormTabs = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: id,
    basicInfo: {
      name: "",
      description: "",
      shortDescription: "",
      price: 0,
      gender: "",
      categoryId: "",
      brandId: "",
    },
    media: {
      files:[]
    },
    videos: [],
    identifier: {
      sku: "",
      stockCode: "",
      ean: "",
      upc: "",
    },
    flags: {
      isActive: false,
      isFeatured: false,
    },
    isActive: true,
  });
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7059/api/List/category"
      );
      setCategories(response.data.result);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBrand = async () => {
    try {
      const response = await axios.get("https://localhost:7059/api/List/brand");
      setBrands(response.data.result);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  // Fetch product details for editing
  const fetchProductDetail = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7059/api/Product/${id}`
      );
      console.log(response.data);
      if (response.data && response.data.result) {
        const product = response.data.result;
        setFormData({
          id: product.id,
          basicInfo: {
            name: product.basicInfo.name,
            description: product.basicInfo.description || "",
            shortDescription: product.basicInfo.shortDescription || "",
            price: product.basicInfo.price,
            gender: product.basicInfo.gender || "",
            categoryId: product.basicInfo.categoryId,
            brandId: product.basicInfo.brandId,
          },
          identifier: {
            sku: product.identifier.sku || "",
            stockCode: product.identifier.stockCode || "",
            ean: product.identifier.ean || "",
            upc: product.identifier.upc || "",
          },
          flags: {
            isActive: product.isActive,
            isFeatured: false,
          },
          media:{
            files:product.media.files
          },
         // images: product.media.files, // Assuming no images data in the response, update accordingly if there is.
          videos: [], // Assuming no videos data in the response, update accordingly if there is.
          isActive: true,
        });
        console.log(formData);

        // Ensure brands and categories are loaded before setting IDs
        if (brands.length && categories.length) {
          const bdId =
            brands.find(
              (x) => x.id.toLowerCase() === formData.basicInfo.brandId
            )?.id || "";
          setBrandId(bdId);
          const catId =
            categories.find(
              (x) => x.id.toLowerCase() === formData.basicInfo.categoryId
            )?.id || "";
          setCategoryId(catId);
        }
      }
    } catch (err) {
      toast.error("Error fetching product data");
    }
  };
  useEffect(() => {
    // Fetch categories and brands first
    const fetchInitialData = async () => {
      await fetchBrand();
      await fetchCategory();
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    // Once categories and brands are loaded, fetch the product
    if (brands.length > 0 && categories.length > 0) {
      fetchProductDetail();
    }
  }, [brands, categories]); // Wait for both categories and brands to load

  const handleInputChange = (field, value) => {
    if (field.startsWith("identifier.")) {
      const identifierField = field.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        identifier: {
          ...prevData.identifier,
          [identifierField]: value,
        },
      }));
    } else if (field.startsWith("basicInfo.")) {
      const basicInfoField = field.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        basicInfo: {
          ...prevData.basicInfo,
          [basicInfoField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
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

  const handleSubmit = async () => {
    console.log("Form submitted:", formData);
    try {
      const response = await axios.put(
         `${APIBASE_URL}/api/Product/${id}`,
        //`https://67075e76a0e04071d229fd45.mockapi.io/api/v1/Category/15`,
        formData
      );
      console.log(response.data.result.isValid);
      if (response.data.result.isValid) {
        //console.log(response.data);
        toast.success(response.data.result.message);
        await fetchProductDetail(); // Refresh product data after update
      }else
      {
        toast.error(response.data.result.message);
      }
    } catch (err) {
      toast.error("Error submitting product data");
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
              {CATEGORY_MENU_TABS.map((tab) => (
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
            {formData.logoBase64 || formData.logoUrl ? (
              <img
                src={formData.logoBase64 || formData.logoUrl} // Use logoBase64 if available, otherwise use logoUrl
                alt="Category Logo"
                className="w-12 h-12 object-cover rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <span>No Logo</span>
              </div>
            )}
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                {formData.basicInfo.name || "Product Detail"}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {formData.basicInfo.shortDescription ||
                  "Category ShortDescription"}
              </p>
            </div>
          </div>

          {/* Content Panels */}
          <div className="px-10 py-6">
            <Tab.Panels>
              <Tab.Panel>
                <ProductBasicInfo
                  basicInfo={formData.basicInfo}
                  stockCode={formData.identifier.stockCode}
                  categories={categories}
                  brands={brands}
                  selectedCategoryId={(id) =>
                    handleInputChange("basicInfo.categoryId", id)
                  }
                  selectedBrandId={(id) =>
                    handleInputChange("basicInfo.brandId", id)
                  }
                  onInputChange={handleInputChange}
                />
              </Tab.Panel>
              <Tab.Panel>
                <Description
                  description={formData.basicInfo.description}
                  shortDescription={formData.basicInfo.shortDescription}
                  onInputChange={(field, value) =>
                    handleInputChange(`basicInfo.${field}`, value)
                  }
                />
              </Tab.Panel>
              <Tab.Panel>
                <ImagesVideos
                  images={formData.media.files}
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
              {/* New Identifier Tab.Panel */}
              <Tab.Panel>
                <ProductIdentifier
                  sku={formData.identifier.sku}
                  stockCode={formData.identifier.stockCode}
                  ean={formData.identifier.ean}
                  upc={formData.identifier.upc}
                  onInputChange={(field, value) =>
                    handleInputChange(`identifier.${field}`, value)
                  }
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

export default ProductFormTabs;
