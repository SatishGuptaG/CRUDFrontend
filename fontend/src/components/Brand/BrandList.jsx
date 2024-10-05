import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../Loader/LoadingSpinner"; // Assuming you have a loading spinner component

const BrandList = () => {
  const [open, setOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");

  // Define column definitions for the Ag-Grid table
  const columnDefs = [
    { headerName: "Name", field: "name", sortable: true, filter: true },
    {
      headerName: "Short Description",
      field: "shortDescription",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Last Updated",
      field: "lastUpdated",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div className="actions flex gap-2">
          <span onClick={() => handleView(params.data.id)} className="icon cursor-pointer text-blue-500">
            <FontAwesomeIcon icon={faEye} />
          </span>
          <Link to={`/brandDetail/${params.data.id}`} className="icon cursor-pointer text-yellow-500">
            <FontAwesomeIcon icon={faPen} />
          </Link>
          <span onClick={() => handleDelete(params.data.id)} className="icon cursor-pointer text-red-500">
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </div>
      ),
    },
  ];

  // Fetch brands using a useCallback to avoid unnecessary re-renders
  const fetchBrands = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://localhost:7059/api/Brand?currentPage=1&pageSize=40"
      );
      if (response.data && response.data.result) {
        setBrands(response.data.result);
      }
      setLoading(false);
    } catch (err) {
      setError("Error fetching brand data");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleView = (id) => {
    alert(`View details for ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      // Delete logic here
      toast.success(`Brand with ID: ${id} deleted!`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:7059/api/Brand", {
        name,
        shortDescription,
        description,
      });
      if (response.data.result.isValid) {
        toast.success("Brand created successfully!");
        setOpen(false);
        fetchBrands(); // Refresh the list after creation
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating brand");
    }
  };

  if (loading) return <LoadingSpinner />; // Improved loading feedback
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <h2 className="text-2xl font-bold mb-4">Brand List</h2>
      
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
          onClick={() => setOpen(true)}
        >
          Create Brand
        </button>
      </div>

      {/* Create Brand Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-[90%] md:w-[40%] h-[80vh] rounded-lg p-6 shadow-lg overflow-y-auto">
            <div className="flex justify-end">
              <RxCross1
                size={30}
                className="cursor-pointer text-gray-600"
                onClick={() => setOpen(false)}
              />
            </div>
            <h5 className="text-center text-2xl font-semibold mb-6">Create Brand</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-medium">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter brand name..."
                />
              </div>
              
              <div className="mb-4">
                <label className="block font-medium">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={shortDescription}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Enter short description..."
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={description}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      )}

      <AgGridReact
        rowData={brands}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={20}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default BrandList;
