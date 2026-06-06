import { useState, useEffect } from 'react';
import { useSite } from '../layouts/SiteLayout';
import { submitLead } from '../services/apiService';
import { updateSEOMeta } from '../utils/seo';
import { loadRecaptchaScript, executeRecaptcha } from '../utils/recaptcha';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Info,
  ShieldCheck
} from 'lucide-react';

export default function Contact() {
  const { tenantMapping, activeLang, settings } = useSite();
  const { tenantSlug } = tenantMapping;

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    website_dummy: '' // Honeypot
  });
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  // Dev-only State (reCAPTCHA and Honeypot mock tokens)
  const [mockToken, setMockToken] = useState(import.meta.env.DEV ? 'mock-pass' : '');
  const [tripHoneypot, setTripHoneypot] = useState(false);

  const companyName = settings?.companyName || tenantSlug || 'CoreWeb';
  const contact = settings?.contact || {};
  const workingHours = settings?.workingHours || {};

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  // SEO Update
  useEffect(() => {
    updateSEOMeta({
      title: translate('İletişim', 'Contact Us'),
      description: translate(
        `${companyName} iletişim bilgileri, adres, telefon ve online iletişim formu.`,
        `${companyName} contact information, address, phone number, and online message form.`
      ),
      companyName
    });
  }, [activeLang, companyName]);

  // Load reCAPTCHA script in production
  useEffect(() => {
    if (!import.meta.env.DEV) {
      const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
      if (siteKey) {
        loadRecaptchaScript(siteKey);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Form validation helper
  const validateForm = () => {
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      return translate(
        'İsim en az 2 karakter olmalıdır.',
        'Name must be at least 2 characters long.'
      );
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      return translate(
        'Geçersiz e-posta formatı.',
        'Invalid email format.'
      );
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 5) {
      return translate(
        'Telefon numarası en az 5 karakter olmalıdır.',
        'Phone number must be at least 5 characters long.'
      );
    }

    if (!consentAccepted) {
      return translate(
        'Ziyaretçi onay metni kabul edilmelidir.',
        'Consent agreement must be accepted.'
      );
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Client-side validations
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    let finalRecaptchaToken = '';
    if (import.meta.env.DEV) {
      finalRecaptchaToken = mockToken;
    } else {
      const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
      if (siteKey) {
        try {
          finalRecaptchaToken = await executeRecaptcha(siteKey, 'submit_lead');
        } catch (recaptchaErr) {
          console.error('reCAPTCHA execution error:', recaptchaErr);
          setError(translate(
            'Güvenlik doğrulaması (reCAPTCHA) başlatılamadı. Lütfen sayfayı yenileyip tekrar deneyin.',
            'Security verification (reCAPTCHA) could not be initialized. Please refresh the page and try again.'
          ));
          setLoading(false);
          return;
        }
      }
    }

    // Build the request payload
    const payload = {
      tenantSlug,
      type: 'contact',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      consentAccepted,
      website_dummy: tripHoneypot ? 'spam-bot-bot' : formData.website_dummy,
      recaptchaToken: finalRecaptchaToken
    };

    try {
      await submitLead(payload);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        website_dummy: ''
      });
      setConsentAccepted(false);
    } catch (err) {
      console.error('Submission failed:', err);
      // Map API technical errors to user friendly messages
      const errMsg = err.message || '';
      
      if (errMsg.includes('429') || errMsg.toLowerCase().includes('rate limit') || errMsg.includes('Çok fazla istek')) {
        setError(translate(
          'Çok fazla istek gönderdiniz. Lütfen bir süre bekleyip tekrar deneyin.',
          'Too many requests. Please wait a while and try again.'
        ));
      } else if (errMsg.includes('reCAPTCHA') || errMsg.toLowerCase().includes('recaptcha')) {
        setError(translate(
          'Güvenlik doğrulaması (reCAPTCHA) başarısız oldu. Lütfen tekrar deneyin.',
          'Security verification (reCAPTCHA) failed. Please try again.'
        ));
      } else if (errMsg.includes('Kiracı') || errMsg.toLowerCase().includes('tenant')) {
        setError(translate(
          'Web sitesi kiracı bilgisi doğrulanamadı.',
          'Website tenant information could not be verified.'
        ));
      } else if (errMsg.toLowerCase().includes('website_dummy') || errMsg.toLowerCase().includes('honeypot') || errMsg.includes('Geçersiz istek')) {
        setError(translate(
          'İstek spam filtresine takıldı. Lütfen alanları kontrol edin.',
          'Request caught in spam filter. Please check fields.'
        ));
      } else if (errMsg.toLowerCase().includes('bağlantı') || errMsg.toLowerCase().includes('fetch') || errMsg.toLowerCase().includes('connect')) {
        setError(translate(
          'Bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.',
          'Connection error occurred. Please check your internet connection and try again.'
        ));
      } else {
        setError(translate(
          'Talebiniz iletilirken bir hata oluştu. Lütfen bilgilerinizi kontrol edip tekrar deneyin.',
          'An error occurred while submitting your request. Please check your details and try again.'
        ));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Mail className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            {translate('İletişim', 'Contact Us')}
          </h1>
          <p className="text-lg text-slate-600">
            {translate(
              'Bizimle iletişime geçin. Sorularınızı yanıtlamaktan memnuniyet duyarız.',
              'Get in touch with us. We would be pleased to answer your questions.'
            )}
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{companyName}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {translate(
                    'Size en kısa sürede geri dönüş yapabilmemiz için form üzerinden mesaj gönderebilir veya doğrudan iletişim kanallarımızı kullanabilirsiniz.',
                    'You can send a message through the form or use our direct contact channels so we can get back to you as soon as possible.'
                  )}
                </p>
              </div>

              {/* Direct Info List */}
              <div className="space-y-6">
                {contact.phone && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-slate-100 text-slate-600 rounded-xl">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        {translate('Telefon', 'Phone')}
                      </h4>
                      <a href={`tel:${contact.phone}`} className="text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors">
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                )}

                {contact.email && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-slate-100 text-slate-600 rounded-xl">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        {translate('E-posta', 'Email Address')}
                      </h4>
                      <a href={`mailto:${contact.email}`} className="text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors">
                        {contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {contact.address && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-slate-100 text-slate-600 rounded-xl shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        {translate('Adres', 'Address')}
                      </h4>
                      <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                        {contact.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Working Hours */}
              {(workingHours.weekdays || workingHours.saturday || workingHours.sunday) && (
                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Clock className="h-4 w-4 text-indigo-600" />
                    <span>{translate('Çalışma Saatleri', 'Working Hours')}</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-500">
                    {workingHours.weekdays && (
                      <li className="flex justify-between">
                        <span>{translate('Hafta İçi', 'Weekdays')}</span>
                        <span className="font-semibold text-slate-700">{workingHours.weekdays}</span>
                      </li>
                    )}
                    {workingHours.saturday && (
                      <li className="flex justify-between">
                        <span>{translate('Cumartesi', 'Saturday')}</span>
                        <span className="font-semibold text-slate-700">{workingHours.saturday}</span>
                      </li>
                    )}
                    {workingHours.sunday && (
                      <li className="flex justify-between">
                        <span>{translate('Pazar', 'Sunday')}</span>
                        <span className="font-semibold text-slate-700">{workingHours.sunday}</span>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm relative overflow-hidden">
              
              {/* Success View */}
              {success ? (
                <div className="py-12 px-4 text-center space-y-6 animate-in fade-in duration-300">
                  <div className="inline-block p-4 bg-green-50 text-green-600 rounded-full">
                    <CheckCircle2 className="h-16 w-16" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {translate('Tebrikler!', 'Thank You!')}
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    {translate(
                      'Talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.',
                      'Your request has been received successfully. We will contact you as soon as possible.'
                    )}
                  </p>
                  <div className="pt-4">
                    <button 
                      onClick={() => setSuccess(false)}
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
                    >
                      {translate('Yeni Mesaj Gönder', 'Send Another Message')}
                    </button>
                  </div>
                </div>
              ) : (
                /* Form View */
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    {translate('İletişim Formu', 'Online Contact Form')}
                  </h3>

                  {error && (
                    <div className="form-alert form-alert-error animate-in slide-in-from-top-2 duration-200">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Ad Soyad */}
                  <div className="form-group">
                    <label className="form-label">{translate('Ad Soyad', 'Full Name')} *</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={translate('Adınız ve soyadınız', 'Your full name')}
                      className="form-input"
                      disabled={loading}
                      required
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label className="form-label">{translate('E-posta', 'Email Address')} *</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="örnek@mail.com"
                        className="form-input"
                        disabled={loading}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{translate('Telefon', 'Phone Number')} *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="05XXXXXXXXX"
                        className="form-input"
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>

                  {/* Mesaj */}
                  <div className="form-group">
                    <label className="form-label">{translate('Mesaj', 'Your Message')}</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={translate('Mesajınızı buraya yazın...', 'Write your message here...')}
                      rows={5}
                      className="form-input"
                      style={{ resize: 'vertical' }}
                      maxLength={1000}
                      disabled={loading}
                    />
                    <div className="text-right text-[10px] text-slate-400 mt-1">
                      {formData.message.length} / 1000
                    </div>
                  </div>

                  {/* Honeypot field (hidden from real users) */}
                  <div className="website-dummy-field">
                    <label>If you are a human, do not fill this field.</label>
                    <input 
                      type="text" 
                      name="website_dummy" 
                      value={formData.website_dummy}
                      onChange={handleChange} 
                      tabIndex={-1} 
                      autoComplete="off"
                    />
                  </div>

                  {/* KVKK Checkbox */}
                  <div 
                    className="form-checkbox-container" 
                    onClick={() => !loading && setConsentAccepted(!consentAccepted)}
                  >
                    <input 
                      type="checkbox" 
                      checked={consentAccepted}
                      onChange={() => {}} // Controlled by outer container click
                      className="form-checkbox"
                      disabled={loading}
                    />
                    <span className="form-checkbox-label">
                      {translate(
                        'Bilgilerimin talebime dönüş yapılması amacıyla CoreWeb altyapısında işlenmesini kabul ediyorum.',
                        'I accept that my information may be processed in the CoreWeb infrastructure in order to reply to my request.'
                      )}
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className="form-button"
                    disabled={loading || !consentAccepted}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4.5 w-4.5 animate-spin" />
                        <span>{translate('Gönderiliyor...', 'Submitting...')}</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4.5 w-4.5" />
                        <span>{translate('Gönder', 'Submit Message')}</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>
        </div>

        {/* Local Emulator Developer Widget */}
        {import.meta.env.DEV && (
          <div className="mt-12 max-w-3xl mx-auto animate-in fade-in duration-300">
            <div className="mock-recaptcha-widget">
              <div className="mock-recaptcha-title">
                <span className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="h-4.5 w-4.5 text-indigo-600" />
                  🔧 Local Emulator Test Paneli
                </span>
                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-mono">import.meta.env.DEV</span>
              </div>
              
              <div className="space-y-4 mt-3">
                {/* Token selectors */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                    Mock reCAPTCHA Token Değeri:
                  </label>
                  <div className="mock-recaptcha-options">
                    <button 
                      type="button"
                      onClick={() => setMockToken('mock-pass')}
                      className={`mock-recaptcha-btn ${mockToken === 'mock-pass' ? 'active' : ''}`}
                    >
                      🟢 mock-pass (Başarılı - 0.9 Skor)
                    </button>
                    <button 
                      type="button"
                      onClick={() => setMockToken('mock-low-score')}
                      className={`mock-recaptcha-btn ${mockToken === 'mock-low-score' ? 'active' : ''}`}
                    >
                      🟡 mock-low-score (Engellenir - 0.3 Skor)
                    </button>
                    <button 
                      type="button"
                      onClick={() => setMockToken('')}
                      className={`mock-recaptcha-btn ${mockToken === '' ? 'active' : ''}`}
                    >
                      🔴 Boş/Geçersiz (Engellenir - Hata)
                    </button>
                  </div>
                </div>

                {/* Honeypot test */}
                <div 
                  className="mock-honeypot-checkbox"
                  onClick={() => setTripHoneypot(!tripHoneypot)}
                >
                  <input 
                    type="checkbox" 
                    checked={tripHoneypot}
                    onChange={() => {}}
                    className="form-checkbox"
                    style={{ width: '1rem', height: '1rem', marginTop: 0 }}
                  />
                  <span>
                    🤖 Honeypot Alanını Doldur (Spam Bot Saldırı Testi - 400 Bad Request tetikler)
                  </span>
                </div>

                {/* Information helper */}
                <div className="flex items-start gap-2 text-[10px] text-slate-400 bg-slate-50 p-2 rounded border border-slate-100">
                  <Info className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                  <span>
                    Bu panel <strong>sadece yerel emülatör / development ortamında</strong> görünür. <code>npm run build</code> ile alınan production çıktısında widget kodları React component ağacından bütünüyle temizlenir ve DOM'da yer almaz.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
