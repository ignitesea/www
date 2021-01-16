const { cwd } = require('process');

require('dotenv').config({ path: `.env` });

module.exports = {
  schema: "schema.graphql",
  documents: "src/**/*.gql",
  extensions: {
    endpoints: {
      default: {
        url: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
        headers: {
          Authorization: `Bearer ${process.env.CONTENTFUL_TOKEN}`
        }
      }
    }
  }
}
