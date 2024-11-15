import React from "react";
import Modal from "react-modal"; // You may need to install this with `npm install react-modal`

const UpdateStatusModal = ({ isOpen, onClose, currentStatus, onSave }) => {
  const [selectedStatus, setSelectedStatus] = React.useState(currentStatus);

  const handleSave = () => {
    onSave(selectedStatus);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Update Status"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Update Product Status</h2>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full p-2 border border-gray-200 rounded-md mb-4"
        >
          <option value={0}>None</option>
          <option value={1}>Draft</option>
          <option value={2}>Active</option>
          <option value={3}>Pending</option>
        </select>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="py-2 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateStatusModal;
