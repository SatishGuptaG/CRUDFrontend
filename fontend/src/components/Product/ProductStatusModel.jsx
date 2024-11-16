import React from 'react'
import { ProductStatus } from '../../enums/ProductStatus'

const ProductStatusModel = ({ editedStatus, handleUpdate, setEditedStatus, setShowModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg max-w-md shadow-xl transform transition-all duration-300 ease-out scale-95 hover:scale-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Change Status</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Status <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full bg-gray-100 border border-gray-300 text-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            value={editedStatus}
            onChange={(e) => setEditedStatus(parseInt(e.target.value))}
          >
            <option value={ProductStatus.Draft}>Draft</option>
            <option value={ProductStatus.Active}>Active</option>
            <option value={ProductStatus.Archived}>Archived</option>
            <option value={ProductStatus.Pending}>Pending</option>
            <option value={ProductStatus.Discontinued}>Discontinued</option>
          </select>
        </div>

        <div className="flex justify-end gap-4 mt-5">
          <button
            className="px-5 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none transition-all"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none transition-all"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductStatusModel
