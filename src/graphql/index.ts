export * from './types';
export * from './pageQueries';
import GraphQLClient from './Client';

import { getSdk } from './pageQueries';

export const client = getSdk(GraphQLClient);
