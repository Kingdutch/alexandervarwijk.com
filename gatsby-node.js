/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

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
      blog: '/blog/',
      pages: '',
    }
    createNodeField({
      name: `slug`,
      node,
      value: `${slugPrefix[collection]}${createFilePath({ node, getNode})}`,
    })
  }
}
