import React, { useState } from "react";
import Modal from "react-modal";

const AddNewItemModal = ({ isOpen, onRequestClose }) => {
  const [item, setItem] = useState({
    name: "",
    code: "",
    price: 0,
    description: "",
    itemType: 0,
    vatRate: 0,
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    sku: "",
    barcode: "",
    manufacturer: "",
    brand: "",
    model: "",
    color: "",
    size: "",
    material: "",
    countryOfOrigin: "",
    warranty: "",
    supplier: "",
    uom: "",
  });

  const validateItem = () => {
    // Add more validation as necessary
    if (item.price <= 0) {
      alert("Price must be greater than 0.");
      return false;
    }
    if (item.vatRate <= 0) {
      alert("VatRate must be greater than 0.");
      return false;
    }
    if (item.itemType <= 0) {
      alert("ItemType must be greater than 0.");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateItem()) {
      // Validation failed
      return;
    }

    console.log("Sending request to API with body:", JSON.stringify(item));

    const response = await fetch("/api/items", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      console.error(`Failed to create item, status: ${response.status}`);
      return;
    }

    onRequestClose(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: name === 'price' || name === 'vatRate' || name === 'itemType' ? parseInt(value, 10) : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onRequestClose(false)}
      className="m-4 md:m-auto md:max-w-4xl outline-none overflow-x-hidden"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 overflow-y-auto"
    >
      <div className="bg-white rounded-lg shadow-xl p-5">
        <h2 className="text-2xl font-semibold mb-4">Add New Item</h2>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          {Object.keys(item).map((key) => (
            <div key={key} className="flex flex-col">
              <label htmlFor={key} className="mb-2 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                id={key}
                className="px-3 py-2 border border-gray-300 rounded"
                name={key}
                placeholder={key[0].toUpperCase() + key.slice(1)} // Capitalize placeholder
                value={item[key]}
                onChange={handleChange}
                type={typeof item[key] === "number" || key === 'price' || key === 'vatRate' || key === 'itemType' ? "number" : "text"}
              />
            </div>
          ))}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 flex justify-end space-x-2">
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
