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
      {/* Create modal fro customAttribute */}
      {open && (
      <CreateCustomAttribute setOpen={setOpen}/>
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
