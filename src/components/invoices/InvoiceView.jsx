import React, { useState, useEffect } from "react";
import InvoiceEditModal from "./InvoiceEditModal";
import CustomerAddModal from "../customers/CustomerAddModal"; 

const InvoiceView = () => {
  const [invoices, setInvoices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false); 

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
  const handleAddCustomer = () => {
    setIsCustomerModalOpen(true); // Open the CustomerAddModal
  };

  const refreshCustomers = () => {
    // Implement functionality to refresh customer data if needed
  };


  return (
    <div className="p-4">
      <button onClick={handleAddCustomer} className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Add New Customer
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Invoice Number
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice, index) => (
              <tr key={invoice.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {invoice.invoiceNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(invoice.invoiceDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.customerId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${invoice.totalAmount.toFixed(2)}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    invoice.isPaid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {invoice.isPaid ? "Paid" : "Unpaid"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(invoice.id)}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit
                  </button>
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
      <CustomerAddModal isOpen={isCustomerModalOpen} onRequestClose={() => setIsCustomerModalOpen(false)} refreshCustomers={refreshCustomers} />
    </div>
  );
};

export default InvoiceView;
