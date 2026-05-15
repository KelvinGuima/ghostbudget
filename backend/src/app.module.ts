import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './modules/upload/upload.module';
import { ClassificationModule } from './modules/classification/classification.module';
import { PrismaService } from './common/prisma/prisma.service';
import { PrismaModule } from 'common/prisma/prisma.module';

@Module({
  imports: [UploadModule, ClassificationModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService]
})
export class AppModule {}
