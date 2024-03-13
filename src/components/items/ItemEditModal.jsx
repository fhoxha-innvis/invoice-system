import React, { useState, useEffect } from "react";
import Modal from "react-modal";


const ItemEditModal = ({ itemId, isOpen, onRequestClose }) => {
  const [item, setItem] = useState({
    name: "",
    code: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (isOpen && itemId) {
      fetch(`/api/items/${itemId}`)
        .then((res) => res.json())
        .then((data) => setItem(data))
        .catch((error) => console.error("Failed to load item", error));
    }
  }, [isOpen, itemId]);

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: "PUT",
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }

      onRequestClose();
    } catch (error) {
      console.error("Failed to update item", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="absolute top-1/2 left-1/2 max-w-xl w-full transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Edit Item</h2>
      <form className="space-y-4">
        {/* Input fields */}
        {[
          { name: 'name', label: 'Item Name', type: 'text' },
          { name: 'code', label: 'Item Code', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'price', label: 'Price', type: 'number' }
        ].map(({ name, label, type }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            {type === 'textarea' ? (
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                name={name}
                value={item[name]}
                onChange={handleChange}
              />
            ) : (
              <input
                type={type}
                name={name}
                value={item[name]}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            )}
          </div>
        ))}
        {/* Action buttons */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onRequestClose}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ItemEditModal;
