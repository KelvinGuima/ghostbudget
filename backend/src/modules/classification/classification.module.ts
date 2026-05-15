import { Module } from '@nestjs/common';
import { ClassificationService } from './classification.service';
import { CacheService } from './cache/cache.service';
import { OllamaService } from './ollama/ollama.service';
import { PrismaModule } from 'common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ClassificationService, CacheService, OllamaService],
  exports: [ClassificationService, CacheService, OllamaService]
})
export class ClassificationModule {}
