import { Author } from './Author';
import { Term } from './Term';
import { Attachment } from './Attachment';
import { Reply } from './Reply';

export interface Post {
  id: number
  date: string
  date_gmt: string
  guid: {
    rendered: string
  }
  modified: string
  modified_gmt: string
  slug: string
  status: 'published' | 'draft' | 'future' | 'trash'
  type: 'post' | 'page'
  link: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
    protected: boolean
  }
  excerpt: {
    rendered: string
    protected: boolean
  }
  author: number
  featured_media: number
  comment_status: 'open' | 'closed'
  sticky: boolean
  template: string
  format: 'standard'
  meta: {
    jetpack_publicize_message: string
    jetpack_is_tweetstorm: boolean
    [key: string]: string | number | boolean
  }
  categories: number[]
  tags: number[]
  'jetpack-related-posts': {
    id: number
    url: string
    url_meta: {
      [key: string]: string | number | boolean
    }
    title: string
    date: string
    format: boolean
    excerpt: string
    rel: string
    context: string
    img: {
      alt_text: string
      src: string
    }[]
  }[]
  jetpack_featured_media_url: string
  jetpack_publicize_connections: {
    service_name: string
    display_name: string
    id: string
  }[]
  jetpack_shortlink: string
  jetpack_sharing_enabled: boolean
  jetpack_likes_enabled: boolean
  _links: {
    self: { href: string }[]
    collection: { href: string }[]
    about: { href: string }[]
    author: { href: string, embeddable: boolean }[]
    replies: { href: string, embeddable: boolean }[]
    'version-history': { href: string, count: number }[]
    'predecessor-version': { href: string, id: number }[]
    'wp:featuredmedia': { href: string, embeddable: boolean }[]
    'wp:attachment': { href: string }[]
    'wp:term': { href: string, embeddable: boolean, taxonomy: string }[]
    curries: { name: string, href: string, templated: boolean }[]
  }
  _embedded?: {
    author?: Author[] | undefined
    replies?: Reply[] | undefined
    'wp:featuredmedia'?: Attachment[] | undefined
    'wp:term'?: Term[][] | undefined
  } | undefined
}
