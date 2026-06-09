import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function BurobigContact({
  formData,
  consentAccepted,
  setConsentAccepted,
  loading,
  success,
  error,
  handleSubmit,
  handleChange
}) {
  return (
    <main id="main-content" className="corporate-page contact-page">
      <div className="corporate-container">
        
        {/* Page Top Indicator */}
        <div className="corporate-top-bar">
          <span className="corporate-top-title">KURUMSAL / İLETİŞİM</span>
        </div>

        <section className="contact-section">
          <div className="contact-grid">
            
            {/* Left Column: Contact details */}
            <div className="contact-info-column">
              <h1 className="contact-large-title">İletişim Kurun.</h1>
              <p className="contact-sub-text">
                Bürobig premium ofis ve yaşam alanları ile ilgili sorularınız, özel projeleriniz veya teklif talepleriniz için ekibimizle dilediğiniz zaman irtibata geçebilirsiniz.
              </p>
              
              <div className="contact-details-list">
                {/* Address */}
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="contact-detail-content">
                    <span className="contact-detail-label">Adres</span>
                    <p className="contact-detail-value">Balıkhisar, Turgut Reis Cd. no 3, 06750 Akyurt/Ankara</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="contact-detail-content">
                    <span className="contact-detail-label">Telefon</span>
                    <div className="contact-detail-values">
                      <a href="tel:+903123510797" className="contact-detail-value">
                        +90 312 351 07 97
                      </a>
                      <span className="contact-detail-separator"> - </span>
                      <a href="tel:+903123510793" className="contact-detail-value">
                        312 351 07 93
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="contact-detail-content">
                    <span className="contact-detail-label">E-Posta</span>
                    <a href="mailto:info@burobig.com.tr" className="contact-detail-value">
                      info@burobig.com.tr
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="contact-detail-content">
                    <span className="contact-detail-label">Çalışma Saatleri</span>
                    <p className="contact-detail-value">
                      Hafta İçi: 09:00 - 18:00<br />
                      Cumartesi: 10:00 - 14:00<br />
                      Pazar: Kapalı
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
                    <h3>Mesajınız İletildi</h3>
                    <p>
                      Talebiniz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz. İlginiz için teşekkür ederiz.
                    </p>
                  </div>
                ) : (
                  /* Form View */
                  <>
                    <h2 className="contact-form-title">İletişim Formu</h2>
                    
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
                        <label htmlFor="name" className="form-label">Ad Soyad *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="form-input"
                          placeholder="Adınız ve soyadınız"
                          disabled={loading}
                        />
                      </div>
                      
                      <div className="form-grid">
                        <div className="form-group">
                          <label htmlFor="email" className="form-label">E-Posta *</label>
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
                          <label htmlFor="phone" className="form-label">Telefon *</label>
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
                        <label htmlFor="subject" className="form-label">Mesaj Konusu *</label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject || ''}
                          onChange={handleChange}
                          required
                          className="form-input"
                          placeholder="Mesaj konusu"
                          disabled={loading}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="message" className="form-label">Mesajınız *</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="form-input"
                          rows="5"
                          placeholder="Mesajınızı buraya yazın..."
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
                          Kişisel verilerimin işlenmesine ilişkin KVKK Onay Metni'ni okudum ve kabul ediyorum.
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
                            <span>Gönderiliyor...</span>
                          </>
                        ) : (
                          <>
                            <span>Gönder</span>
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
          src="https://maps.google.com/maps?q=B%C3%BCrobig%20Fabrika,%20Bal%C4%B1khisar,%20Turgut%20Reis%20Cd.%20No:3,%2006750%20Akyurt/Ankara&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="450"
          style={{ border: 0, display: 'block' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bürobig Fabrika Haritası"
        ></iframe>
      </section>
    </main>
  );
}
