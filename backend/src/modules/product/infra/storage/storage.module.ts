import { Module } from '@nestjs/common';
import { S3AttachmentStorage } from './s3-attachment-storage';
import { S3Client } from '@aws-sdk/client-s3';
import { AttachmentStorage } from '../../application/storage/uploader';

@Module({
  providers: [
    {
      provide: S3Client,
      useFactory: () => {
        const bucketEndpointUrl = process.env.BUCKET_ENDPOINT_URL;
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

        if (!bucketEndpointUrl || !accessKeyId || !secretAccessKey) {
          throw new Error(
            'Missing required environment variables: BUCKET_ENDPOINT_URL, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY',
          );
        }

        return new S3Client({
          region: 'auto',
          endpoint: bucketEndpointUrl,
          forcePathStyle: true,
          credentials: {
            accessKeyId,
            secretAccessKey,
          },
        });
      },
    },
    {
      provide: AttachmentStorage,
      useClass: S3AttachmentStorage,
    },
  ],

  exports: [AttachmentStorage],
})
export class StorageModule {}
