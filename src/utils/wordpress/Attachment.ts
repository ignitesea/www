import { Author } from "./Author";
import { Reply } from "./Reply";

export interface Attachment {
  id: number
  date: string
  slug: string
  type: string
  link: string
  title: {
    rendered: string
  }
  author: number
  jetpack_shortlink: string
  jetpack_sharing_enabled: boolean
  jetpack_likes_enabled: boolean
  caption: {
    rendered: string
  }
  alt_text: string
  media_type: string
  mime_type: string & '/' & string
  media_details: {
    width: number
    height: number
    file: string

  }
  source_url: string
  _links: {
    self: { href: string }[]
    collection: { href: string }[]
    about: { href: string }[]
    author: { href: string, embeddable: boolean }[]
    replies: { href: string, embeddable: boolean }[]
  }
  _embed?: {
    author?: Author[] | undefined
    replies?: Reply[] | undefined
  } | undefined
}
