import React, { useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { useSite } from '../layouts/SiteLayout';
import { submitSubscriber } from '../services/apiService';
import { loadRecaptchaScript, executeRecaptcha } from '../utils/recaptcha';

export default function Footer() {
  const { tenantMapping, activeLang, settings, navigation } = useSite();
  const [logoError, setLogoError] = React.useState(false);

  // Load reCAPTCHA script in production
  useEffect(() => {
    if (!import.meta.env.DEV) {
      const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
      if (siteKey) {
        loadRecaptchaScript(siteKey);
      }
    }
  }, []);
  
  // Newsletter subscription states
  const [subEmail, setSubEmail] = React.useState('');
  const [subConsentAccepted, setSubConsentAccepted] = React.useState(false);
  const [subHoneypot, setSubHoneypot] = React.useState('');
  const [subLoading, setSubLoading] = React.useState(false);
  const [subSuccessMessage, setSubSuccessMessage] = React.useState('');
  const [subError, setSubError] = React.useState(null);
  
  // Dev widget local testing states
  const [subMockToken, setSubMockToken] = React.useState(import.meta.env.DEV ? 'mock-pass' : '');
  const [subTripHoneypot, setSubTripHoneypot] = React.useState(false);
  const [subDevOpen, setSubDevOpen] = React.useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubError(null);
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!subEmail.trim() || !emailRegex.test(subEmail.trim())) {
      setSubError(translate('Geçersiz e-posta formatı.', 'Invalid email format.'));
      return;
    }
    
    if (!subConsentAccepted) {
      setSubError(translate('Ziyaretçi onay metni kabul edilmelidir.', 'Consent agreement must be accepted.'));
      return;
    }
    
    setSubLoading(true);
    
    let finalRecaptchaToken = '';
    if (import.meta.env.DEV) {
      finalRecaptchaToken = subMockToken;
    } else {
      const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
      if (siteKey) {
        try {
          finalRecaptchaToken = await executeRecaptcha(siteKey, 'submit_subscriber');
        } catch (recaptchaErr) {
          console.error('reCAPTCHA execution error:', recaptchaErr);
          setSubError(translate(
            'Güvenlik doğrulaması (reCAPTCHA) başlatılamadı. Lütfen sayfayı yenileyip tekrar deneyin.',
            'Security verification (reCAPTCHA) could not be initialized. Please refresh the page and try again.'
          ));
          setSubLoading(false);
          return;
        }
      }
    }
    
    const payload = {
      tenantSlug: tenantMapping?.tenantSlug || '',
      email: subEmail,
      consentAccepted: subConsentAccepted,
      website_dummy: subTripHoneypot ? 'bot-spam-value' : subHoneypot,
      recaptchaToken: finalRecaptchaToken
    };
    
    try {
      const res = await submitSubscriber(payload);
      setSubEmail('');
      setSubConsentAccepted(false);
      setSubHoneypot('');
      
      if (res.alreadyExists) {
        setSubSuccessMessage(translate(
          'Bu e-posta adresi zaten bülten listemizde kayıtlı.',
          'This email address is already registered in our newsletter list.'
        ));
      } else {
        setSubSuccessMessage(translate(
          'Bülten aboneliğiniz başarıyla oluşturuldu.',
          'Your newsletter subscription has been successfully created.'
        ));
      }
    } catch (err) {
      console.error('Subscription failed:', err);
      const errMsg = err.message || '';
      if (errMsg.includes('429') || errMsg.toLowerCase().includes('rate limit')) {
        setSubError(translate(
          'Çok fazla istek gönderdiniz. Lütfen bir süre bekleyip tekrar deneyin.',
          'Too many requests. Please wait a while and try again.'
        ));
      } else if (errMsg.includes('reCAPTCHA') || errMsg.toLowerCase().includes('recaptcha')) {
        setSubError(translate(
          'Güvenlik doğrulaması (reCAPTCHA) başarısız oldu. Lütfen tekrar deneyin.',
          'Security verification (reCAPTCHA) failed. Please try again.'
        ));
      } else if (errMsg.toLowerCase().includes('website_dummy') || errMsg.toLowerCase().includes('honeypot')) {
        setSubError(translate(
          'İstek spam filtresine takıldı.',
          'Request caught in spam filter.'
        ));
      } else if (errMsg.toLowerCase().includes('bağlantı') || errMsg.toLowerCase().includes('fetch') || errMsg.toLowerCase().includes('connect')) {
        setSubError(translate(
          'Bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.',
          'Connection error occurred. Please check your internet connection and try again.'
        ));
      } else {
        setSubError(translate(
          'Bülten kaydı gerçekleştirilemedi. Lütfen tekrar deneyin.',
          'Newsletter registration failed. Please try again.'
        ));
      }
    } finally {
      setSubLoading(false);
    }
  };
  
  const activeFooterNav = navigation?.find(
    (nav) => nav.location === 'footer' && nav.lang === activeLang
  );
  const menuItems = activeFooterNav?.items || [];

  const companyName = settings?.companyName || tenantMapping?.tenantSlug || 'CoreWeb';
  const logoUrl = settings?.logos?.footer || settings?.logos?.header || '';
  const contact = settings?.contact || {};
  const socials = settings?.socials || {};
  const workingHours = settings?.workingHours || {};

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.vercel.app');

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
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
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Newsletter Section */}
        <div className="border-b border-slate-800 pb-10 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-md">
              <h3 className="text-lg font-bold text-white mb-2">
                {translate('Bültenimize Abone Olun', 'Subscribe to Our Newsletter')}
              </h3>
              <p className="text-sm text-slate-400">
                {translate(
                  'En güncel haberler ve fırsatlardan ilk siz haberdar olun.',
                  'Be the first to know about the latest news and offers.'
                )}
              </p>
            </div>
            
            <div className="flex-grow max-w-xl w-full">
              {subSuccessMessage ? (
                <div className="form-alert form-alert-success py-3 px-4 flex items-center gap-2 animate-in fade-in duration-300">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <span className="text-sm font-medium">{subSuccessMessage}</span>
                  <button 
                    onClick={() => setSubSuccessMessage('')} 
                    className="ml-auto text-xs font-bold text-green-700 hover:text-green-900 underline bg-transparent border-none cursor-pointer"
                  >
                    {translate('Tekrarla', 'Reset')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3" noValidate>
                  {subError && (
                    <div className="form-alert form-alert-error py-2 px-3 flex items-center gap-2 text-xs">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{subError}</span>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={subEmail}
                      onChange={(e) => setSubEmail(e.target.value)}
                      placeholder={translate('E-posta adresiniz', 'Your email address')}
                      className="form-input bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500 focus:bg-slate-900"
                      disabled={subLoading}
                      required
                    />
                    
                    {/* Honeypot hidden input */}
                    <div className="website-dummy-field">
                      <input 
                        type="text" 
                        name="website_dummy" 
                        value={subHoneypot}
                        onChange={(e) => setSubHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="form-button sm:w-auto shrink-0 py-2.5 px-6 font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200"
                      disabled={subLoading || !subConsentAccepted}
                    >
                      {subLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        translate('Kayıt Ol', 'Subscribe')
                      )}
                    </button>
                  </div>
                  
                  {/* KVKK checkbox */}
                  <div 
                    className="form-checkbox-container mt-2"
                    onClick={() => !subLoading && setSubConsentAccepted(!subConsentAccepted)}
                  >
                    <input
                      type="checkbox"
                      checked={subConsentAccepted}
                      onChange={() => {}}
                      className="form-checkbox bg-slate-800 border-slate-700 checked:bg-indigo-600"
                      disabled={subLoading}
                    />
                    <span className="form-checkbox-label text-slate-400 text-xs">
                      {translate(
                        'Bilgilerimin talebime dönüş yapılması amacıyla CoreWeb altyapısında işlenmesini kabul ediyorum.',
                        'I accept that my information may be processed in the CoreWeb infrastructure in order to reply to my request.'
                      )}
                    </span>
                  </div>
                </form>
              )}

              {/* Dev Only Widget for newsletter */}
              {import.meta.env.DEV && (
                <div className="mt-3">
                  <div className="mock-recaptcha-widget bg-slate-800 border-slate-700 p-2 text-slate-400 text-xs rounded-xl">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setSubDevOpen(!subDevOpen)}>
                      <span className="font-bold flex items-center gap-1">
                        <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />
                        🔧 Bülten Dev Tools
                      </span>
                      <span className="text-[9px] underline text-indigo-400 hover:text-indigo-300">
                        {subDevOpen ? translate('Gizle', 'Hide') : translate('Göster', 'Show')}
                      </span>
                    </div>
                    
                    {subDevOpen && (
                      <div className="mt-2 pt-2 border-t border-slate-700 space-y-2">
                        <div>
                          <span className="text-[10px] text-slate-500 block">reCAPTCHA Token:</span>
                          <div className="flex gap-1.5 mt-1">
                            <button 
                              type="button" 
                              onClick={() => setSubMockToken('mock-pass')}
                              className={`px-2 py-0.5 rounded text-[10px] border ${subMockToken === 'mock-pass' ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-700 border-slate-600 text-slate-300'}`}
                            >
                              Pass
                            </button>
                            <button 
                              type="button" 
                              onClick={() => setSubMockToken('mock-low-score')}
                              className={`px-2 py-0.5 rounded text-[10px] border ${subMockToken === 'mock-low-score' ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-700 border-slate-600 text-slate-300'}`}
                            >
                              Low Score
                            </button>
                            <button 
                              type="button" 
                              onClick={() => setSubMockToken('')}
                              className={`px-2 py-0.5 rounded text-[10px] border ${subMockToken === '' ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-700 border-slate-600 text-slate-300'}`}
                            >
                              Empty
                            </button>
                          </div>
                        </div>
                        <div 
                          className="flex items-center gap-1.5 cursor-pointer text-[10px] text-slate-400"
                          onClick={() => setSubTripHoneypot(!subTripHoneypot)}
                        >
                          <input 
                            type="checkbox" 
                            checked={subTripHoneypot} 
                            onChange={() => {}}
                            className="form-checkbox"
                            style={{ width: '0.85rem', height: '0.85rem', marginTop: 0 }}
                          />
                          <span>Trip Honeypot (bot check)</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Identity */}
          <div className="space-y-4">
            {logoUrl && !logoError ? (
              <img 
                src={logoUrl} 
                alt={companyName} 
                className="h-10 w-auto object-contain max-w-[150px] brightness-200" 
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="text-xl font-bold text-white tracking-tight">{companyName}</span>
            )}
            <p className="text-sm text-slate-400 leading-relaxed mt-4">
              {settings?.footerDescription ? (activeLang === 'tr' ? settings.footerDescription : (settings.footerDescriptionEn || settings.footerDescription)) : translate(
                'Yüksek kaliteli hizmet ve müşteri memnuniyeti vizyonuyla dijital dünyada yanınızdayız.',
                'We are with you in the digital world with our vision of high quality service and customer satisfaction.'
              )}
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              {socials.facebook && (
                <a href={socials.facebook} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  FB
                </a>
              )}
              {socials.instagram && (
                <a href={socials.instagram} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  IG
                </a>
              )}
              {socials.twitter && (
                <a href={socials.twitter} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  X
                </a>
              )}
              {socials.linkedin && (
                <a href={socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  LN
                </a>
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {translate('Navigasyon', 'Navigation')}
            </h3>
            <ul className="space-y-2">
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  <a href={getLocalizedUrl(item.targetUrl)} className="text-sm hover:text-white transition-colors">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {translate('İletişim', 'Contact')}
            </h3>
            <ul className="space-y-3">
              {contact.phone && (
                <li className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-slate-500 shrink-0" />
                  <a href={`tel:${contact.phone}`} className="hover:text-white transition-colors">{contact.phone}</a>
                </li>
              )}
              {contact.email && (
                <li className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-slate-500 shrink-0" />
                  <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">{contact.email}</a>
                </li>
              )}
              {contact.address && (
                <li className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
                  <span>{contact.address}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Working Hours & Corporate Info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {translate('Çalışma Saatleri', 'Working Hours')}
            </h3>
            <ul className="space-y-2 text-sm mb-4">
              {workingHours.weekdays && (
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-500 shrink-0" />
                  <span>{translate('Hafta İçi: ', 'Weekdays: ')}{workingHours.weekdays}</span>
                </li>
              )}
              {workingHours.saturday && (
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-500 shrink-0" />
                  <span>{translate('Cumartesi: ', 'Saturday: ')}{workingHours.saturday}</span>
                </li>
              )}
              {workingHours.sunday && (
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-500 shrink-0" />
                  <span>{translate('Pazar: ', 'Sunday: ')}{workingHours.sunday}</span>
                </li>
              )}
            </ul>

            {/* Tax Details */}
            {(settings?.taxOffice || settings?.taxNumber || settings?.mersisNo) && (
              <div className="border-t border-slate-800 pt-4 text-xs text-slate-500 space-y-1">
                {settings.taxOffice && <div>{translate('Vergi Dairesi: ', 'Tax Office: ')}{settings.taxOffice}</div>}
                {settings.taxNumber && <div>{translate('Vergi No: ', 'Tax No: ')}{settings.taxNumber}</div>}
                {settings.mersisNo && <div>{translate('Mersis No: ', 'Mersis No: ')}{settings.mersisNo}</div>}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} {companyName}. {translate('Tüm Hakları Saklıdır.', 'All Rights Reserved.')}</p>
          <p className="mt-4 md:mt-0">{translate('CoreWeb Altyapısıyla Güçlendirilmiştir.', 'Powered by CoreWeb.')}</p>
        </div>
      </div>
    </footer>
  );
}
