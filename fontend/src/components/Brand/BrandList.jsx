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
const BrandList = () => {
  const [open, setOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");

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
        <div className="actions">
          <span onClick={() => handleView(params.data.id)} className="icon">
            <FontAwesomeIcon icon={faEye} />
          </span>
          {/* <span onClick={() => handleEdit(params.data.id)} className="icon">
          <Link to={`/brandDetail/${params.data.id}`}>
          <FontAwesomeIcon icon={faPen} />
            </Link>
           
          </span> */}
            <Link to={`/brandDetail/${params.data.id}`} className="icon">
            <FontAwesomeIcon icon={faPen} />
          </Link>
          <span onClick={() => handleDelete(params.data.id)} className="icon">
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </div>
      ),
    },
  ];

  const fetchBrands = async () => {
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
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleView = (id) => {
    alert(`View details for ID: ${id}`);
  };

  // const handleEdit = (id) => {
  //   alert(`Edit brand with ID: ${id}`);
  // };

  const handleDelete = (id) => {
    alert(`Delete brand with ID: ${id}`);
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
        fetchBrands(); // Call fetchBrands after creating a brand
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
      <h2>Brand List</h2>
      <div className="w-full flex justify-end">
        <div
          className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <span className="text-white">Create Brand</span>
        </div>
      </div>
      {open && (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
          <div className="w-[90%] md:w-[40%] h-[80vh] bg-white rounded-md shadow p-4 overflow-y-auto">
            <div className="w-full flex justify-end">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h5 className="text-[30px] font-Poppins text-center">Create Brand</h5>
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
                  placeholder="Enter brand name..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={shortDescription}
                  className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Enter short description..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={description}
                  className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description..."
                />
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
        rowData={brands}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={20}
      />
    </div>
  );
};

export default BrandList;
