exports.createPages = ({ actions }) => {
  const { createPage } = actions;
  createPage({
    path: '/',
    component: require.resolve('./src/pages/index.js'), // Adjust the path if necessary
  });
};
