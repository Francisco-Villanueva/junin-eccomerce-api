import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { reviewsProvider } from './reviews.provider';

@Module({
  providers: [ReviewsService, ...reviewsProvider],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
