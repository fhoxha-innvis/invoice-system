import React from 'react';
import Modal from 'react-modal';

const CustomerDeleteModal = ({ customer, isOpen, onRequestClose, onDeleteSuccess }) => {
  const handleDelete = () => {
    // Implement delete logic here
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div>
        <h3>Are you sure you want to delete this customer?</h3>
        <p>{customer.name} - {customer.email}</p>
        <button onClick={onRequestClose}>Cancel</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </Modal>
  );
};

export default CustomerDeleteModal;
