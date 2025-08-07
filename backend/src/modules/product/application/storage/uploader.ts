export interface UploaderProps {
  fileName: string;
  fileType: string;
  body: Buffer;
}

export abstract class AttachmentStorage {
  abstract upload(props: UploaderProps): Promise<{ url: string }>;
  abstract delete(key: string): Promise<void>;
}
