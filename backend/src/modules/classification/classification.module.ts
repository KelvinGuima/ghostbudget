import { Module } from '@nestjs/common';
import { ClassificationService } from './classification.service';
import { CacheService } from './cache/cache.service';

@Module({
  providers: [ClassificationService, CacheService],
  exports: [ClassificationService, CacheService]
})
export class ClassificationModule {}
