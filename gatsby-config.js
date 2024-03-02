const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = {
  developMiddleware: app => {
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://localhost:5000', // Proxy server URL
        changeOrigin: true,
      })
    )
  },
  siteMetadata: {
    title: `Invoice System`,
    description: ``,
    author: `@invoice-system.al`,
    siteUrl: `localhost:8000`,
  },
  plugins: [
    "gatsby-plugin-postcss",
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Invoice System`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#FAFAFA`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // Adjust the path to your icon image
      },
    },
  ],
};
