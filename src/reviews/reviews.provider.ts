import { REVIEWS_REPOSITORY } from 'src/database/constants';
import { Review } from './schema/reviews.schema';

export const reviewsProvider = [
  {
    provide: REVIEWS_REPOSITORY,
    useValue: Review,
  },
];
