import { Entity } from 'src/lib/common/entities/entity';
import { Id } from 'src/lib/common/entities/id';

export interface AttachmentProps {
  url: string;
  title: string;
}

export class Attachment extends Entity<AttachmentProps> {
  static create(props: AttachmentProps, id?: Id) {
    if (!props.url) {
      throw new Error('Attachment must have a path');
    }
    return new Attachment(props, id);
  }

  get url() {
    return this.props.url;
  }

  get title() {
    return this.props.title;
  }
}
