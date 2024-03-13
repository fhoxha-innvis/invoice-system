import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#___gatsby');

const DeleteConfirmModal = ({ itemId, isOpen, onClose }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/Items/${itemId}`, { 
        method: 'DELETE' 
      });
      if (!response.ok) {
        throw new Error('Failed to delete the item');
      }
      console.log(`Item ${itemId} deleted`);
    } catch (error) {
      console.error(error);
    }
    onClose(true);
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onClose(false)}
      className="m-4 md:m-auto md:max-w-lg outline-none overflow-x-hidden"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 overflow-y-auto"
    >
      <div className="bg-white rounded-lg shadow-xl p-5 text-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Item</h3>
        <p className="text-sm text-gray-500 mt-2">Are you sure you want to delete this item? This action cannot be undone.</p>
        <div className="mt-4">
          <button 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button 
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={() => onClose(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
