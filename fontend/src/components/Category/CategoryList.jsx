import React, { useEffect, useState } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CreateCategory } from "../Modals/CreateCategory";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { APIBASE_URL } from "../../Utils/Server";

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const columnDefs = [
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Code", field: "code", sortable: true, filter: true },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div className="actions">
          <span onClick={() => handleView(params.data.id)} className="icon">
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
  ];

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${APIBASE_URL}/api/Category?currentPage=1&pageSize=40`
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
     <h2 className="text-2xl font-bold mb-4">Category List</h2>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
          onClick={() => setOpen(true)}
        >
          Create Category
        </button>
      </div>
      {open && <CreateCategory setOpen={setOpen} open={open} />}
      <AgGridReact
        rowData={categories}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={20}
      />
    </div>
  );
};

export default CategoryList;
