import React, { useState } from 'react';
import Modal from 'react-modal';

const CustomerEditModal = ({ isOpen, onRequestClose, refreshCustomers }) => {
  const [customer, setCustomer] = useState({ name: '', email: '' }); // Add more fields as necessary

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = customer.id ? 'PUT' : 'POST';
      const endpoint = customer.id ? `/api/customers/${customer.id}` : '/api/customers';
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });
      if (!response.ok) throw new Error('Failed to save customer');
      onRequestClose();
      refreshCustomers(); // Refresh the customer list on the invoice page
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={() => onRequestClose()}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input name="name" value={customer.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input name="email" value={customer.email} onChange={handleChange} />
        </div>
        <button type="submit">Save Customer</button>
        <button type="button" onClick={() => onRequestClose()}>Cancel</button>
      </form>
    </Modal>
  );
};

export default CustomerEditModal;
