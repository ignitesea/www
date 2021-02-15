import { ns, wp } from './api';
import { Post } from './Post';
import { PageResult } from './PageResult';
import { Filter, prepareFilter } from './Filter';

const DEFAULT_PER_PAGE = 10;

export interface FetchPostArchiveOptions {
  perPage?: number | undefined
  page?: number | undefined
  author?: string | undefined
  category?: string | undefined
};

export async function fetchPostArchive(opts?: FetchPostArchiveOptions | undefined): Promise<PageResult<Post>> {
  let query = ns(wp.posts())
    .perPage(opts?.perPage || DEFAULT_PER_PAGE)
    .page(Math.max(1, opts?.perPage || 1));

  const filter: Filter = prepareFilter({
    category_name: opts?.category,
    author_name: opts?.author,
  });

  if (Object.keys(filter).length > 0) query = query.filter(filter);

  return <PageResult<Post>> await query;
}
