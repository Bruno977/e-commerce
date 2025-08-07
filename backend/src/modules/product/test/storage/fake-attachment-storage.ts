import { randomUUID } from 'node:crypto';
import {
  AttachmentStorage,
  UploaderProps,
} from '../../application/storage/uploader';

interface Upload {
  fileName: string;
  url: string;
}

export class FakeAttachmentStorage implements AttachmentStorage {
  public uploads: Upload[] = [];
  async upload({ fileName }: UploaderProps) {
    const url = randomUUID();
    const uniqueUrl = `${url}-${fileName}`;
    this.uploads.push({
      fileName,
      url: uniqueUrl,
    });
    return {
      url: uniqueUrl,
    };
  }
  async delete(key: string) {
    const index = this.uploads.findIndex((upload) => upload.url === key);
    if (index !== -1) {
      this.uploads.splice(index, 1);
    }
  }
}
