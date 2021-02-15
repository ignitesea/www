export interface Term {
  id: number
  link: string
  name: string
  slug: string
  taxonomy: string
  _links: {
    self: { href: string }[]
    collection: { href: string }[]
    about: { href: string }[]
    'wp:post_type': { href: string }[]
    curies: { name: string, href: string, templated: boolean}
  }
}
