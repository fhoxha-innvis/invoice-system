import React, { useState, useEffect } from "react";
import ItemEditModal from "./ItemEditModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import AddNewItemModal from "./AddNewItemModal";

const ItemsTable = () => {
  const [items, setItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddNewItem = () => {
    setIsAddModalOpen(true);
  };

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  const handleEdit = (invoiceId) => {
    setEditItemId(invoiceId);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <button
        onClick={handleAddNewItem}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add New Item
      </button>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Item Name
              </th>
              <th scope="col" className="py-3 px-6">
                Item Code
              </th>
              <th scope="col" className="py-3 px-6">
                Description
              </th>
              <th scope="col" className="py-3 px-6">
                Unit Price
              </th>
              <th scope="col" className="py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="py-4 px-6">{item.name}</td>
                <td className="py-4 px-6">{item.code}</td>
                <td className="py-4 px-6">{item.description}</td>
                <td className="py-4 px-6">{item.price}</td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteItemId(item.id)}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editItemId && (
          <ItemEditModal
            itemId={editItemId}
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
          />
        )}
        {deleteItemId && (
          <DeleteConfirmModal
            itemId={deleteItemId}
            onClose={() => setDeleteItemId(null)}
          />
        )}
        <AddNewItemModal
          isOpen={isAddModalOpen}
          onRequestClose={(shouldRefresh) => {
            setIsAddModalOpen(false);
            if (shouldRefresh) {
              // Trigger fetch for items here to refresh the list
            }
          }}
        />
      </div>
    </div>
  );
};

export default ItemsTable;
