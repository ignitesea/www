export interface PageResult<T> extends Array<T> {
  _paging: {
    total: number
    totalPages: number
    next?: PageResult<T> | undefined
    prev?: PageResult<T> | undefined
    links: {
      next?: string | undefined
      prev?: string | undefined
    }
  }
}
