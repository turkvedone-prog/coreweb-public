/**
 * Updates the document title and meta tags for SEO dynamically.
 * Overwrites or removes existing tags to prevent stale tags from persisting during route transitions.
 */
export function updateSEOMeta({ title, description, image, companyName = 'CoreWeb' }) {
  const finalTitle = title ? `${title} | ${companyName}` : companyName;
  document.title = finalTitle;

  const updateTag = (name, content, attr = 'name') => {
    if (!content) {
      const existing = document.querySelector(`meta[${attr}="${name}"]`);
      if (existing) {
        existing.remove();
      }
      return;
    }
    
    let tag = document.querySelector(`meta[${attr}="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attr, name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  updateTag('description', description);
  updateTag('og:title', finalTitle, 'property');
  updateTag('og:description', description, 'property');
  updateTag('og:image', image, 'property');
}
