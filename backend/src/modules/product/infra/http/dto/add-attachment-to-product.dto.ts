import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

export class AddAttachmentToProductDTO {
  @IsArray({ message: 'The "attachmentIds" field must be an array of UUIDs.' })
  @IsUUID('4', {
    each: true,
    message: 'Each "attachmentId" must be a valid UUID.',
  })
  @ApiProperty({
    example: '["attachment1","attachment2"]',
    required: true,
  })
  attachmentIds: string[];
}
