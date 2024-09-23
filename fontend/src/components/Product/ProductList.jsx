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
  const [name, setName] = useState("");
  const [stockCode, setStockCode] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [gender, setGender] = useState("");
  const [isActive, setIsActive] = useState(false);
  
   // Demo data for Brand and Category
   const brands = [
    { id: "40d2b9ad-7b79-ef11-b6ab-8c16f6f17cd6", name: "Nikee" },
    { id: "cebf2979-da78-ef11-b6ab-8c16f6f17cd6", name: "A1" },
  ];

  const categories = [
    { id: "3253ad5b-b178-ef11-b6ab-8c16f6f17cd6", name: "Circuit" },
    { id: "d99a5b4e-b178-ef11-b6ab-8c16f6f17cd6", name: "Monitor" },
    { id: "d89a5b4e-b178-ef11-b6ab-8c16f6f17cd6", name: "Driver" },
    { id: "d79a5b4e-b178-ef11-b6ab-8c16f6f17cd6", name: "Sensor" },
  ];

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:7059/api/Product", {
        name,
        stockCode,
        price,
        gender,
        categoryId,
        brandId,
        isActive,
      });
      if (response.data.result.isValid) {
        toast.success(response.data.message);
        setOpen(false);
        setName("");
        setStockCode("");
        setBrandId("");
        setCategoryId("");
        setGender("");
        setPrice("");
        setIsActive(false);
        fetchProducts(); // Call fetchBrands after creating a brand
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating brand");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <h2>Product List</h2>
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
            <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="pb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter product name..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">
                  StockCode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={stockCode}
                  className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setStockCode(e.target.value)}
                  placeholder="Enter stock code..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={price}
                  className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter product price..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={categoryId}
                  className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                >
                  <option value="" disabled>Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <br />
              <div>
                <label className="pb-2">
                  Brand <span className="text-red-500">*</span>
                </label>
                <select
                  value={brandId}
                  className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setBrandId(e.target.value)}
                  required
                >
                  <option value="" disabled>Select Brand</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                  ))}
                </select>
              </div>
              <br />
              <div>
                <label className="pb-2">
                  Is Active <span className="text-red-500">*</span>
                </label>
                <select
                  value={isActive}
                  className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setIsActive(e.target.value === "true")}
                  required
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select>
              </div>
              <br />
              <div>
                <input
                  type="submit"
                  value="Create"
                  className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] cursor-pointer bg-blue-500 text-white"
                />
              </div>
            </form>
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
