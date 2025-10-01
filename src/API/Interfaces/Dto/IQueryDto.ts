export interface IQueryDto {
  /** Zero‑based page index (default 0) */
  page?: number;
  /** Items per page (default 20, max 100) */
  limit?: number;
  /** Field to sort by – the concrete controller will narrow the union */
  sortBy?: string;
  /** Sort direction */
  sortOrder?: "asc" | "desc";
  /** Optional free‑form search term */
  search?: string;
}
