import React, { useState, useCallback, useMemo, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise"; // Add this if using enterprise features
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPen,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CustomNoRowsOverlay from "../common/CustomNoRowsOverlay";

// Utility to debounce function calls
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const BrandList = ({ darkMode }) => {
  const [gridApi, setGridApi] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  // Using debounce to wait for the user to stop typing
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms debounce

  const columnDefs = useMemo(
    () => [
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
          <div className="actions flex gap-2">
            <span
              onClick={() => handleView(params.data.id)}
              className="icon cursor-pointer text-blue-500"
            >
              <FontAwesomeIcon icon={faEye} />
            </span>
            <Link
              to={`/brandDetail/${params.data.id}`}
              className="icon cursor-pointer text-yellow-500"
            >
              <FontAwesomeIcon icon={faPen} />
            </Link>
            <span
              onClick={() => handleDelete(params.data.id)}
              className="icon cursor-pointer text-red-500"
            >
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </div>
        ),
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 100,
      sortable: true,
      filter: true,
    }),
    []
  );

  const getServerSideDatasource = useCallback(
    () => ({
      getRows: async (params) => {
        const { startRow, endRow } = params.request;
        const currentPage = Math.floor(startRow / 10) + 1; // Assuming 40 items per page
        const pageSize = endRow - startRow;

        try {
          const response = await axios.get(
            `https://localhost:7059/api/Brand?currentPage=${currentPage}&pageSize=${pageSize}&name=${debouncedSearchTerm}`
          );

          const { result: rowData, totalRecords } = response.data;

          params.success({
            rowData,
            rowCount: totalRecords,
          });
        } catch (error) {
          params.fail();
          setError("Error fetching data from the server.");
        }
      },
    }),
    [debouncedSearchTerm, gridApi] // Recreate the datasource only when debouncedSearchTerm changes
  );

  const onGridReady = useCallback(
    (params) => {
      setGridApi(params.api);

      // Ensure Server-Side Row Model is properly set
      const datasource = getServerSideDatasource();
      params.api.setGridOption("serverSideDatasource", datasource);
    },
    [getServerSideDatasource]
  );

  const handleView = (id) => {
    alert(`View details for ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      alert(`Brand with ID: ${id} deleted!`);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const onSearchButtonClick = () => {
    console.log(searchTerm);
    if (gridApi) {
      // Ensure Server-Side Row Model is properly set
      const datasource = getServerSideDatasource();
      gridApi.setGridOption("serverSideDatasource", datasource);
    }
  };

  return (
    <div
      className={`${darkMode ? "ag-theme-alpine-dark" : "ag-theme-alpine"}`}
      style={{ height: 400, width: "100%" }}
    >
      <h2 className="text-2xl font-bold mb-4">Brand List</h2>

      {error && <p className="text-red-500">{error}</p>}

      {/* Search Bar */}
      {/* Search Bar */}
      <div className="flex mb-4 items-center space-x-4">
        <div className="flex items-center border border-gray-300 rounded-lg w-1/3 p-2">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name"
            className="ml-2 w-full p-2 outline-none"
          />
        </div>
        <button
          className="btn btn-primary p-2 rounded-lg bg-black hover:bg-green-700 text-white transition"
          onClick={onSearchButtonClick}
        >
          Search
        </button>
      </div>

      <AgGridReact
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowModelType="serverSide" // Enable server-side row model
        serverSideStoreType="partial" // Partial loading of rows
        cacheBlockSize={10} // Matches paginationPageSize
        pagination={true}
        paginationPageSize={10} // Fixed page size
        paginationPageSizeSelector={[10, 20, 30]} // Allow user to choose page size
        onGridReady={onGridReady}
        frameworkComponents={{
          CustomNoRowsOverlay,
        }}
        noRowsOverlayComponent="CustomNoRowsOverlay"
        noRowsOverlayComponentParams={{
          message: `No rows found at: ${new Date().toLocaleTimeString()}`,
        }}
      />
    </div>
  );
};

export default BrandList;
