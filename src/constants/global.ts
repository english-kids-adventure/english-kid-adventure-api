export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  TOO_MANY_REQUESTS: 429,
};

export const RESPONSE_MESSAGE = {
  SUCCESS: 'Success',
  SERVER_ERROR: 'Internal server error',
  INVALID_REQUEST: 'Invalid request',
  SOMETHING_WENT_WRONG: 'Something went wrong',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
} as const;

export const HEADER = {
  AUTHORIZATION: 'authorization',
} as const;
