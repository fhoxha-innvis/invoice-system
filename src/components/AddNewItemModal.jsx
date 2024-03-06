import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#___gatsby");

const AddNewItemModal = ({ isOpen, onRequestClose }) => {
  const [item, setItem] = useState({
    name: "",
    code: "",
    description: "",
    price: "",
  });

  const handleSave = async () => {
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Item created:", data);
      onRequestClose(true); // Argument indicates refresh needed
    } catch (error) {
      console.error("Failed to create item", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onRequestClose(false)}
      className="flex items-center justify-center min-h-screen outline-none overflow-x-hidden overflow-y-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full p-5">
        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
        {/* Form similar to ItemEditModal but for adding new items */}
        {/* The rest of your form goes here, similar structure to ItemEditModal */}
      </div>
    </Modal>
  );
};

export default AddNewItemModal;
