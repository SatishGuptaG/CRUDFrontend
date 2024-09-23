import React, { useEffect, useState } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

  const columnDefs = [
    { headerName: "Name", field: "name", sortable: true, filter: true },
    {
      headerName: "StockCode",
      field: "stockCode",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Price",
      field: "price",
      sortable: true,
      filter: true,
    },
    {
        headerName: "Category",
        field: "categoryName",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Active",
        field: "isActive",
        sortable: true,
        filter: true,
      },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div className="actions">
          <span onClick={() => handleView(params.data.id)} className="icon">
            <FontAwesomeIcon icon={faEye} />
          </span>
          {/* <span onClick={() => handleEdit(params.data.id)} className="icon">
          <Link to={`/brandDetail/${params.data.id}`}>
          <FontAwesomeIcon icon={faPen} />
            </Link>
           
          </span> */}
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
      setError("Error fetching brand data");
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
    alert(`Delete brand with ID: ${id}`);
  };

  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <h2>Product List</h2>
   
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
