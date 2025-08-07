import { Slug } from './slug';

describe('Slug', () => {
  it('should create a slug from a title', () => {
    const title = 'My First Product';
    const slug = Slug.fromTitle(title);
    expect(slug.getValue()).toBe('my-first-product');
  });
});
