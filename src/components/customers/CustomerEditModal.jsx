import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const CustomerEditModal = ({ customerId, isOpen, onRequestClose }) => {

  console.log("THIA IS THE CUSTOMER ID", customerId)
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (isOpen && customerId) {
      const url = `/api/customers/${customerId}`; 
      console.log("Fetching customer details from:", url);
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
            setCustomer(data);
        })
        .catch((error) => console.error("Failed to load customer details", error));
    }
}, [isOpen, customerId]);



  const handleSave = async () => {
   const body = {
    name: customer.name
   }
    try {
      const response = await fetch(`/api/customers/${customerId}`, {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(
          `Network response was not ok, status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Customer updated successfully:", data);
      onRequestClose();
    } catch (error) {
      console.error("Failed to update customer", error);
    }
  };

  if (!customer) return null;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="flex items-center justify-center min-h-screen outline-none overflow-x-hidden overflow-y-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full p-5">
        <h2 className="text-xl font-semibold mb-4">Edit Customer</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={customer.name || ""}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          {/* Repeat for other fields */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onRequestClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CustomerEditModal;
