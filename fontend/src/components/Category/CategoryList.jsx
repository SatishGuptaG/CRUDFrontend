import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { APIBASE_URL } from "../../Utils/Server";
import { CreateCategory } from "../Modals/CreateCategory";

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const columnDefs = useMemo(
    () => [
      { headerName: "Name", field: "name", sortable: true, filter: true },
      { headerName: "Code", field: "code", sortable: true, filter: true },
      {
        headerName: "Actions",
        field: "actions",
        cellRenderer: (params) => (
          <div className="actions">
            <span onClick={() => handleView(params.data.id)} className="icon cursor-pointer text-blue-500">
              <FontAwesomeIcon icon={faEye} />
            </span>
            <Link to={`/categoryDetail/${params.data.id}`} className="icon">
              <FontAwesomeIcon icon={faPen} />
            </Link>
            <span onClick={() => handleDelete(params.data.id)} className="icon">
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </div>
        ),
      },
    ],
    []
  );

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${APIBASE_URL}/api/Category?currentPage=1&pageSize=40&name=${searchTerm}`
      );
      if (response.data && response.data.result) {
        setCategories(response.data.result);
      }
      setLoading(false);
    } catch (err) {
      setError("Error fetching category data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(); 
  }, []);

  const handleView = (id) => {
    alert(`View details for ID: ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${APIBASE_URL}/api/Category/${id}`);
      if (response.status === 200) {
        toast.success("Category deleted successfully!");
        fetchCategories();
      } else {
        toast.error("Error deleting category");
      }
    } catch (error) {
      toast.error("Error deleting category");
    }
  };

  const handleSearch = () => {
    fetchCategories(); 
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <h2 className="text-2xl font-bold mb-4">Category List</h2>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded-lg w-full sm:w-1/3 p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
          <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name"
            className="ml-2 w-full p-2 text-sm text-gray-700 outline-none placeholder-gray-400"
          />
        </div>
        {/* Search Button */}
        <button
          className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-green-600 text-white text-sm font-medium shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleSearch}
        >
          <FontAwesomeIcon icon={faSearch} />
          Search
        </button>

        {/* Create Category Button */}
        <button
          className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium shadow-md hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={() => setOpen(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
          Create Category
        </button>
      </div>

      {open && <CreateCategory setOpen={setOpen} open={open} />}

      <AgGridReact
        rowData={categories}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default CategoryList;
