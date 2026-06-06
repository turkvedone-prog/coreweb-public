function getSharedFields(doc) {
  if (!doc) return {};
  return {
    id: doc.id,
    createdAt: doc.createdAt,
    order: doc.order,
    coverImageUrl: doc.coverImageUrl || doc.imageUrl || '',
    coverImagePath: doc.coverImagePath || doc.imagePath || '',
    category: doc.category || '',
    tags: doc.tags || '',
    status: doc.status || '',
    price: doc.price || null,
    showOnHomepage: doc.showOnHomepage || false,
    isFeatured: doc.isFeatured || false,
    defaultLanguage: doc.defaultLanguage || 'tr',
    enabledLanguages: doc.enabledLanguages || ['tr']
  };
}

export function getLocalizedContent(doc, activeLang) {
  if (!doc) return null;
  const defaultLang = doc.defaultLanguage || 'tr';
  const translations = doc.translations || {};
  const translationStatus = doc.translationStatus || {};

  // 1. Try to read active language translation if it exists and is ready
  if (translations[activeLang] && (translationStatus[activeLang] === 'ready' || !translationStatus[activeLang])) {
    return {
      ...translations[activeLang],
      ...getSharedFields(doc),
      activeLang
    };
  }

  // 2. Fallback to default language
  if (translations[defaultLang]) {
    return {
      ...translations[defaultLang],
      ...getSharedFields(doc),
      isFallback: true,
      fallbackFrom: defaultLang,
      activeLang: defaultLang
    };
  }

  // 3. Last resort: Extract from root fields directly
  return {
    title: doc.title || doc.name || '',
    content: doc.content || doc.description || '',
    summary: doc.summary || '',
    slug: doc.slug || '',
    ...getSharedFields(doc),
    isFallback: true,
    fallbackFrom: 'root',
    activeLang: defaultLang
  };
}
