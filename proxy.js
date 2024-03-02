const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Define API proxy routes
app.use('/api', createProxyMiddleware({
  target: 'http://sad1.ivaelektronik.com:8081',
  changeOrigin: true,
}));

// Start the proxy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
