import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './modules/upload/upload.module';
import { ClassificationModule } from './modules/classification/classification.module';

@Module({
  imports: [UploadModule, ClassificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
