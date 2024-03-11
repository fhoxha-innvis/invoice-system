import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#___gatsby"); // Adjust this selector based on your app's root element

const ItemEditModal = ({ itemId, isOpen, onRequestClose }) => {
  console.log("itemsEditModal", itemId, isOpen, onRequestClose);
  const [item, setItem] = useState(null);
  

  useEffect(() => {
    if (isOpen && itemId) {
      const url = `/api/items/${itemId}`;
      console.log("Fetching items from:", url); // Log the URL for debugging
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log("items data:", data); // Log the data for debugging
          setItem(data);
        })
        .catch((error) => console.error("Failed to load items", error));
    }
  }, [isOpen, itemId]);

  const handleSave = async () => {

    const body = {
      invoiceDate: invoice.invoiceDate,
      invoiceNumber: invoice.invoiceNumber,
      totalAmount: invoice.totalAmount,
      isPaid: invoice.isPaid,
    }
    console.log("Updating invoice with:", body);
    console.log("Updating invoice with stringifyed:", JSON.stringify(body));
  
    try {
      const response = await fetch(`/api/invoices/${itemId}`, {
        method: "PUT",
        headers: {
          'Accept': '*/*', 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      });
      
  
      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Invoice updated:", data);
      onRequestClose(); // Close the modal after a successful update
    } catch (error) {
      console.error("Failed to update invoice", error);
      // Optionally, inform the user of the failure
    }
  };
  
  
  

  if (!item) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="flex items-center justify-center min-h-screen outline-none overflow-x-hidden overflow-y-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full p-5">
        <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Item Name:</label>
            <input
              type="text"
              value={item.name}
              onChange={(e) =>
                setItem({ ...item, name: e.target.value })
              }
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Item Code:</label>
            <input
              type="text"
              value={item.code}
              onChange={(e) =>
                setItem({ ...item, code: e.target.value })
              }
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">
              Item Description:
            </label>
            <input
              type="text"
              value={item.description}
              onChange={(e) =>
                setItem({ ...item, description: e.target.value })
              }
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">
              Item Price:
            </label>
            <input
              type="text"
              value={item.price}
              onChange={(e) =>
                setItem({ ...item, price: e.target.value })
              }
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
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

export default ItemEditModal;
