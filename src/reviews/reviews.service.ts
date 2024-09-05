import { Inject, Injectable } from '@nestjs/common';
import { REVIEWS_REPOSITORY } from 'src/database/constants';
import { Review } from './schema/reviews.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @Inject(REVIEWS_REPOSITORY) private readonly reviewsModel: typeof Review,
  ) {}
}
