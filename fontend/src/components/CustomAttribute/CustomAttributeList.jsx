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

const CustomAttributeList = () => {
  const [customAttributes, setCustomAttributes] = useState([]);
  const [fieldCode, setFieldCode] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [inputType, setInputType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const columnDefs = [
    { headerName: "Field Code", field: "fieldCode", sortable: true, filter: true },
    { headerName: "Field Name", field: "fieldName", sortable: true, filter: true },
    { headerName: "Input Type", field: "inputType", sortable: true, filter: true },
    { headerName: "Last Updated", field: "lastUpdated", sortable: true, filter: true },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div className="actions">
          <span onClick={() => handleView(params.data.id)} className="icon">
            <FontAwesomeIcon icon={faEye} />
          </span>
          <Link to={`/customAttributeDetail/${params.data.id}`} className="icon">
            <FontAwesomeIcon icon={faPen} />
          </Link>
          <span onClick={() => handleDelete(params.data.id)} className="icon">
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </div>
      ),
    },
  ];

  const fetchCustomAttributes = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7059/api/CustomAttribute?currentPage=1&pageSize=40"
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:7059/api/CustomAttribute", {
        fieldCode,
        fieldName,
        inputType
      });
      if (response.data.result.isValid) {
        toast.success("Custom Attribute created successfully!");
        setOpen(false);
        setFieldCode("");
        setFieldName("");
        setInputType("");
        fetchCustomAttributes(); // Refresh data after creation
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating custom attribute");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <h2>Custom Attribute List</h2>
      <div className="w-full flex justify-end">
        <div
          className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <span className="text-white">Create Custom Attribute</span>
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
            <h5 className="text-[30px] font-Poppins text-center">Create Custom Attribute</h5>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="pb-2">
                  Field Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fieldCode}
                  className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setFieldCode(e.target.value)}
                  placeholder="Enter custom attribute code..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">
                  Field Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fieldName}
                  className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setFieldName(e.target.value)}
                  placeholder="Enter field name..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">
                  Input Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={inputType}
                  className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setInputType(e.target.value)}
                  placeholder="Enter input type..."
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
        rowData={customAttributes}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={20}
      />
    </div>
  );
};

export default CustomAttributeList;
