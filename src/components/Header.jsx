import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';

export default function Header({ settings, navigation, tenantMapping, activeLang }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.vercel.app');

  const enabledLangs = tenantMapping?.enabledLanguages || ['tr'];

  // Find header navigation for active language
  const activeHeaderNav = navigation?.find(
    (nav) => nav.location === 'header' && nav.lang === activeLang
  );
  const menuItems = activeHeaderNav?.items || [];

  // Get company logo or fallback
  const logoUrl = settings?.logos?.header || settings?.logos?.footer || '';
  const companyName = settings?.companyName || tenantMapping?.tenantSlug || 'CoreWeb Site';

  const handleLangChange = (newLang) => {
    if (newLang === activeLang) return;
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const langIndex = isLocalOrPortal ? 1 : 0;
    pathSegments[langIndex] = newLang;
    navigate('/' + pathSegments.join('/'));
    setLangDropdownOpen(false);
  };

  const getLanguageLabel = (code) => {
    const labels = { tr: 'Türkçe', en: 'English' };
    return labels[code] || code.toUpperCase();
  };

  const getLocalizedUrl = (url) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')) {
      return url;
    }
    if (url.startsWith('/')) {
      let cleanUrl = url;
      if (isLocalOrPortal && tenantMapping?.tenantSlug) {
        const slugPrefix = `/${tenantMapping.tenantSlug}`;
        if (cleanUrl.startsWith(slugPrefix)) {
          cleanUrl = cleanUrl.substring(slugPrefix.length);
        }
      }
      
      const langPrefixTr = '/tr';
      const langPrefixEn = '/en';
      if (cleanUrl.startsWith(langPrefixTr)) {
        cleanUrl = cleanUrl.substring(langPrefixTr.length);
      } else if (cleanUrl.startsWith(langPrefixEn)) {
        cleanUrl = cleanUrl.substring(langPrefixEn.length);
      }
      
      const prefix = isLocalOrPortal ? `/${tenantMapping.tenantSlug}/${activeLang}` : `/${activeLang}`;
      if (cleanUrl === '' || cleanUrl === '/') {
        return prefix;
      }
      return `${prefix}${cleanUrl.startsWith('/') ? '' : '/'}${cleanUrl}`;
    }
    return url;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand Name */}
          <div className="flex items-center">
            <a href={`/${isLocalOrPortal ? tenantMapping.tenantSlug + '/' : ''}${activeLang}`} className="flex items-center gap-3">
              {logoUrl && !logoError ? (
                <img 
                  src={logoUrl} 
                  alt={companyName} 
                  className="h-10 w-auto object-contain max-w-[150px]" 
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  {companyName}
                </span>
              )}
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item, idx) => (
              <a
                key={idx}
                href={getLocalizedUrl(item.targetUrl)}
                className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors duration-200"
              >
                {item.title}
              </a>
            ))}

            {/* Language Picker */}
            {enabledLangs.length > 1 && (
              <div className="relative">
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-indigo-600 text-xs font-semibold bg-slate-50 transition-colors duration-200"
                >
                  <Globe className="h-4.5 w-4.5" />
                  <span>{activeLang.toUpperCase()}</span>
                </button>
                {langDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-36 rounded-xl border border-slate-200/80 bg-white shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {enabledLangs.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => handleLangChange(lang)}
                        className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-slate-50 transition-colors ${
                          lang === activeLang ? 'text-indigo-600 bg-slate-50/50' : 'text-slate-600'
                        }`}
                      >
                        {getLanguageLabel(lang)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Menu & Lang Button */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Mobile Lang Button */}
            {enabledLangs.length > 1 && (
              <button
                onClick={() => handleLangChange(activeLang === 'tr' ? 'en' : 'tr')}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold bg-slate-50"
              >
                {activeLang === 'tr' ? 'EN' : 'TR'}
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/60 bg-white/95 backdrop-blur-lg animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-3">
            {menuItems.map((item, idx) => (
              <a
                key={idx}
                href={getLocalizedUrl(item.targetUrl)}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
