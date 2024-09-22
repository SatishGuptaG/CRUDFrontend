// BrandList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [columnDefs] = useState([
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Short Description', field: 'shortDescription', sortable: true, filter: true },
    { headerName: 'Description', field: 'description', sortable: true, filter: true },
    { headerName: 'Last Updated', field: 'lastUpdated', sortable: true, filter: true },
    { headerName: 'Last Updated By', field: 'lastUpdatedBy', sortable: true, filter: true },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRendererFramework: (params) => (
        <div className="actions">
          <span onClick={() => handleView(params.data.id)} className="icon">
            <FontAwesomeIcon icon={faEye} />
          </span>
          <span onClick={() => handleEdit(params.data.id)} className="icon">
            <FontAwesomeIcon icon={faPen} />
          </span>
          <span onClick={() => handleDelete(params.data.id)} className="icon">
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </div>
      ),
    }
  ]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('https://localhost:7059/api/Brand?currentPage=1&pageSize=40');
        if (response.data && response.data.result) {
          setBrands(response.data.result);
        }
        setLoading(false);
      } catch (err) {
        setError('Error fetching brand data');
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  const handleView = (id) => {
    alert(`View details for ID: ${id}`);
  };

  const handleEdit = (id) => {
    alert(`Edit brand with ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete brand with ID: ${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <h2>Brand List</h2>
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
