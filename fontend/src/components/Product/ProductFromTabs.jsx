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
import { ProductStatus } from "../../enums/ProductStatus";
import ProductStatusModel from "./ProductStatusModel";

const CATEGORY_MENU_TABS = [
  { id: 1, title: "Basic Information", iconClass: "icon-basic" },
  { id: 2, title: "Description", iconClass: "icon-description" },
  { id: 3, title: "Images & Videos", iconClass: "icon-media" },
 // { id: 4, title: "Configuration", iconClass: "icon-config" },
  { id: 4, title: "Identifier", iconClass: "icon-identifier" }, // New Identifier Tab
];

const ProductFormTabs = () => {
  const { id } = useParams();
  const [status, setStatus] = useState(ProductStatus.Draft); // Default status Draft
  const [editedStatus, setEditedStatus] = useState(null); // State to track edited status
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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
      stockCode: "",
    },
    media: {
      files: [],
    },
    videos: [],
    identifier: {
      sku: "",
      ean: "",
      upc: "",
    },
    flags: {
      isActive: false,
      isFeatured: false,
    },
    isActive: true,
    isVisible: false,
    status : 1
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
  const handleStatusChange = (newStatus) => {
    // if (newStatus !== status) {
    setEditedStatus(newStatus);
    setShowModal(true); // Open the modal for confirmation
    //}
  };

  // Fetch product details for editing
  const fetchProductDetail = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7059/api/Product/${id}`
      );
      //console.log(response.data);
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
            stockCode: product.basicInfo.stockCode,

          },
          identifier: {
            sku: product.identifier.sku || "",
           // stockCode: product.identifier.stockCode || "",
            ean: product.identifier.ean || "",
            upc: product.identifier.upc || "",
          },
          // flags: {
          //   isActive: product.isActive,
          //   isFeatured: false,
          // },
          media: {
            files: product.media?.files,
          },
          // images: product.media.files, // Assuming no images data in the response, update accordingly if there is.
          videos: [], // Assuming no videos data in the response, update accordingly if there is.
          isActive: product.isActive || false,
          isVisible: product.isVisible || false,
          status: product.status || 1,
          
        });
        setStatus(product.status);
        setIsVisible(product.isVisible);
       
      // console.log(formData);
       //console.log(product.basicInfo.status,status);
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
    } else if (field === "media.files") {
      // Handle updating media files specifically
      setFormData((prevData) => ({
        ...prevData,
        media: {
          ...prevData.media,
          files: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

  // const handleFlagsChange = (flag, value) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     flags: {
  //       ...prevData.flags,
  //       [flag]: value,
  //     },
  //   }));
  // };
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(isVisible);
    setStatus(editedStatus);
    try {
      const response = await axios.put(
        `${APIBASE_URL}/api/Product/${id}/status`,
        {
          "status": editedStatus,
          "isVisible": isVisible

        }
      );
      if(response.data.result.isValid)
      {
        toast.success(response.data.result.message);
        // Reload the page after fetching product details
      // Delay before reloading the page (e.g., 2 seconds)
      setTimeout(() => {
        window.location.reload();
      }, 1000); // 2000 milliseconds = 2 seconds
      }
      else 
        toast.error(response.data.result.message);
      
    } catch (error) {
      toast.error("Error submitting product data",error.message);
    }
    setShowModal(false); // Close the modal after updating
  };
  const handleSubmit = async () => {
    console.log("Form submitted:", formData);
    try {
      const response = await axios.put(
        `${APIBASE_URL}/api/Product/${id}`,
        //`https://67075e76a0e04071d229fd45.mockapi.io/api/v1/Category/15`,
        formData
      );
     // console.log(response.data.result.isValid);
      if (response.data.result.isValid) {
        //console.log(response.data);
        toast.success(response.data.result.message);
        // await fetchProductDetail(); // Refresh product data after update
        // Reload the page after fetching product details
        // Delay before reloading the page (e.g., 2 seconds)
        setTimeout(() => {
          window.location.reload();
        }, 1000); // 2000 milliseconds = 2 seconds
      } else {
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
          <div className="px-10 py-6 border-b border-gray-200 flex items-center justify-between space-x-6">
            {/* Logo */}
            {formData.media.files && formData.media?.files[0] ? (
              <img
                src={formData.media?.files[0]?.base64 || formData.media?.files[0]?.url} // Use logoBase64 if available, otherwise use logoUrl
                alt="Category Logo"
                className="w-14 h-14 object-cover rounded-full shadow-lg"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 font-semibold">
                No Image
              </div>
            )}

            <div className="flex-grow ml-4">
              <h1 className="text-2xl font-semibold text-gray-800 leading-tight">
                {formData.basicInfo.name || "Product Detail"}
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                {formData.basicInfo.shortDescription ||
                  "Category ShortDescription"}
              </p>
            </div>

            {/* Status Buttons */}
            <div className="flex items-center space-x-2 ml-auto">
              {/* Show buttons based on status */}
              {status === ProductStatus.Draft && (
                <button
                  type="button"
                  className="bg-yellow-500 text-xs px-4 py-2 rounded-full hover:bg-yellow-600 focus:outline-none transition duration-200"
                  onClick={() => handleStatusChange(ProductStatus.Draft)}
                >
                  Draft
                </button>
              )}
              {status === ProductStatus.Active && (
                <button
                  type="button"
                  className="bg-green-500 text-xs px-4 py-2 rounded-full hover:bg-green-600 focus:outline-none transition duration-200"
                  onClick={() => handleStatusChange(ProductStatus.Active)}
                >
                  Active
                </button>
              )}
              {status === ProductStatus.Archived && (
                <button
                  type="button"
                  className="bg-blue-500 text-xs px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none transition duration-200"
                  onClick={() => handleStatusChange(ProductStatus.Archived)}
                >
                  Archived
                </button>
              )}
                {status === ProductStatus.Pending && (
                <button
                  type="button"
                  className="bg-orange-500 text-xs px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none transition duration-200"
                  onClick={() => handleStatusChange(ProductStatus.Pending)}
                >
                  Pending
                </button>
              )}
              {status === ProductStatus.Discontinued && (
                <button
                  type="button"
                  className="bg-red-500 text-xs px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none transition duration-200"
                  onClick={() => handleStatusChange(ProductStatus.Discontinued)}
                >
                  Discontinued
                </button>
              )}
            </div>
          </div>

          {/* Content Panels */}
          <div className="px-10 py-6">
            <Tab.Panels>
              <Tab.Panel>
                <ProductBasicInfo
                  basicInfo={formData.basicInfo}
                  stockCode={formData.basicInfo.stockCode}
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
                  onImagesChange={(files) =>
                    handleInputChange("media.files", files)
                  }
                  onVideosChange={(files) => handleInputChange("videos", files)}
                />
              </Tab.Panel>
              {/* New Identifier Tab.Panel */}
              <Tab.Panel>
                <ProductIdentifier
                  sku={formData.identifier.sku}
                 // stockCode={formData.identifier.stockCode}
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
        {/* Update status Modal */}
        {showModal && (
              <ProductStatusModel
                editedStatus={editedStatus}
                handleUpdate={handleUpdate}
                setEditedStatus={setEditedStatus}
                setShowModal={setShowModal}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
              />
            )}
    </Tab.Group>
  );
};

export default ProductFormTabs;
