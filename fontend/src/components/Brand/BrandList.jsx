import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../Loader/LoadingSpinner"; // Assuming you have a loading spinner component
import CreateBrand from "../Modals/CreateBrand"; 

const BrandList = ({ darkMode }) => {
  const [open, setOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <LoadingSpinner />; // Improved loading feedback
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className={`${darkMode ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'}`} style={{ height: 400, width: "100%" }}>
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
        <CreateBrand 
          setOpen={setOpen} 
          fetchBrands={fetchBrands} // Pass fetchBrands to refresh the list after creation
        />
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
