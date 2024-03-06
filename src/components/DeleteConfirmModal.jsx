import React from 'react';

const DeleteConfirmModal = ({ itemId, onClose }) => {
  const handleDelete = () => {
    fetch(`http://sad1.ivaelektronik.com:8081/api/Items/${itemId}`, { method: 'DELETE' })
      .then(() => {
        console.log(`Item ${itemId} deleted`);
        onClose(); // Refresh items list or close modal
      })
      .catch(console.error);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full" onClick={onClose}>
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Item</h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">Are you sure you want to delete this item? This action cannot be undone.</p>
          </div>
          <div className="items-center px-4 py-3">
            <button id="delete-button" className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" onClick={handleDelete}>Delete</button>
            <button id="cancel-button" className="mt-3 px-4 py-2 bg-white text-gray-700 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
