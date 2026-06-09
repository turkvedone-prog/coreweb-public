import { Mail, Phone, MapPin, Loader2, Send, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function CapilonContact({
  formData,
  consentAccepted,
  setConsentAccepted,
  loading,
  success,
  error,
  handleSubmit,
  handleChange,
  translate,
  mockToken,
  setMockToken,
  tripHoneypot,
  setTripHoneypot
}) {
  return (
    <main id="main-content">
      {/* 1. Hero Section */}
      <section className="contact-hero">
        <h1>{translate('Bizimle İletişime Geçin', 'Contact Us')}</h1>
        <p>
          {translate(
            'Sorularınız, iş ortaklığı talepleriniz ve diğer tüm merak ettikleriniz için bize ulaşın. Ekibimiz en kısa sürede sizinle bağlantı kuracaktır.',
            'Get in touch with us for your questions, partnership requests and all other inquiries. Our team will contact you as soon as possible.'
          )}
        </p>
      </section>

      {/* 2. Bilgi & Form Grid */}
      <section className="contact-section">
        <div className="contact-container">
          
          {/* Sol Kolon: Bilgiler (Premium Koyu Kart) */}
          <div className="contact-info-cards">
            <div className="contact-info-intro">
              <span className="info-tag">{translate('İLETİŞİM', 'CONTACT')}</span>
              <h2>{translate('Bize Ulaşın', 'Get in Touch')}</h2>
              <p>
                {translate(
                  'Sorularınız, iş ortaklığı talepleriniz ve diğer tüm merak ettikleriniz için bize ulaşın.',
                  'Get in touch with us for your questions, partnership requests, and other inquiries.'
                )}
              </p>
            </div>

            <div className="contact-info-list">
              {/* Item 1: Adres */}
              <div className="contact-info-item">
                <div className="info-item-icon">
                  <MapPin size={20} />
                </div>
                <div className="info-item-text">
                  <h4>{translate('Merkez Showroom & Fabrika', 'Headquarters Showroom & Factory')}</h4>
                  <p>Balıkhisar Mah. Yıldırım Beyazıt Cad. No 94, Akyurt / Ankara</p>
                </div>
              </div>

              {/* Item 2: Telefon */}
              <div className="contact-info-item">
                <div className="info-item-icon">
                  <Phone size={20} />
                </div>
                <div className="info-item-text">
                  <h4>{translate('Telefon Numarası', 'Phone Number')}</h4>
                  <p>
                    <strong>{translate('Müşteri İlişkileri & Fabrika:', 'Customer Relations & Factory:')}</strong>{' '}
                    <a href="tel:+903123790333">0312 379 03 33</a>
                  </p>
                </div>
              </div>

              {/* Item 3: E-posta */}
              <div className="contact-info-item">
                <div className="info-item-icon">
                  <Mail size={20} />
                </div>
                <div className="info-item-text">
                  <h4>{translate('E-posta Adresleri', 'Email Addresses')}</h4>
                  <p>
                    <strong>{translate('Genel İletişim:', 'General Info:')}</strong>{' '}
                    <a href="mailto:info@capilonmobilya.com">info@capilonmobilya.com</a>
                  </p>
                  <p>
                    <strong>{translate('Kurumsal İletişim:', 'Corporate:')}</strong>{' '}
                    <a href="mailto:kurumsal@capilonmobilya.com">kurumsal@capilonmobilya.com</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-info-footer">
              <h4>{translate('Sosyal Medyada Biz', 'Follow Us')}</h4>
              <div className="info-socials">
                <a href="#" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Form (Premium Beyaz Kart) */}
          <div className="contact-form-wrapper">
            <h2>{translate('Mesaj Gönderin', 'Send a Message')}</h2>
            <p>{translate('Merak ettiğiniz tüm konular hakkında aşağıdaki formu doldurarak bizimle iletişime geçebilirsiniz.', 'You can fill out the form below to contact us about any topics you are wondering about.')}</p>

            {success ? (
              <div className="contact-success-banner animate-in fade-in duration-300" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '15px', padding: '30px 10px' }}>
                <div style={{ color: '#10b981', padding: '12px', background: '#ecfdf5', borderRadius: '50%' }}>
                  <CheckCircle2 size={40} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1a1a1a' }}>
                  {translate('Tebrikler!', 'Thank You!')}
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#4b5563', margin: 0, lineHeight: 1.6 }}>
                  {translate(
                    'Mesajınız başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğiz.',
                    'Your message has been sent successfully. We will contact you as soon as possible.'
                  )}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                {error && (
                  <div className="contact-error-banner animate-in slide-in-from-top-2 duration-200" style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 20px', background: '#fef2f2', borderLeft: '4px solid #ef4444', borderRadius: '6px', color: '#b91c1c', fontSize: '0.9rem', fontWeight: '500' }}>
                    <AlertCircle size={20} style={{ flexShrink: 0 }} />
                    <span>{error}</span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name">{translate('Ad Soyad *', 'Full Name *')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={translate('Adınızı ve soyadınızı giriniz', 'Enter your full name')}
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">{translate('E-posta Adresi *', 'Email Address *')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={translate('E-posta adresinizi giriniz', 'Enter your email address')}
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">{translate('Telefon Numarası *', 'Phone Number *')}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder={translate('Telefon numaranızı giriniz', 'Enter your phone number')}
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">{translate('Konu *', 'Subject *')}</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder={translate('Mesajınızın konusunu giriniz', 'Enter the subject of your message')}
                    disabled={loading}
                  />
                </div>
                <div className="form-group form-group-full">
                  <label htmlFor="message">{translate('Mesajınız *', 'Your Message *')}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={translate('Lütfen mesajınızı detaylıca yazınız...', 'Please write your message in detail...')}
                    disabled={loading}
                  />
                </div>

                {/* Honeypot field (hidden from real users) */}
                <div style={{ display: 'none' }}>
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

                {/* Dev Mode Tokens Input for Testing */}
                {import.meta.env.DEV && (
                  <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '6px', background: '#f3f4f6', padding: '12px', borderRadius: '8px', border: '1px dashed #d1d5db' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', width: '100%' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#4b5563' }}>[DEV-ONLY CONTROL] Bypass reCAPTCHA:</span>
                      <input
                        type="checkbox"
                        checked={!!mockToken}
                        onChange={(e) => setMockToken(e.target.checked ? 'mock-pass' : '')}
                        style={{ width: '14px', height: '14px', accentColor: '#f38220' }}
                      />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', width: '100%', marginTop: '6px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#4b5563' }}>[DEV-ONLY CONTROL] Trigger Honeypot (Spam):</span>
                      <input
                        type="checkbox"
                        checked={tripHoneypot}
                        onChange={(e) => setTripHoneypot(e.target.checked)}
                        style={{ width: '14px', height: '14px', accentColor: '#f38220' }}
                      />
                    </div>
                  </div>
                )}

                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="kvkk"
                    checked={consentAccepted}
                    onChange={() => !loading && setConsentAccepted(!consentAccepted)}
                    required
                    disabled={loading}
                  />
                  <label htmlFor="kvkk">
                    <a href="#" onClick={(e) => { e.preventDefault(); alert(translate('Aydınlatma Metni görüntüleniyor...', 'Showing disclosure text...')); }}>
                      {translate('KVKK Aydınlatma Metni', 'KVKK Disclosure')}
                    </a>
                    {translate(
                      '\'ni okudum, kişisel verilerimin bu kapsamda işlenmesini kabul ediyorum. *',
                      '\'s terms, I accept my personal data to be processed within this scope. *'
                    )}
                  </label>
                </div>

                <button
                  type="submit"
                  className="contact-submit-btn"
                  disabled={loading || !consentAccepted}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>{translate('GÖNDERİLİYOR...', 'SUBMITTING...')}</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>{translate('MESAJI GÖNDER', 'SEND MESSAGE')}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. Harita Alanı */}
      <section className="contact-map-section">
        <iframe
          src="https://maps.google.com/maps?q=Balıkhisar%20Mah.%20Yıldırım%20Beyazıt%20Cad.%20No%2094%20Akyurt%20Ankara&t=&z=14&ie=UTF8&iwloc=&output=embed"
          allowFullScreen=""
          loading="lazy"
          title="Capilon Mobilya Google Haritası"
          aria-label="Capilon Mobilya Google Haritası"
        ></iframe>
      </section>

      {/* Harita altı 150px beyaz alan */}
      <div style={{ height: '150px', backgroundColor: '#ffffff', width: '100%' }}></div>
    </main>
  );
}
