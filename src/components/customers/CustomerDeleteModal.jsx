import React from 'react';
import Modal from 'react-modal';

const CustomerDeleteModal = ({ customerData, isOpen, onRequestClose, onDeleteSuccess }) => {
  console.log("this is the customer for delete:", customerData)
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/customers/${customerData.id}`, {
        method: 'DELETE',
      });
      console.log("This is the response from the request", response)
      
      if (!response.ok) {
        throw new Error('Failed to delete the customer.');
      }
      onDeleteSuccess();
      onRequestClose();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      className="flex items-center justify-center min-h-screen outline-none overflow-x-hidden overflow-y-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full p-5">
        <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this customer?</h3>
        <p className="mb-4">{customerData?.name}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onRequestClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomerDeleteModal;
