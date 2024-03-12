import React, { useState } from 'react';
import Modal from 'react-modal';

const CustomerAddModal = ({ isOpen, onRequestClose, refreshCustomers }) => {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
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
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="flex items-center justify-center min-h-screen outline-none overflow-x-hidden overflow-y-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full p-5">
        <h2 className="text-xl font-semibold mb-4">Add Customer</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {Object.keys(customer).map((key) => (
            <div key={key} className="flex flex-col">
              <label className="text-gray-600 font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              <input
                name={key}
                value={customer[key]}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
          ))}
          <div className="col-span-2 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => onRequestClose()}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CustomerAddModal;
