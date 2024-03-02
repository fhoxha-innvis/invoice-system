const fetch = require('node-fetch');

exports.createPages = ({ actions }) => {
  const { createPage } = actions;
  createPage({
    path: '/',
    component: require.resolve('./src/pages/index.js'), // Adjust the path if necessary
  });
};

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  try {
    // Fetch data from API endpoint for customers
    const customerResponse = await fetch('http://sad1.ivaelektronik.com:8081/api/Customers');
    const customers = await customerResponse.json();

    // Create Gatsby nodes for customers
    customers.forEach(customer => {
      createNode({
        ...customer,
        id: createNodeId(`customer-${customer.id}`),
        parent: null,
        children: [],
        internal: {
          type: 'Customer',
          content: JSON.stringify(customer),
          contentDigest: createContentDigest(customer),
        },
      });
    });

    // Fetch data from other API endpoints and create nodes similarly
    Example:
    const productResponse = await fetch('http://example.com/api/products');
    const products = await productResponse.json();
    products.forEach(product => {
      createNode({
        ...product,
        id: createNodeId(`product-${product.id}`),
        parent: null,
        children: [],
        internal: {
          type: 'Product',
          content: JSON.stringify(product),
          contentDigest: createContentDigest(product),
        },
      });
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
