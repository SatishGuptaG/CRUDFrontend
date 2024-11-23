import React, { useEffect, useState } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../Loader/LoadingSpinner";
import { APIBASE_URL } from "../../Utils/Server";
import { CreateCustomAttribute } from "../Modals/CreateCustomAttribute";

const CustomAttributeList = () => {
  const [customAttributes, setCustomAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const columnDefs = [
    {
      headerName: "Field Code",
      field: "fieldCode",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Field Name",
      field: "fieldName",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Input Type",
      field: "inputType",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Last Updated",
      field: "lastUpdated",
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        const date = new Date(params.value);
        const formattedDate = `${date.getDate()}-${date.toLocaleString(
          "default",
          { month: "short" }
        )}-${date.getFullYear()} @${date.toLocaleTimeString()}`;
        return formattedDate;
      },
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div className="actions flex gap-4 items-center justify-center">
          <span
            onClick={() => handleView(params.data.id)}
            className="action-icon text-blue-500 hover:text-blue-700 transition"
          >
            <FontAwesomeIcon icon={faEye} />
          </span>
          <Link
            to={`/customAttributeDetail/${params.data.id}`}
            className="action-icon text-green-500 hover:text-green-700 transition"
          >
            <FontAwesomeIcon icon={faPen} />
          </Link>
          <span
            onClick={() => handleDelete(params.data.id)}
            className="action-icon text-red-500 hover:text-red-700 transition"
          >
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </div>
      ),
    },
  ];

  const fetchCustomAttributes = async () => {
    try {
      const response = await axios.get(
        `${APIBASE_URL}/api/CustomAttribute?currentPage=1&pageSize=40`
      );
      if (response.data && response.data.result) {
        setCustomAttributes(response.data.result);
      }
      setLoading(false);
    } catch (err) {
      setError("Error fetching custom attribute data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomAttributes();
  }, []);

  const handleView = (id) => {
    alert(`View details for ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete customAttribute with ID: ${id}`);
  };

  if (loading) return <LoadingSpinner />; // Show loading spinner
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="text-4xl font-bold text-gray-800 mb-6">
        Custom Attribute List
      </h2>

      <div className="w-full flex justify-end mb-6">
        <button
          className="flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all"
          onClick={() => setOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Custom Attribute
        </button>
      </div>

      {/* Create modal for custom attribute */}
      {open && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <CreateCustomAttribute setOpen={setOpen} />
        </div>
      )}

      {/* AG Grid */}
      <div className="ag-theme-alpine w-full" style={{ height: 400 }}>
        <AgGridReact
          rowData={customAttributes}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={20}
          domLayout="autoHeight"
          gridOptions={{
            paginationPageSize: 20,
          }}
          // Add custom grid styles here
        />
      </div>
    </div>
  );
};

export default CustomAttributeList;
