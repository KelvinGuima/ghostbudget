import { Module } from '@nestjs/common';
import { ClassificationService } from './classification.service';
import { CacheService } from './cache/cache.service';
import { OllamaService } from './ollama/ollama.service';

@Module({
  providers: [ClassificationService, CacheService, OllamaService],
  exports: [ClassificationService, CacheService, OllamaService]
})
export class ClassificationModule {}
