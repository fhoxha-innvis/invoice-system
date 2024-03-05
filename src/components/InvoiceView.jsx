import React, { useState, useEffect } from "react";
import InvoiceEditModal from "./InvoiceEditModal";

const InvoiceView = () => {
  const [invoices, setInvoices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      const response = await fetch("/api/invoices");
      const data = await response.json();
      setInvoices(data);
    };

    fetchInvoices();
  }, []);

  const handleEdit = (invoiceId) => {
    setSelectedInvoiceId(invoiceId);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Invoices</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.invoiceNumber}</td>
                <td>{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
                <td>Customer Name{/* Placeholder for customer name */}</td>
                <td>${invoice.totalAmount.toFixed(2)}</td>
                <td>{invoice.isPaid ? "Paid" : "Unpaid"}</td>
                <td>
                  <button onClick={() => handleEdit(invoice.id)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <InvoiceEditModal
        invoiceId={selectedInvoiceId}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default InvoiceView;
