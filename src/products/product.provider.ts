import { PRODUCT_REPOSITORY } from 'src/database/constants';
import { Product } from './schema/product.schema';

export const productProviders = [
  {
    provide: PRODUCT_REPOSITORY,
    useValue: Product,
  },
];
