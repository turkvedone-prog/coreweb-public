import React from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useSite } from './layouts/SiteLayout';

// Google Maps Iframe parser and domain validator
const extractGoogleMapUrl = (iframeString) => {
  if (!iframeString) return null;
  
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(iframeString, 'text/html');
    const iframe = doc.querySelector('iframe');
    if (iframe) {
      const src = iframe.getAttribute('src');
      if (src) return src;
    }
  } catch (e) {
    console.error("DOMParser error in extractGoogleMapUrl:", e);
  }

  const srcRegex = /src=["'](https?:\/\/[^"']+)["']/i;
  const match = iframeString.match(srcRegex);
  if (match && match[1]) {
    return match[1];
  }

  if (/^https?:\/\//i.test(iframeString.trim())) {
    return iframeString.trim();
  }

  return null;
};

const validateGoogleMapUrl = (urlStr) => {
  try {
    const url = new URL(urlStr);
    const host = url.hostname.toLowerCase();
    const path = url.pathname.toLowerCase();
    
    const isValidDomain = host === 'google.com' || host === 'maps.google.com' || host.endsWith('.google.com');
    const isValidPath = path.startsWith('/maps');
    
    return isValidDomain && isValidPath;
  } catch (e) {
    return false;
  }
};

export default function BurobigContact({
  formData,
  consentAccepted,
  setConsentAccepted,
  loading,
  success,
  error,
  handleSubmit,
  handleChange,
  settings
}) {
  const { activeLang } = useSite();
  const translate = (tr, en, ar) => {
    if (activeLang === 'ar') return ar || en || tr;
    if (activeLang === 'en') return en || tr;
    return tr;
  };

  const address = settings?.contact?.address || "Balıkhisar, Turgut Reis Cd. No: 3, 06750 Akyurt/Ankara";
  const phone = settings?.contact?.phone || settings?.contact?.phone1 || "+90 312 351 07 97";
  const phone2 = settings?.contact?.phone2 || null;
  const email = settings?.contact?.email || settings?.contact?.email1 || "info@burobig.com.tr";
  
  const defaultWorkingHours = translate(
    "Hafta İçi: 08:00 - 18:30\nCumartesi: Kapalı\nPazar: Kapalı",
    "Weekdays: 08:00 - 18:30\nSaturday: Closed\nSunday: Closed",
    "أيام العمل: 08:00 - 18:30\nالسبت: مغلق\nالأحد: مغلق"
  );
  const rawWorkingHours = settings?.contact?.workingHours || settings?.workingHours || defaultWorkingHours;
  const workingHoursLines = typeof rawWorkingHours === 'string' ? rawWorkingHours.split('\n') : [];

  const customMapIframe = settings?.contact?.mapsIframe;
  const extractedMapUrl = extractGoogleMapUrl(customMapIframe);
  const isMapValid = extractedMapUrl && validateGoogleMapUrl(extractedMapUrl);
  const defaultMapUrl = "https://maps.google.com/maps?q=B%C3%BCrobig%20Fabrika,%20Bal%C4%B1khisar,%20Turgut%20Reis%20Cd.%20No:3,%2006750%20Akyurt/Ankara&t=&z=15&ie=UTF8&iwloc=&output=embed";
  const finalMapSrc = isMapValid ? extractedMapUrl : defaultMapUrl;

  return (
    <main id="main-content" className="corporate-page contact-page">
      <div className="corporate-container">
        
        {/* Page Top Indicator */}
        <div className="corporate-top-bar">
          <span className="corporate-top-title">{translate('KURUMSAL / İLETİŞİM', 'CORPORATE / CONTACT', 'الشركة / الاتصال')}</span>
        </div>

        <section className="contact-section">
          <div className="contact-grid">
            
            {/* Left Column: Contact details */}
            <div className="contact-info-column">
              <h1 className="contact-large-title">{translate('İletişim Kurun.', 'Get in Touch.', 'اتصل بنا.')}</h1>
              <p className="contact-sub-text">
                {translate(
                  'Bürobig premium ofis ve yaşam alanları ile ilgili sorularınız, özel projeleriniz veya teklif talepleriniz için ekibimizle dilediğiniz zaman irtibata geçebilirsiniz.',
                  'For questions about Bürobig premium office and living spaces, your special projects, or proposal requests, you can contact our team at any time.',
                  'للأسئلة المتعلقة بمساحات المكاتب والمعيشة المتميزة من بيروبيج، أو مشاريعك الخاصة، أو طلبات العروض، يمكنك الاتصال بفريقنا في أي وقت.'
                )}
              </p>
              
              <div className="contact-details-list">
                {/* Address */}
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="contact-detail-content">
                    <span className="contact-detail-label">{translate('Adres', 'Address', 'العنوان')}</span>
                    <p className="contact-detail-value">{address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="contact-detail-content">
                    <span className="contact-detail-label">{translate('Telefon', 'Phone', 'الهاتف')}</span>
                    <div className="contact-detail-values">
                      <a href={`tel:${phone.replace(/\s+/g, '')}`} className="contact-detail-value">
                        {phone}
                      </a>
                      {phone2 && (
                        <>
                          <span className="contact-detail-separator"> - </span>
                          <a href={`tel:${phone2.replace(/\s+/g, '')}`} className="contact-detail-value">
                            {phone2}
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="contact-detail-content">
                    <span className="contact-detail-label">{translate('E-Posta', 'Email', 'البريد الإلكتروني')}</span>
                    <a href={`mailto:${email}`} className="contact-detail-value">
                      {email}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="contact-detail-content">
                    <span className="contact-detail-label">{translate('Çalışma Saatleri', 'Working Hours', 'ساعات العمل')}</span>
                    <p className="contact-detail-value">
                      {workingHoursLines.length > 0 ? (
                        workingHoursLines.map((line, idx) => (
                          <React.Fragment key={idx}>
                            {line}
                            {idx < workingHoursLines.length - 1 && <br />}
                          </React.Fragment>
                        ))
                      ) : (
                        <>
                          Hafta İçi: 08:00 - 18:30<br />
                          Cumartesi: Kapalı<br />
                          Pazar: Kapalı
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact form */}
            <div className="contact-form-column">
              <div className="contact-form-card">
                {success ? (
                  /* Success View */
                  <div className="form-success-state">
                    <div className="success-icon-wrapper">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h3>{translate('Mesajınız İletildi', 'Your Message Has Been Sent', 'تم إرسال رسالتك')}</h3>
                    <p>
                      {translate(
                        'Talebiniz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz. İlginiz için teşekkür ederiz.',
                        'Your request has been successfully received. We will contact you as soon as possible. Thank you for your interest.',
                        'لقد تم استلام طلبك بنجاح. وسوف نتصل بك في أقرب وقت ممكن. نشكرك على اهتمامك.'
                      )}
                    </p>
                  </div>
                ) : (
                  /* Form View */
                  <>
                    <h2 className="contact-form-title">{translate('İletişim Formu', 'Contact Form', 'نموذج الاتصال')}</h2>
                    
                    <form onSubmit={handleSubmit}>
                      {error && (
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', backgroundColor: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '6px', color: '#991b1b', fontSize: '0.85rem' }}>
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            <span>{error}</span>
                          </div>
                        </div>
                      )}

                      <div className="form-group">
                        <label htmlFor="name" className="form-label">{translate('Ad Soyad *', 'Name & Surname *', 'الاسم واللقب *')}</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="form-input"
                          placeholder={translate('Adınız ve soyadınız', 'Your name and surname', 'اسمك ولقبك')}
                          disabled={loading}
                        />
                      </div>
                      
                      <div className="form-grid">
                        <div className="form-group">
                          <label htmlFor="email" className="form-label">{translate('E-Posta *', 'Email *', 'البريد الإلكتروني *')}</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="ornek@mail.com"
                            disabled={loading}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone" className="form-label">{translate('Telefon *', 'Phone *', 'الهاتف *')}</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="05XXXXXXXXX"
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="subject" className="form-label">{translate('Mesaj Konusu *', 'Message Subject *', 'موضوع الرسالة *')}</label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject || ''}
                          onChange={handleChange}
                          required
                          className="form-input"
                          placeholder={translate('Mesaj konusu', 'Message subject', 'موضوع الرسالة')}
                          disabled={loading}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="message" className="form-label">{translate('Mesajınız *', 'Your Message *', 'رسالتك *')}</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="form-input"
                          rows="5"
                          placeholder={translate('Mesajınızı buraya yazın...', 'Write your message here...', 'اكتب رسالتك هنا...')}
                          disabled={loading}
                        />
                      </div>
                      
                      {/* Honeypot hidden input */}
                      <div style={{ display: 'none' }}>
                        <input
                          type="text"
                          name="website_dummy"
                          value={formData.website_dummy}
                          onChange={handleChange}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      <div
                        className="form-checkbox-container"
                        onClick={() => !loading && setConsentAccepted(!consentAccepted)}
                      >
                        <input
                          type="checkbox"
                          id="kvkk"
                          checked={consentAccepted}
                          onChange={() => {}} // controlled by parent click
                          required
                          className="form-checkbox"
                          disabled={loading}
                        />
                        <label htmlFor="kvkk" className="form-checkbox-label" style={{ cursor: 'pointer' }}>
                          {translate(
                            "Kişisel verilerimin işlenmesine ilişkin KVKK Onay Metni'ni okudum ve kabul ediyorum.",
                            "I have read and agree to the KVKK Consent Text regarding the processing of my personal data.",
                            "لقد قرأت وأوافق على نص موافقة KVKK بشأن معالجة بياناتي الشخصية."
                          )}
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="form-submit-btn"
                        disabled={loading || !consentAccepted}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4.5 w-4.5 animate-spin" />
                            <span>{translate('Gönderiliyor...', 'Sending...', 'جارٍ الإرسال...')}</span>
                          </>
                        ) : (
                          <>
                            <span>{translate('Gönder', 'Send', 'إرسال')}</span>
                            <Send className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* Full Width Edge-to-Edge Map Section */}
      <section className="contact-map-section">
        <iframe
          src={finalMapSrc}
          width="100%"
          height="450"
          style={{ border: 0, display: 'block' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={translate('Bürobig Fabrika Haritası', 'Burobig Factory Map', 'خريطة مصنع بيروبيج')}
        ></iframe>
      </section>
    </main>
  );
}
