import { useState, useEffect } from 'react';

export default function BurobigCookieConsent({ settings, activeLang }) {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticalConsent, setAnalyticalConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  useEffect(() => {
    // Check if cookie consent is active in tenant settings
    const active = settings?.cookieConsent?.active;
    if (!active) {
      setVisible(false);
      return;
    }

    // Check if user already gave consent
    const consent = localStorage.getItem('burobig-cookie-consent');
    if (!consent) {
      setVisible(true);
    } else {
      try {
        const parsed = JSON.parse(consent);
        setAnalyticalConsent(!!parsed.analytical);
        setMarketingConsent(!!parsed.marketing);
      } catch (e) {
        localStorage.removeItem('burobig-cookie-consent');
        setVisible(true);
      }
    }
  }, [settings]);

  if (!visible) return null;

  const design = settings?.cookieConsent?.design || 'glass_dark';
  const customTitle = settings?.cookieConsent?.title;
  const customText = settings?.cookieConsent?.text;

  // Localizations
  const isTr = activeLang === 'tr';
  const isAr = activeLang === 'ar';
  const title = customTitle || (isAr ? 'إعدادات ملفات تعريف الارتباط' : isTr ? 'Çerez Ayarları' : 'Cookie Settings');
  const text = customText || (isAr
    ? 'نحن نستخدم ملفات تعريف الارتباط لنقدم لك تجربة أفضل ولتحسين خدماتنا.'
    : isTr 
    ? 'Web sitemizde size daha iyi bir deneyim sunmak ve hizmetlerimizi geliştirmek için çerezler kullanıyoruz.' 
    : 'We use cookies to offer you a better experience and improve our services.');
  
  const linkText = isAr ? 'سياسة ملفات تعريف الارتباط.' : isTr ? 'Çerez politikası.' : 'Cookie policy.';
  const linkUrl = isTr ? '/tr/cerez-politikasi' : isAr ? '/ar/cookie-policy' : '/en/cookie-policy';

  const labelNecessary = isAr ? 'ملفات تعريف الارتباط الضرورية / الفنية' : isTr ? 'Zorunlu / Teknik Çerezler' : 'Necessary / Technical Cookies';
  const descNecessary = isAr
    ? 'مطلوبة لوظائف الموقع الأساسية.'
    : isTr 
    ? 'Temel site işlevleri için zorunludur.' 
    : 'Required for basic site functionality.';

  const labelAnalytic = isAr ? 'ملفات تعريف الارتباط التحليلية' : isTr ? 'Analitik Çerezler' : 'Analytical Cookies';
  const descAnalytic = isAr
    ? 'لإحصاءات الزوار وتحليل الأداء.'
    : isTr 
    ? 'Ziyaretçi sayıları ve performans analizi için.' 
    : 'For visitor stats and performance analysis.';

  const labelMarketing = isAr ? 'ملفات تعريف الارتباط للتسويق / الإعلانات' : isTr ? 'Hedef / Reklam Çerezleri' : 'Targeting / Advertising Cookies';
  const descMarketing = isAr
    ? 'لتقديم إعلانات مخصصة.'
    : isTr 
    ? 'Kişiselleştirilmiş reklamlar sunmak amacıyla.' 
    : 'To deliver personalized advertisements.';

  const btnAcceptAll = isAr ? 'قبول الكل' : isTr ? 'Tümünü Kabul Et' : 'Accept All';
  const btnRejectAll = isAr ? 'رفض الكل' : isTr ? 'Tümünü Reddet' : 'Reject All';
  const btnSettings = isAr ? 'الإعدادات' : isTr ? 'Ayarlar' : 'Settings';
  const btnSave = isAr ? 'حفظ التفضيلات' : isTr ? 'Seçimleri Kaydet' : 'Save Preferences';

  const saveConsent = (analytical, marketing) => {
    const payload = {
      acceptedAt: new Date().toISOString(),
      analytical,
      marketing
    };
    localStorage.setItem('burobig-cookie-consent', JSON.stringify(payload));
    setVisible(false);
    
    // Dispatch event so analytics scripts know they can initialize
    window.dispatchEvent(new CustomEvent('burobig-consent-updated', { detail: payload }));
  };

  const handleAcceptAll = () => {
    saveConsent(true, true);
  };

  const handleRejectAll = () => {
    saveConsent(false, false);
  };

  const handleSavePreferences = () => {
    saveConsent(analyticalConsent, marketingConsent);
  };

  // Styles
  const isGlass = design === 'glass_dark';
  
  const bannerStyle = {
    position: 'fixed',
    bottom: '24px',
    left: '24px',
    width: '360px',
    maxWidth: 'calc(100% - 48px)',
    zIndex: 9999,
    padding: '20px',
    borderRadius: '12px',
    boxShadow: isGlass 
      ? '0 12px 30px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.08)'
      : '0 8px 24px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)',
    background: isGlass 
      ? 'rgba(18, 30, 24, 0.94)' // Rich forest dark tone
      : '#ffffff',
    backdropFilter: isGlass ? 'blur(16px)' : 'none',
    border: isGlass ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #eaeaea',
    color: isGlass ? '#ffffff' : '#1a1a1a',
    fontFamily: '"Outfit", sans-serif',
    transition: 'all 0.3s ease-in-out',
  };

  const textStyle = {
    fontSize: '13px',
    lineHeight: '1.5',
    color: isGlass ? 'rgba(255, 255, 255, 0.75)' : '#555555',
    margin: '0 0 14px 0',
  };

  const titleStyle = {
    fontSize: '15px',
    fontWeight: '600',
    margin: '0 0 10px 0',
    color: isGlass ? '#ffffff' : '#0e1e16',
  };

  const commonBtnStyle = {
    padding: '8px 12px',
    fontSize: '11px',
    fontWeight: '600',
    borderRadius: '6px',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    textAlign: 'center',
  };

  const btnAcceptStyle = {
    ...commonBtnStyle,
    background: '#0d3b26', // Forest green
    color: '#ffffff',
    width: '100%',
    marginTop: '6px'
  };

  const btnRejectStyle = {
    ...commonBtnStyle,
    background: isGlass ? 'rgba(255, 255, 255, 0.08)' : '#f5f5f5',
    color: isGlass ? '#ffffff' : '#1a1a1a',
    border: isGlass ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #dddddd',
    flex: '1 1 45%',
  };

  const btnSettingsStyle = {
    ...commonBtnStyle,
    background: 'transparent',
    color: isGlass ? '#a3d8c1' : '#0d3b26',
    border: isGlass ? '1px solid rgba(163, 216, 193, 0.3)' : '1px solid #0d3b26',
    flex: '1 1 45%',
  };

  const detailsContainerStyle = {
    marginTop: '14px',
    paddingTop: '14px',
    borderTop: isGlass ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #eaeaea',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  const checkboxRowStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    padding: '8px',
    borderRadius: '6px',
    background: isGlass ? 'rgba(255, 255, 255, 0.03)' : '#fafafa',
  };

  return (
    <div style={bannerStyle}>
      <h3 style={titleStyle}>{title}</h3>
      <p style={textStyle}>
        {text}{' '}
        <a 
          href={linkUrl} 
          style={{ 
            color: isGlass ? '#a3d8c1' : '#0d3b26', 
            textDecoration: 'underline',
            fontWeight: '600'
          }}
        >
          {linkText}
        </a>
      </p>

      {showDetails && (
        <div style={detailsContainerStyle}>
          {/* Necessary */}
          <div style={checkboxRowStyle}>
            <input 
              type="checkbox" 
              checked 
              disabled 
              style={{ marginTop: '2px', width: '14px', height: '14px', accentColor: '#0d3b26' }}
            />
            <div>
              <strong style={{ display: 'block', fontSize: '12px', color: isGlass ? '#ffffff' : '#1a1a1a' }}>
                {labelNecessary}
              </strong>
              <span style={{ fontSize: '11px', color: isGlass ? 'rgba(255, 255, 255, 0.5)' : '#777777', display: 'block', marginTop: '2px' }}>
                {descNecessary}
              </span>
            </div>
          </div>

          {/* Analytical */}
          <div style={checkboxRowStyle}>
            <input 
              type="checkbox" 
              checked={analyticalConsent} 
              onChange={(e) => setAnalyticalConsent(e.target.checked)}
              style={{ marginTop: '2px', width: '14px', height: '14px', cursor: 'pointer', accentColor: '#0d3b26' }}
            />
            <div style={{ cursor: 'pointer' }} onClick={() => setAnalyticalConsent(!analyticalConsent)}>
              <strong style={{ display: 'block', fontSize: '12px', color: isGlass ? '#ffffff' : '#1a1a1a' }}>
                {labelAnalytic}
              </strong>
              <span style={{ fontSize: '11px', color: isGlass ? 'rgba(255, 255, 255, 0.5)' : '#777777', display: 'block', marginTop: '2px' }}>
                {descAnalytic}
              </span>
            </div>
          </div>

          {/* Marketing */}
          <div style={checkboxRowStyle}>
            <input 
              type="checkbox" 
              checked={marketingConsent} 
              onChange={(e) => setMarketingConsent(e.target.checked)}
              style={{ marginTop: '2px', width: '14px', height: '14px', cursor: 'pointer', accentColor: '#0d3b26' }}
            />
            <div style={{ cursor: 'pointer' }} onClick={() => setMarketingConsent(!marketingConsent)}>
              <strong style={{ display: 'block', fontSize: '12px', color: isGlass ? '#ffffff' : '#1a1a1a' }}>
                {labelMarketing}
              </strong>
              <span style={{ fontSize: '11px', color: isGlass ? 'rgba(255, 255, 255, 0.5)' : '#777777', display: 'block', marginTop: '2px' }}>
                {descMarketing}
              </span>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '14px' }}>
        {!showDetails ? (
          <>
            <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
              <button 
                style={btnSettingsStyle} 
                onClick={() => setShowDetails(true)}
                onMouseOver={(e) => e.currentTarget.style.background = isGlass ? 'rgba(255, 255, 255, 0.04)' : 'rgba(13, 59, 38, 0.04)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                {btnSettings}
              </button>
              <button 
                style={btnRejectStyle} 
                onClick={handleRejectAll}
                onMouseOver={(e) => e.currentTarget.style.opacity = 0.9}
                onMouseOut={(e) => e.currentTarget.style.opacity = 1}
              >
                {btnRejectAll}
              </button>
            </div>
            <button 
              style={btnAcceptStyle} 
              onClick={handleAcceptAll}
              onMouseOver={(e) => e.currentTarget.style.opacity = 0.9}
              onMouseOut={(e) => e.currentTarget.style.opacity = 1}
            >
              {btnAcceptAll}
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '6px' }}>
            <button 
              style={{ ...btnRejectStyle, flex: '1' }} 
              onClick={() => setShowDetails(false)}
            >
              {isAr ? 'رجوع' : isTr ? 'Geri' : 'Back'}
            </button>
            <button 
              style={{ ...btnAcceptStyle, flex: '1', marginTop: '0px' }} 
              onClick={handleSavePreferences}
            >
              {btnSave}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
