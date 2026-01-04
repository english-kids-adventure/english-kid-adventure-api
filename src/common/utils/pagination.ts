import { Request } from 'express';

const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 100;

export interface PaginationParams {
  page: number;
  perPage: number;
  limit: number;
  offset: number;
}

export function getPaginationParameters(req: Request): PaginationParams {
  let page = parseInt(req.query.page as string, 10) || 1;
  let perPage = parseInt(req.query.perPage as string, 10) || DEFAULT_PAGE_SIZE;

  if (page < 1) page = 1;

  if (perPage < 1) perPage = 1;
  if (perPage > MAX_PAGE_SIZE) perPage = MAX_PAGE_SIZE;

  const limit = perPage;
  const offset = (page - 1) * perPage;

  return {
    page,
    perPage,
    limit,
    offset,
  };
}
