export interface Filter {
  attachment?: undefined | string
  attachment_id?: undefined | string | number
  author?: undefined | string
  author_name?: undefined | string
  cat?: undefined | string
  calendar?: undefined | string
  category_name?: undefined | string
  comments_popup?: undefined | string
  cpage?: undefined | string
  day?: undefined | string
  error?: undefined | string
  exact?: undefined | string
  feed?: undefined | string
  hour?: undefined | string | number
  m?: undefined | string | number
  minute?: undefined | string | number
  monthnum?: undefined | string
  more?: undefined | string
  name?: undefined | string
  order?: undefined | string
  orderby?: undefined | string
  p?: undefined | string | number
  page_id?: undefined | string | number
  page?: undefined | string
  paged?: undefined | string
  pagename?: undefined | string
  pb?: undefined | string
  post_type?: undefined | string
  posts?: undefined | string
  preview?: undefined | string
  robots?: undefined | string
  s?: undefined | string
  search?: undefined | string
  second?: undefined | string
  sentence?: undefined | string
  static?: undefined | string
  subpost?: undefined | string
  subpost_id?: undefined | string | number
  taxonomy?: undefined | string
  tag?: undefined | string
  tag_id?: undefined | string
  tb?: undefined | string
  term?: undefined | string
  w?: undefined | string
  withcomments?: undefined | string
  withoutcomments?: undefined | string
  year?: undefined | string
  category__in?: undefined | string
  category__not_in?: undefined | string
  category__and?: undefined | string
  comments_per_page?: undefined | string
  offset?: undefined | string
  perm?: undefined | string
  post__in?: undefined | string
  post__not_in?: undefined | string
  post_mime_type?: undefined | string
  post_parent__in?: undefined | string
  tag__and?: undefined | string
  tag__in?: undefined | string
  tag__not_in?: undefined | string
  tag_slug__and?: undefined | string
  tag_slug__in?: undefined | string
  meta_key?: undefined | string
  meta_value?: undefined | string
}

export function prepareFilter(filter: Filter): Filter {
  return (<Array<keyof typeof filter>>Object.keys(filter))
    .filter((k) => filter[k])
    .reduce((accum, k) => ({ ...accum, [k]: filter[k]}), {});
}
