/**
 * Firestore dokümanından dil bazlı alan çözer.
 * Önce yeni format (translations map), sonra eski format (flat field) dener.
 *
 * @param {Object} item - Firestore dokümanı
 * @param {string} lang - Aktif dil kodu ('tr', 'en')
 * @param {string} field - Alan adı ('title', 'name', 'summary', 'description', 'slug')
 * @returns {string}
 */
export function resolveField(item, lang, field) {
  if (!item) return '';
  
  // 1. Yeni format: translations map
  const trans = item.translations?.[lang];
  if (trans?.[field]) return trans[field];
  
  // 2. Eski format: flat field (title_tr, summary_en)
  const flatKey = `${field}_${lang}`;
  if (item[flatKey]) return item[flatKey];
  
  // 3. Fallback: root field (title, name, summary)
  if (item[field]) return item[field];
  
  // 4. Default dil fallback
  const defaultLang = item.defaultLanguage || 'tr';
  if (lang !== defaultLang) {
    const defaultTrans = item.translations?.[defaultLang];
    if (defaultTrans?.[field]) return defaultTrans[field];
    const defaultFlat = `${field}_${defaultLang}`;
    if (item[defaultFlat]) return item[defaultFlat];
  }
  
  return '';
}
