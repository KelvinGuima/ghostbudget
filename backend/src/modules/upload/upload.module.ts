import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { ClassificationService } from 'modules/classification/classification.service';
import { ClassificationModule } from 'modules/classification/classification.module';

@Module({
  imports: [ClassificationModule],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
