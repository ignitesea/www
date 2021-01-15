import { GraphQLClient } from 'graphql-request';
import config from '../config';

const GRAPHQL_BASE = `https://graphql.contentful.com/content/v1/spaces/${config.contentful.spaceId}`

export default new GraphQLClient(GRAPHQL_BASE, {
  headers: {
    Authorization: `Bearer ${config.contentful.token}`,
  }
});
