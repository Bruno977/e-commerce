import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import {
  AttachmentStorage,
  UploaderProps,
} from '../../application/storage/uploader';
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class S3AttachmentStorage implements AttachmentStorage {
  constructor(private s3Client: S3Client) {}

  async upload({ body, fileName, fileType }: UploaderProps) {
    const uploadId = randomUUID();
    const uniqueFileName = `${uploadId}-${fileName}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: uniqueFileName,
        Body: body,
        ContentType: fileType,
      }),
    );
    return {
      url: uniqueFileName,
    };
  }

  async delete(key: string): Promise<void> {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
      }),
    );
  }
}
