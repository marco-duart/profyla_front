export type Pagination = {
  page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
};

export type Paged<T> = {
  records: T[];
  pagination: Pagination;
};

export const PAGE_SIZE = 10;
