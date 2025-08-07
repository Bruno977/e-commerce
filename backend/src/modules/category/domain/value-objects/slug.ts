import { left } from 'src/lib/common/either/either';

export class Slug {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }
  getValue(): string {
    return this.value;
  }

  static fromTitle(title: string): Slug {
    const normalized = this.normalize(title);
    this.validate(normalized);
    return new Slug(normalized);
  }
  private static validate(value: string) {
    if (!value || value.trim() === '') {
      return left(new Error('Slug cannot be empty.'));
    }

    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(value)) {
      return left(
        new Error(
          'Invalid slug format. Slug must contain only lowercase letters, numbers, and hyphens.',
        ),
      );
    }
  }

  private static normalize(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
