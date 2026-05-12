import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './modules/upload/upload.module';
import { ClassificationModule } from './modules/classification/classification.module';
import { PrismaService } from './common/prisma/prisma.service';

@Module({
  imports: [UploadModule, ClassificationModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService]
})
export class AppModule {}
