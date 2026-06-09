export function getLocalizedContent(doc, activeLang) {
  if (!doc) return null;
  const defaultLang = doc.defaultLanguage || 'tr';
  const translations = doc.translations || {};
  const translationStatus = doc.translationStatus || {};

  // Extract all fields at root level except translations and translationStatus
  const rootFields = { ...doc };
  delete rootFields.translations;
  delete rootFields.translationStatus;

  // 1. Try to read active language translation if it exists and is ready
  if (translations[activeLang] && (translationStatus[activeLang] === 'ready' || !translationStatus[activeLang])) {
    return {
      ...rootFields,
      ...translations[activeLang],
      activeLang
    };
  }

  // 2. Fallback to default language
  if (translations[defaultLang]) {
    return {
      ...rootFields,
      ...translations[defaultLang],
      isFallback: true,
      fallbackFrom: defaultLang,
      activeLang: defaultLang
    };
  }

  // 3. Last resort: Extract from root fields directly
  return {
    ...rootFields,
    title: doc.title || doc.name || '',
    content: doc.content || doc.description || '',
    summary: doc.summary || '',
    slug: doc.slug || '',
    isFallback: true,
    fallbackFrom: 'root',
    activeLang: defaultLang
  };
}

