import React, { useState, useEffect } from "react";
import ItemEditModal from "./ItemEditModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import AddNewItemModal from "./AddNewItemModal";

const ItemsTable = () => {
  const [items, setItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  const handleEdit = (itemId) => {
    setEditItemId(itemId);
    setIsModalOpen(true);
  };

  const handleDelete = (itemId) => {
    setDeleteItemId(itemId);
    setIsDeleteModalOpen(true); 
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add New Item
      </button>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
              <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                <td className="py-4 px-6">{item.name}</td>
                <td className="py-4 px-6">{item.code}</td>
                <td className="py-4 px-6">{item.description}</td>
                <td className="py-4 px-6">{item.price}</td>
                <td className="py-4 px-6 flex justify-start space-x-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-sm bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
            onAfterOpen={() => console.log("Modal is now open")}
          />
        )}
        {deleteItemId && (
          <DeleteConfirmModal
            itemId={deleteItemId}
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setDeleteItemId(null);
            }}
          />
        )}

        <AddNewItemModal
          isOpen={isAddModalOpen}
          onRequestClose={() => setIsAddModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default ItemsTable;
