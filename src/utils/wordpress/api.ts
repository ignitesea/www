import WpApi, { WPRequest } from 'wpapi';
import config from '../../config';

export const wp = new WpApi({
  endpoint: 'https://public-api.wordpress.com',
  username: config.wordpress.username,
  password: config.wordpress.password,
});

export function ns(req: WPRequest): WPRequest {
  return req.namespace(`wp/v2/sites/${config.wordpress.domain}`)
}
