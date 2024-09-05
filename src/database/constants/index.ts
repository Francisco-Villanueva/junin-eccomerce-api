export { CORS } from './cors';
export const SEQUELIZE = 'SEQUELIZE';

// REPOSITORIES
export const USER_REPOSITORY = 'USER_REPOSITORY';
export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';
export const CARTS_REPOSITORY = 'CARTS_REPOSITORY';
export const REVIEWS_REPOSITORY = 'REVIEWS_REPOSITORY';

// ENVIROMENTS
export const DEVELOPMENT = 'development';
export const TEST = 'test';
export const PRODUCTION = 'production';

// ENVIROMENTS TYPES
export type enviromentType =
  | typeof DEVELOPMENT
  | typeof TEST
  | typeof PRODUCTION;
