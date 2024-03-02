import React, { useState, useEffect } from 'react';

const InvoiceComponent = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch('http://sad1.ivaelektronik.com:8081/api/Invoices');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div>
      <h2>Invoices</h2>
      <ul>
        {invoices.map(invoice => (
          <li key={invoice.id}>
            <p>Invoice ID: {invoice.id}</p>
            {/* Add other invoice details here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceComponent;
