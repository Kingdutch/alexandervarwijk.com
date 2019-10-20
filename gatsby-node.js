/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { createFilePath } = require('gatsby-source-filesystem');

// Modify nodes that are created by plugins.
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    // Add the collection to our node so it can be used in querying.
    const collection = getNode(node.parent).sourceInstanceName;
    createNodeField({
      node,
      name: 'collection',
      value: collection,
    });

    // Add slug information based on the collection.
    const slugPrefix = {
      blog: '/blog',
      pages: '',
    };
    if (slugPrefix[collection] !== undefined) {
      createNodeField({
        name: `slug`,
        node,
        value: `${slugPrefix[collection]}${createFilePath({ node, getNode })}`,
      });
    }
  }
};

exports.createPages = async function({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allPostsConnection: allMarkdownRemark(
        filter: { fields: { collection: { eq: "blog" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  data.allPostsConnection.edges.forEach(edge => {
    const id = edge.node.id;
    const slug = edge.node.fields.slug;
    actions.createPage({
      path: slug,
      component: require.resolve('./src/templates/BlogPost.js'),
      context: { id },
    });
  });
};
