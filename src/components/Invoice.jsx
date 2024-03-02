import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const InvoiceComponent = () => {
  const data = useStaticQuery(graphql`
    query {
      allCustomer {
        nodes {
          id
          name
          email
        }
      }
    }
  `);

  const customers = data.allCustomer.nodes;

  return (
    <div>
      <h2>Customers</h2>
      <ul>
        {customers.map(customer => (
          <li key={customer.id}>
            <p>Name: {customer.name}</p>
            <p>Email: {customer.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceComponent;
