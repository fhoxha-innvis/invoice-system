import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const InvoiceEditModal = ({ invoiceId, isOpen, onRequestClose }) => {
    console.log('InvoiceEditModal', invoiceId, isOpen, onRequestClose);
  const [invoice, setInvoice] = useState(null);

  // Ensure Modal.setAppElement is called in the useEffect hook
  useEffect(() => {
    if (isOpen && invoiceId) {
      const url = `/api/invoices/${invoiceId}`;
      console.log("Fetching invoice from:", url); // Log the URL for debugging
      fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log("Invoice data:", data); // Log the data for debugging
          setInvoice(data);
        })
        .catch(error => console.error("Failed to load invoice", error));
    }
  }, [isOpen, invoiceId]);
  


  const handleSave = () => {
    console.log('Saving invoice:', invoice);
    // Placeholder for actual save logic
    onRequestClose();
  };

  if (!invoice) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Edit Invoice</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Example of editing invoice number */}
        <label>
          Invoice Number:
          <input
            type="text"
            value={invoice.invoiceNumber}
            onChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
          />
        </label>
        {/* Add more fields as necessary */}
        <div className="mt-4">
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={onRequestClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

export default InvoiceEditModal;
