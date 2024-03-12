import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const InvoiceEditModal = ({ invoiceId, isOpen, onRequestClose }) => {

  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    if (isOpen && invoiceId) {
      const url = `/api/invoices/${invoiceId}`;
      console.log("Fetching invoice from:", url); 
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setInvoice(data);
        })
        .catch((error) => console.error("Failed to load invoice", error));
    }
  }, [isOpen, invoiceId]);

  const handleSave = async () => {
    const body = {
      invoiceDate: invoice.invoiceDate,
      invoiceNumber: invoice.invoiceNumber,
      totalAmount: invoice.totalAmount,
      isPaid: invoice.isPaid,
    };

    try {
      const response = await fetch(`/api/invoices/${invoiceId}`, {
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
      console.log("Invoice updated:", data);
      onRequestClose();
    } catch (error) {
      console.error("Failed to update invoice", error);
    }
  };

  if (!invoice) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="flex items-center justify-center min-h-screen outline-none overflow-x-hidden overflow-y-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full p-5">
        <h2 className="text-xl font-semibold mb-4">Edit Invoice</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Invoice Number:</label>
            <input
              type="text"
              value={invoice.invoiceNumber}
              onChange={(e) =>
                setInvoice({ ...invoice, invoiceNumber: e.target.value })
              }
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Invoice Date:</label>
            <input
              type="text"
              value={invoice.invoiceDate}
              onChange={(e) =>
                setInvoice({ ...invoice, invoiceDate: e.target.value })
              }
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">
              Invoice Total Amount:
            </label>
            <input
              type="text"
              value={invoice.totalAmount}
              onChange={(e) =>
                setInvoice({ ...invoice, totalAmount: e.target.value })
              }
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Invoice Status:</label>
            <input
              type="text"
              value={invoice.isPaid}
              onChange={(e) =>
                setInvoice({ ...invoice, isPaid: e.target.value })
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

export default InvoiceEditModal;
