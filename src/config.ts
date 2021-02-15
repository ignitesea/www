import { config } from 'dotenv';
import { requireConfig } from './utils';
config();

requireConfig([
  'CONTENTFUL_SPACE_ID',
  'CONTENTFUL_TOKEN',
]);

export default {
  contentful: {
    spaceId: process.env.CONTENTFUL_SPACE_ID!,
    token: process.env.CONTENTFUL_TOKEN!,
  },
  wordpress: {
    domain: process.env.WORDPRESS_DOMAIN,
    username: process.env.WORDPRESS_USERNAME,
    password: process.env.WORDPRESS_PASSWORD,
  },
}
