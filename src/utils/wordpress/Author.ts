export interface Author {
  id: number
  name: string
  url: string
  description: string
  link: string
  slug: string
  avatar_urls?: {
    24?: string | undefined
    48?: string | undefined
    96?: string | undefined
  } | undefined
  _links: {
    self: { href: string }[]
    collection: { href: string }[]
  }
}
