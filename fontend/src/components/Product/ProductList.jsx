// ProductList.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import CreateProduct from "../Modals/CreateProduct"; // Importing the CreateProduct component

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const columnDefs = [
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "StockCode", field: "stockCode", sortable: true, filter: true },
    { headerName: "Price", field: "price", sortable: true, filter: true },
    {
      headerName: "Category",
      field: "categoryName",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Active",
      field: "isActive",
      cellRenderer: (params) => (
        <div>
          {params.data.isActive ? (
            <span className="text-green-500">Yes</span>
          ) : (
            <span className="text-yellow-500">No</span>
          )}
        </div>
      ),
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div className="actions">
          <span onClick={() => handleView(params.data.id)} className="icon">
            <FontAwesomeIcon icon={faEye} />
          </span>
          <Link to={`/ProductDetail/${params.data.id}`} className="icon">
            <FontAwesomeIcon icon={faPen} />
          </Link>
          <span onClick={() => handleDelete(params.data.id)} className="icon">
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </div>
      ),
    },
  ];

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7059/api/Product?currentPage=1&pageSize=40"
      );
      if (response.data && response.data.result) {
        setProducts(response.data.result);
      }
      setLoading(false);
    } catch (err) {
      setError("Error fetching product data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleView = (id) => {
    alert(`View details for ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete product with ID: ${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
     <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <div className="w-full flex justify-end">
        <div
          className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <span className="text-white">Create Product</span>
        </div>
      </div>
      {open && (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
          <div className="w-[90%] md:w-[40%] h-[80vh] bg-white rounded-md shadow p-4 overflow-y-auto">
            <div className="w-full flex justify-end">
              <RxCross1 size={30} className="cursor-pointer" onClick={() => setOpen(false)} />
            </div>
            <CreateProduct
              closeModal={() => setOpen(false)}
              refreshProducts={fetchProducts}
            />
          </div>
        </div>
      )}
      <AgGridReact
        rowData={products}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={20}
      />
    </div>
  );
};

export default ProductList;
