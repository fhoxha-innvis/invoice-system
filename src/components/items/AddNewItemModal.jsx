import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#___gatsby");

const AddNewItemModal = ({ isOpen, onRequestClose }) => {

  const [item, setItem] = useState({
    name: "",
    code: "",
    description: "",
    price: ""
  });

  const handleSave = async () => {
    const response = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      
      console.error(`Failed to create item, status: ${response.status}`);
      return;
    }

    onRequestClose(true); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onRequestClose(false)}
      className="m-4 md:m-auto md:max-w-lg outline-none overflow-x-hidden"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 overflow-y-auto"
    >
      <div className="bg-white rounded-lg shadow-xl p-5">
        <h2 className="text-2xl font-semibold mb-4">Add New Item</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            name="name"
            placeholder="Name"
            value={item.name}
            onChange={handleChange}
          />
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            name="code"
            placeholder="Code"
            value={item.code}
            onChange={handleChange}
          />
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded"
            name="description"
            placeholder="Description"
            value={item.description}
            onChange={handleChange}
          />
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            name="price"
            placeholder="Price"
            type="number"
            value={item.price}
            onChange={handleChange}
          />
          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              type="button"
              onClick={() => onRequestClose(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              type="button"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddNewItemModal;
