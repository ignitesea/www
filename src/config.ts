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
  }
}
