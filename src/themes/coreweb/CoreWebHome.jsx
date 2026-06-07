import { useState, useEffect } from 'react';
import { submitLead } from '../../services/apiService';
import { loadRecaptchaScript, executeRecaptcha } from '../../utils/recaptcha';
import './coreweb.css';

export default function CoreWebHome() {
  const [menuActive, setMenuActive] = useState(false);
  const [panelTab, setPanelTab] = useState('summary');
  const [solutionsTab, setSolutionsTab] = useState('furniture');

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    website_dummy: '' // Honeypot field
  });
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [statusClass, setStatusClass] = useState('form-message');

  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LdUHg0tAAAAADUPLdrFQSEnyjWs6DbHXtjnROuK';

  // Load document SEO Meta tags on mount
  useEffect(() => {
    document.title = "CoreWeb - Yönetilebilir Kurumsal Web Altyapısı ve Performans Mimarisi";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'CoreWeb; işletmeler için özel tasarımlı, hızlı açılan, SEO uyumlu ve müşteri paneliyle kolayca yönetilebilir kurumsal web siteleri geliştirir.');
  }, []);

  // Preemptively load reCAPTCHA script
  useEffect(() => {
    loadRecaptchaScript(siteKey);
  }, [siteKey]);

  // Scroll Reveal IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const sectionsToReveal = [
      '.problem-card',
      '.solution__content',
      '.solution__visual',
      '.service-card',
      '.panel-section__info',
      '.panel-section__preview',
      '.solutions__tabs-wrapper',
      '.process-card',
      '.package-card',
      '.project-card',
      '.trust-item',
      '.contact__info',
      '.contact__form-box'
    ];

    sectionsToReveal.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.add('js-reveal');
        observer.observe(el);
      });
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg('Gönderiliyor...');
    setStatusClass('form-message');
    setLoading(true);

    try {
      let recaptchaToken = '';
      
      // Attempt to execute recaptcha enterprise
      if (window.grecaptcha && window.grecaptcha.enterprise) {
        recaptchaToken = await window.grecaptcha.enterprise.execute(siteKey, { action: 'submitLead' });
      } else {
        try {
          recaptchaToken = await executeRecaptcha(siteKey, 'submitLead');
        } catch (recaptchaErr) {
          console.warn('Fallback reCAPTCHA execution failed:', recaptchaErr);
        }
      }

      await submitLead({
        tenantSlug: 'coreweb',
        type: 'contact',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        consentAccepted: consentAccepted,
        website_dummy: formData.website_dummy,
        recaptchaToken
      });

      setStatusMsg('Talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.');
      setStatusClass('form-message form-message--success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        website_dummy: ''
      });
      setConsentAccepted(false);
    } catch (err) {
      console.error('Lead submission failed:', err);
      setStatusMsg(err.message || 'Gönderim başarısız oldu. Lütfen tekrar deneyin.');
      setStatusClass('form-message form-message--error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 1. Header (Navigation) */}
      <header className="header">
        <div className="header__container">
          <a href="/" className="header__logo">
            <img src="/logo.png" alt="CoreWeb Logo" className="logo-img" />
          </a>
          <button 
            className="header__toggle" 
            aria-label="Menüyü Aç" 
            aria-expanded={menuActive} 
            id="menu-toggle"
            onClick={() => setMenuActive(!menuActive)}
          >
            <span></span>
            <span></span>
          </button>
          <nav className={`header__nav ${menuActive ? 'header__nav--active' : ''}`} id="header-nav">
            <a href="#services" className="header__link" onClick={() => setMenuActive(false)}>Hizmetler</a>
            <a href="#panel" className="header__link" onClick={() => setMenuActive(false)}>Yönetim Paneli</a>
            <a href="#solutions" className="header__link" onClick={() => setMenuActive(false)}>Sektörel Çözümler</a>
            <a href="#process" className="header__link" onClick={() => setMenuActive(false)}>Süreç</a>
            <a href="#packages" className="header__link" onClick={() => setMenuActive(false)}>Paketler</a>
            <a href="#projects" className="header__link" onClick={() => setMenuActive(false)}>Projeler</a>
            <a href="#contact" className="header__btn" onClick={() => setMenuActive(false)}>Planlayalım</a>
          </nav>
        </div>
      </header>
      
      <main>
        {/* 2. Hero Section */}
        <section className="hero" id="hero">
          <div className="hero__container">
            <h1 className="hero__title">
              Web Sitenizi Sadece Yayına Almayın, <span className="hero__title-accent">Yönetilebilir</span> Bir Dijital Altyapıya Dönüştürün.
            </h1>
            <p className="hero__subtitle">
              CoreWeb; işletmeler için özel tasarımlı, hızlı açılan, SEO uyumlu ve müşteri paneliyle yönetilebilir kurumsal web siteleri geliştirir.
            </p>
            <div className="hero__ctas">
              <a href="#contact" className="btn btn--primary">Projemi Planlayalım</a>
              <a href="#panel" className="btn btn--secondary">CoreWeb Paneli İncele</a>
            </div>
          </div>
          
          <div className="marquee-wrapper" aria-hidden="true">
            <div className="marquee">
              <span className="marquee__item">ÖZEL TASARIM • HAFIF KOD MIMARISI • VERCEL EDGE DISTRIBUTION • MÜŞTERİ PANELİ • GÜVENLİ FORM ALTYAPISI • SPAM KORUMASI • </span>
              <span className="marquee__item">ÖZEL TASARIM • HAFIF KOD MIMARISI • VERCEL EDGE DISTRIBUTION • MÜŞTERİ PANELİ • GÜVENLİ FORM ALTYAPISI • SPAM KORUMASI • </span>
            </div>
          </div>
        </section>

        {/* 3. Problem Section */}
        <section className="problem" id="problem">
          <div className="container">
            <div className="section-header">
              <span className="section-header__tag">Mevcut Durum</span>
              <h2 className="section-header__title">Geleneksel Çözümlerin Sınırları</h2>
            </div>
            <div className="problem__grid">
              <div className="problem-card">
                <h3 className="problem-card__title">Performans ve Hız Sorunları</h3>
                <p className="problem-card__desc">
                  Hazır şablonlarla kurulan birçok web sitesi, zamanla eklenen eklentiler ve kod yığınları nedeniyle ağırlaşır. Bu durum yavaş yükleme sürelerine yol açarak ziyaretçi ve potansiyel müşteri kaybına neden olur.
                </p>
              </div>
              <div className="problem-card">
                <h3 className="problem-card__title">Yönetim ve Güncelleme Zorluğu</h3>
                <p className="problem-card__desc">
                  Karmaşık yönetim panelleri, teknik bilgiye sahip olmayan kullanıcılar için sitenin güncellenmesini zorlaştırır. Basit bir metin veya görsel değişimi bile sürekli dış desteğe bağımlılık yaratır.
                </p>
              </div>
              <div className="problem-card">
                <h3 className="problem-card__title">Şablon ve Uyum Sınırları</h3>
                <p className="problem-card__desc">
                  Hazır şablon yapıları, işletmenizin kendine has kimliğini ve iş süreçlerini yansıtmaktan uzaktır. Zamanla değişen ve büyüyen ihtiyaçlarınıza tam uyum sağlayamaz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Solution Section */}
        <section className="solution" id="solution">
          <div className="container">
            <div className="solution__wrapper">
              <div className="solution__content">
                <span className="section-header__tag section-header__tag--alt">Yeni Yaklaşım</span>
                <h2 className="solution__title">CoreWeb Gücü: İşletmenize Özel Dijital Altyapı</h2>
                <p className="solution__desc">
                  CoreWeb, hazır şablonların ve eklenti bağımlılıklarının sınırlarını ortadan kaldırır. İşletmenizin hedefleri ve sektörel dinamikleri doğrultusunda, tamamen size özel tasarlanmış, hafif ve ölçeklenebilir bir web altyapısı sunar.
                </p>
                <ul className="solution__list">
                  <li className="solution__item">
                    <strong>Tam Uyum:</strong> Marka kimliğinize ve iş akışınıza uygun özel arayüz tasarımı.
                  </li>
                  <li className="solution__item">
                    <strong>Süreklilik:</strong> Eklenti çökmeleri veya sürüm uyuşmazlığı olmadan stabil çalışma.
                  </li>
                  <li className="solution__item">
                    <strong>Özgürlük:</strong> Yalnızca ihtiyacınız olan modüllerle sadeleştirilmiş yönetim paneli.
                  </li>
                </ul>
              </div>
              <div className="solution__visual">
                <div className="speed-meter">
                  <div className="speed-meter__circle">
                    <span className="speed-meter__value">99</span>
                    <span className="speed-meter__label">Performans</span>
                  </div>
                  <p className="speed-meter__desc">Core Web Vitals Standartlarında Hafif Yapı</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Services Section */}
        <section className="services" id="services">
          <div className="container">
            <div className="section-header section-header--center">
              <span className="section-header__tag">Neler Yapıyoruz?</span>
              <h2 className="section-header__title">Mükemmellik Standartlarımız</h2>
            </div>
            <div className="services__grid">
              <article className="service-card">
                <div className="service-card__icon service-card__icon--design"></div>
                <h3 className="service-card__title">Özel Arayüz Tasarımı</h3>
                <p className="service-card__desc">
                  Şablonlardan uzak, tamamen markanıza özel, vektör keskinliğinde ve modern kullanıcı deneyimi (UX) standartlarında arayüz tasarımı.
                </p>
              </article>
              <article className="service-card">
                <div className="service-card__icon service-card__icon--panel"></div>
                <h3 className="service-card__title">CoreWeb Kontrol Paneli</h3>
                <p className="service-card__desc">
                  Web sitenizin içeriklerini, gelen formları ve ayarlarını teknik bilgi gerektirmeden kolayca yönetebileceğiniz size özel yönetim paneli.
                </p>
              </article>
              <article className="service-card">
                <div className="service-card__icon service-card__icon--seo"></div>
                <h3 className="service-card__title">Hafif ve SEO Dostu Kod</h3>
                <p className="service-card__desc">
                  Gereksiz kod blokları barındırmayan hafif mimari. Arama motorları ve yeni nesil YZ arama robotları için optimize edilmiş semantik yapı.
                </p>
              </article>
              <article className="service-card">
                <div className="service-card__icon service-card__icon--hosting"></div>
                <h3 className="service-card__title">Hosting ve Koruyucu Bakım</h3>
                <p className="service-card__desc">
                  Sürekli güncellenen altyapı, güvenli form API entegrasyonu, spam koruması ve yüksek erişilebilirlikli küresel sunucu dağıtımı.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* 6. CoreWeb Panel Tanıtımı */}
        <section className="panel-section" id="panel">
          <div className="container">
            <div className="panel-section__wrapper">
              <div className="panel-section__info">
                <span className="section-header__tag">Kontrol Merkezi</span>
                <h2 className="panel-section__title">Kendi Sitenizin Hakimi Olun</h2>
                <p className="panel-section__desc">
                  CoreWeb panel, karmaşık teknik detayları geride bırakarak web sitenizin tüm kontrolünü size verir. Gereksiz hiçbir menü barındırmaz, sadece sizin yönetmek istediğiniz alanlara odaklanır.
                </p>
                
                <div className="panel-nav" id="panel-nav">
                  <button 
                    className={`panel-nav__btn ${panelTab === 'summary' ? 'panel-nav__btn--active' : ''}`}
                    onClick={() => setPanelTab('summary')}
                  >
                    <h4>Özet Görünüm</h4>
                    <p>Sitenizin anlık genel durumu ve ziyaretçi özetleri.</p>
                  </button>
                  <button 
                    className={`panel-nav__btn ${panelTab === 'leads' ? 'panel-nav__btn--active' : ''}`}
                    onClick={() => setPanelTab('leads')}
                  >
                    <h4>Gelen Formlar</h4>
                    <p>Müşteri talepleri ve iletişim formu bildirimleri.</p>
                  </button>
                  <button 
                    className={`panel-nav__btn ${panelTab === 'security' ? 'panel-nav__btn--active' : ''}`}
                    onClick={() => setPanelTab('security')}
                  >
                    <h4>Spam Koruması</h4>
                    <p>Güvenlik durumu ve spam koruması analitiği.</p>
                  </button>
                </div>
              </div>
              
              <div className="panel-section__preview">
                {/* CSS Mockup Panel Dashboard */}
                <div className="mock-dashboard">
                  <div className="mock-dashboard__header">
                    <div className="mock-dashboard__dots">
                      <span></span><span></span><span></span>
                    </div>
                    <div className="mock-dashboard__title">CoreWeb Panel v1.0</div>
                  </div>
                  <div className="mock-dashboard__body">
                    {/* Tab Content: Summary */}
                    <div className={`mock-tab-content ${panelTab === 'summary' ? 'mock-tab-content--active' : ''}`} id="mock-tab-summary">
                      <div className="mock-stats-grid">
                        <div className="mock-stat-card">
                          <span className="mock-stat-card__label">Erişilebilirlik</span>
                          <span className="mock-stat-card__val">%99.99</span>
                        </div>
                        <div className="mock-stat-card">
                          <span className="mock-stat-card__label">Aktif Formlar</span>
                          <span className="mock-stat-card__val">2 Adet</span>
                        </div>
                      </div>
                      <div className="mock-chart-container">
                        <span className="mock-chart-container__label">Aylık Ziyaretçi Trendi</span>
                        <div className="mock-chart">
                          <div className="mock-chart__bar" style={{ height: '40%' }}></div>
                          <div className="mock-chart__bar" style={{ height: '60%' }}></div>
                          <div className="mock-chart__bar" style={{ height: '85%' }}></div>
                          <div className="mock-chart__bar" style={{ height: '70%' }}></div>
                          <div className="mock-chart__bar" style={{ height: '95%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tab Content: Leads */}
                    <div className={`mock-tab-content ${panelTab === 'leads' ? 'mock-tab-content--active' : ''}`} id="mock-tab-leads">
                      <div className="mock-leads-list">
                        <div className="mock-lead-item">
                          <div className="mock-lead-item__meta">
                            <strong>Ahmet Yılmaz</strong>
                            <span>ahmet@burobig.com</span>
                          </div>
                          <span className="mock-badge">Yeni</span>
                        </div>
                        <div className="mock-lead-item">
                          <div className="mock-lead-item__meta">
                            <strong>Zeynep Kaya</strong>
                            <span>zeynep@klinik.tr</span>
                          </div>
                          <span className="mock-badge mock-badge--gray">Okundu</span>
                        </div>
                        <div className="mock-lead-item">
                          <div className="mock-lead-item__meta">
                            <strong>Can Demir</strong>
                            <span>can@lojistik.com</span>
                          </div>
                          <span className="mock-badge mock-badge--gray">Okundu</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tab Content: Security */}
                    <div className={`mock-tab-content ${panelTab === 'security' ? 'mock-tab-content--active' : ''}`} id="mock-tab-security">
                      <div className="mock-security-status">
                        <div className="mock-security-status__header">
                          <span className="mock-icon-shield">🛡️</span>
                          <div>
                            <strong>Form Güvenliği Aktif</strong>
                            <p>Gelişmiş spam koruması devrede.</p>
                          </div>
                        </div>
                        <div className="mock-security-stat">
                          <span>Engellenen Spam Girişimi</span>
                          <strong>142 Adet</strong>
                        </div>
                        <div className="mock-security-stat">
                          <span>Ortalama Güven Skoru</span>
                          <strong>0.9 / 1.0</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Sektörel Çözümler */}
        <section className="solutions" id="solutions">
          <div className="container">
            <div className="section-header section-header--center">
              <span className="section-header__tag">Sektör Odaklı</span>
              <h2 className="section-header__title">Sektörünüze Özel Mimari Çözümler</h2>
            </div>
            
            <div className="solutions__tabs-wrapper">
              <div className="solutions-tabs" id="solutions-tabs-nav">
                <button 
                  className={`solutions-tabs__btn ${solutionsTab === 'furniture' ? 'solutions-tabs__btn--active' : ''}`}
                  onClick={() => setSolutionsTab('furniture')}
                >
                  Mobilya ve Üretim Firmaları
                </button>
                <button 
                  className={`solutions-tabs__btn ${solutionsTab === 'logistics' ? 'solutions-tabs__btn--active' : ''}`}
                  onClick={() => setSolutionsTab('logistics')}
                >
                  Lojistik ve Nakliye Firmaları
                </button>
                <button 
                  className={`solutions-tabs__btn ${solutionsTab === 'corporate' ? 'solutions-tabs__btn--active' : ''}`}
                  onClick={() => setSolutionsTab('corporate')}
                >
                  Kurumsal Hizmet Şirketleri
                </button>
                <button 
                  className={`solutions-tabs__btn ${solutionsTab === 'health' ? 'solutions-tabs__btn--active' : ''}`}
                  onClick={() => setSolutionsTab('health')}
                >
                  Sağlık ve Klinikler
                </button>
                <button 
                  className={`solutions-tabs__btn ${solutionsTab === 'construction' ? 'solutions-tabs__btn--active' : ''}`}
                  onClick={() => setSolutionsTab('construction')}
                >
                  İnşaat ve Yapı Firmaları
                </button>
                <button 
                  className={`solutions-tabs__btn ${solutionsTab === 'b2b' ? 'solutions-tabs__btn--active' : ''}`}
                  onClick={() => setSolutionsTab('b2b')}
                >
                  B2B Ürün Katalog Siteleri
                </button>
              </div>
              
              <div className="solutions-content-box" id="solutions-content-box">
                {/* Tab: Furniture */}
                <div className={`sol-tab-pane ${solutionsTab === 'furniture' ? 'sol-tab-pane--active' : ''}`} id="sol-tab-furniture">
                  <h3 className="sol-tab-pane__title">Mobilya ve Üretim Firmaları İçin Altyapı</h3>
                  <p className="sol-tab-pane__desc">
                    Ürün gamınızı ve tasarımlarınızı yüksek hızda yüklenen, yüksek çözünürlüklü ve detaylı katalog yapılarıyla sunuyoruz. Bayilerinize ve müşterilerinize kesintisiz bir görsel deneyim yaşatırken, mobil uyumlu yapımızla fuar ve saha sunumlarında yanınızdayız.
                  </p>
                </div>
                
                {/* Tab: Logistics */}
                <div className={`sol-tab-pane ${solutionsTab === 'logistics' ? 'sol-tab-pane--active' : ''}`} id="sol-tab-logistics">
                  <h3 className="sol-tab-pane__title">Lojistik ve Nakliye Firmaları İçin Altyapı</h3>
                  <p className="sol-tab-pane__desc">
                    Gönderi takibi, fiyat teklif formları ve dinamik bilgi taleplerini güvenli form altyamızı kullanarak yönetiyoruz. Spam mesajları filtreleyerek gerçek iş taleplerinin anında yönetim panelinize ulaşmasını sağlıyoruz.
                  </p>
                </div>
                
                {/* Tab: Corporate */}
                <div className={`sol-tab-pane ${solutionsTab === 'corporate' ? 'sol-tab-pane--active' : ''}`} id="sol-tab-corporate">
                  <h3 className="sol-tab-pane__title">Kurumsal Hizmet Şirketleri İçin Altyapı</h3>
                  <p className="sol-tab-pane__desc">
                    Danışmanlık, hukuk ve finansal hizmet sunan şirketler için güvenilirlik ve sade tasarım ön plandadır. Hizmetlerinizi anlatan arama motoru optimizasyonlu sayfalar ve güvenli iletişim kanalları ile dijital itibarınızı en üst düzeye çıkarıyoruz.
                  </p>
                </div>
                
                {/* Tab: Health */}
                <div className={`sol-tab-pane ${solutionsTab === 'health' ? 'sol-tab-pane--active' : ''}`} id="sol-tab-health">
                  <h3 className="sol-tab-pane__title">Sağlık ve Klinikler İçin Altyapı</h3>
                  <p className="sol-tab-pane__desc">
                    Tedaviler, hekim kadroları ve klinik olanaklarını sade ve bilgilendirici bir mimariyle sunuyoruz. KVKK / GDPR standartlarına tam uyumlu iletişim kanalları ile hasta gizliliği ve güvenliğini en üst seviyede tutuyoruz.
                  </p>
                </div>
                
                {/* Tab: Construction */}
                <div className={`sol-tab-pane ${solutionsTab === 'construction' ? 'sol-tab-pane--active' : ''}`} id="sol-tab-construction">
                  <h3 className="sol-tab-pane__title">İnşaat ve Yapı Firmaları İçin Altyapı</h3>
                  <p className="sol-tab-pane__desc">
                    Projelerinizi, teknik detayları ve yüksek çözünürlüklü görselleri sıfır yavaşlama ile sunan bir portföy altyapısı kuruyoruz. Devam eden ve tamamlanan projelerinizin dijital arşivini modern bir arayüzle sergiliyoruz.
                  </p>
                </div>
                
                {/* Tab: B2B */}
                <div className={`sol-tab-pane ${solutionsTab === 'b2b' ? 'sol-tab-pane--active' : ''}`} id="sol-tab-b2b">
                  <h3 className="sol-tab-pane__title">B2B Ürün Katalog Siteleri İçin Altyapı</h3>
                  <p className="sol-tab-pane__desc">
                    Binlerce ürünü, teknik tabloları ve pdf kılavuzları saniyeler içinde arayan ve filtreleyen hafif veri yapıları oluşturuyoruz. Sitenizi gereksiz e-ticaret karmaşıklığından arındırarak hızlı çalışan bir ürün vitrinine dönüştürüyoruz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Süreç (Process) */}
        <section className="process" id="process">
          <div className="container">
            <div className="section-header section-header--center">
              <span className="section-header__tag">Nasıl Çalışıyoruz?</span>
              <h2 className="section-header__title">Fikirden Canlı Altyapıya Sürecimiz</h2>
            </div>
            <div className="process__grid">
              <div className="process-card">
                <span className="process-card__num">01</span>
                <h3 className="process-card__title">Analiz & İhtiyaç Belirleme</h3>
                <p className="process-card__desc">
                  İş süreçlerinizi, hedeflerinizi ve sitenizin üstlenmesi gereken görevleri dinleyerek projeye özel teknik yol haritasını çiziyoruz.
                </p>
              </div>
              <div className="process-card">
                <span className="process-card__num">02</span>
                <h3 className="process-card__title">Arayüz Tasarımı & Kodlama</h3>
                <p className="process-card__desc">
                  Şablonlardan uzak, özgün görsel kimliği tasarlıyor; ardından gereksiz kodlardan arındırılmış temiz bir mimari ile sitenizi inşa ediyoruz.
                </p>
              </div>
              <div className="process-card">
                <span className="process-card__num">03</span>
                <h3 className="process-card__title">Performans & Güvenlik Testleri</h3>
                <p className="process-card__desc">
                  Yayın öncesinde tarayıcı uyumluluğu, Core Web Vitals performans hedefleri ve form güvenliği testlerini tamamlayarak hatasız teslimat sağlıyoruz.
                </p>
              </div>
              <div className="process-card">
                <span className="process-card__num">04</span>
                <h3 className="process-card__title">Küresel Dağıtımlı Yayın</h3>
                <p className="process-card__desc">
                  Sitenizi Vercel Edge Network altyapısına bağlayarak DNS ayarlarını yapıyor ve sıfır kesintili, SSL sertifikalı yayını başlatıyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Paketler (Packages) */}
        <section className="packages" id="packages">
          <div className="container">
            <div className="section-header section-header--center">
              <span className="section-header__tag">Şeffaf Model</span>
              <h2 className="section-header__title">Hizmet Paketlerimiz</h2>
            </div>
            <div className="packages__grid">
              {/* Pack 1: Standard (Active) */}
              <div className="package-card package-card--active">
                <div className="package-card__header">
                  <h3 className="package-card__name">Standart Paket</h3>
                  <p className="package-card__price">Projenize göre tekliflendirilir</p>
                </div>
                <div className="package-card__body">
                  <ul className="package-card__features">
                    <li>Özel Arayüz Tasarımı</li>
                    <li>Temiz ve Hızlı Kod Altyapısı</li>
                    <li>CoreWeb Müşteri Paneli</li>
                    <li>Vercel Edge Dağıtımlı Hosting</li>
                    <li>Güvenli Form Altyapısı ve Spam Koruması</li>
                    <li>Güvenli Form API Altyapısı</li>
                    <li>SSL Sertifikalı Yayın</li>
                    <li>1 Yıl Teknik Destek & Bakım</li>
                  </ul>
                  <a href="#contact" className="btn btn--primary btn--full">Projemi Planlayalım</a>
                </div>
              </div>

              {/* Pack 2: Gold (Passive) */}
              <div className="package-card package-card--disabled">
                <div className="package-card__header">
                  <span className="package-card__tag">Yakında</span>
                  <h3 className="package-card__name">Gold Paket</h3>
                  <p className="package-card__price">Yakında</p>
                </div>
                <div className="package-card__body">
                  <ul className="package-card__features">
                    <li>Standart Paket Özellikleri</li>
                    <li>Çoklu Dil (Multilingual) Desteği</li>
                    <li>Dinamik Blog & Haber Modülü</li>
                    <li>Gelişmiş SEO Yönetimi</li>
                    <li>Sosyal Medya Entegrasyonları</li>
                  </ul>
                  <button className="btn btn--secondary btn--full" disabled>Yakında</button>
                </div>
              </div>

              {/* Pack 3: Platinum (Passive) */}
              <div className="package-card package-card--disabled">
                <div className="package-card__header">
                  <span className="package-card__tag">Yakında</span>
                  <h3 className="package-card__name">Platinum Paket</h3>
                  <p className="package-card__price">Yakında</p>
                </div>
                <div className="package-card__body">
                  <ul className="package-card__features">
                    <li>Gold Paket Özellikleri</li>
                    <li>B2B Ürün Katalog Modülü</li>
                    <li>Gelişmiş Filtreleme Arayüzü</li>
                    <li>Müşteriye Özel API Entegrasyonları</li>
                    <li>7/24 Öncelikli Destek Hattı</li>
                  </ul>
                  <button className="btn btn--secondary btn--full" disabled>Yakında</button>
                </div>
              </div>

              {/* Pack 4: Corporate Custom (Passive) */}
              <div className="package-card package-card--disabled">
                <div className="package-card__header">
                  <span className="package-card__tag">Talep İle</span>
                  <h3 className="package-card__name">Kurumsal Özel</h3>
                  <p className="package-card__price">Talep ile</p>
                </div>
                <div className="package-card__body">
                  <ul className="package-card__features">
                    <li>Büyük Ölçekli Dijital Altyapı</li>
                    <li>Özel Veritabanı Entegrasyonları</li>
                    <li>Maksimum Güvenlik Geliştirmeleri</li>
                    <li>Çoklu Kiracılı Alt Ağlar</li>
                    <li>SLA Garantili SLA Bakım Sözleşmesi</li>
                  </ul>
                  <a href="#contact" className="btn btn--secondary btn--full">Talep Edin</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Projeler (Projects) */}
        <section className="projects" id="projects">
          <div className="container">
            <div className="section-header section-header--center">
              <span className="section-header__tag">Neler Ürettik?</span>
              <h2 className="section-header__title">Geliştirdiğimiz Aktif Altyapılar</h2>
            </div>
            <div className="projects__grid">
              {/* Project 1: CoreWeb */}
              <div className="project-card">
                <div className="project-card__mockup mockup-browser">
                  <div className="mockup-browser__header">
                    <div className="mockup-browser__dots">
                      <span></span><span></span><span></span>
                    </div>
                    <div className="mockup-browser__url">coreweb.tr</div>
                  </div>
                  <div className="mockup-browser__body">
                    <div className="skeleton-page page-coreweb">
                      <div className="skeleton-line-thick"></div>
                      <div className="skeleton-line-thin"></div>
                      <div className="skeleton-grid-2">
                        <div className="skeleton-block"></div>
                        <div className="skeleton-block"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project-card__content">
                  <h3 className="project-card__title">CoreWeb Resmi Web Sitesi</h3>
                  <p className="project-card__desc">
                    Şu an incelemekte olduğunuz, sıfır eklenti bağımlılığıyla tasarlanan ve Vercel Edge üzerinde yayınlanan resmi web altyapımız.
                  </p>
                </div>
              </div>
              
              {/* Project 2: Burobig */}
              <div className="project-card">
                <div className="project-card__mockup mockup-browser">
                  <div className="mockup-browser__header">
                    <div className="mockup-browser__dots">
                      <span></span><span></span><span></span>
                    </div>
                    <div className="mockup-browser__url">burobig.com</div>
                  </div>
                  <div className="mockup-browser__body">
                    <div className="skeleton-page page-burobig">
                      <div className="skeleton-line-thick"></div>
                      <div className="skeleton-grid-3">
                        <div className="skeleton-block"></div>
                        <div className="skeleton-block"></div>
                        <div className="skeleton-block"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project-card__content">
                  <h3 className="project-card__title">Burobig Ofis Mobilyaları</h3>
                  <p className="project-card__desc">
                    Üretim grubunu ve lüks ofis koltuklarını listeleyen, yüksek hızlı ürün katalog mimarisi.
                  </p>
                </div>
              </div>

              {/* Project 3: Capilon */}
              <div className="project-card">
                <div className="project-card__mockup mockup-browser">
                  <div className="mockup-browser__header">
                    <div className="mockup-browser__dots">
                      <span></span><span></span><span></span>
                    </div>
                    <div className="mockup-browser__url">capilon.com.tr</div>
                  </div>
                  <div className="mockup-browser__body">
                    <div className="skeleton-page page-capilon">
                      <div className="skeleton-hero-banner"></div>
                      <div className="skeleton-line-thin"></div>
                    </div>
                  </div>
                </div>
                <div className="project-card__content">
                  <h3 className="project-card__title">Capilon Mobilya</h3>
                  <p className="project-card__desc">
                    Kurumsal marka değerini ön plana çıkaran, hızlı görsel yükleme ve sade yönetim paneline sahip kurumsal web sitesi.
                  </p>
                </div>
              </div>

              {/* Project 4: Kreatif Fikirler */}
              <div className="project-card">
                <div className="project-card__mockup mockup-browser">
                  <div className="mockup-browser__header">
                    <div className="mockup-browser__dots">
                      <span></span><span></span><span></span>
                    </div>
                    <div className="mockup-browser__url">kreatiffikirler.com</div>
                  </div>
                  <div className="mockup-browser__body">
                    <div className="skeleton-page page-kreatif">
                      <div className="skeleton-grid-2">
                        <div className="skeleton-block"></div>
                        <div className="skeleton-block"></div>
                      </div>
                      <div className="skeleton-line-thin"></div>
                    </div>
                  </div>
                </div>
                <div className="project-card__content">
                  <h3 className="project-card__title">Kreatif Fikirler</h3>
                  <p className="project-card__desc">
                    Özel hizmet ve vaka çalışmalarını arama motoru dostu semantik yapıyla sunan kurumsal tanıtım sitesi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 11. Güven Alanı (Trust Area) */}
        <section className="trust" id="trust">
          <div className="container">
            <div className="section-header section-header--center">
              <span className="section-header__tag">Teknik Güvenceler</span>
              <h2 className="section-header__title">Neden CoreWeb Altyapısı?</h2>
            </div>
            <div className="trust__grid">
              <div className="trust-item">
                <h3 className="trust-item__title">Hafif Kod Mimarisi</h3>
                <p className="trust-item__desc">
                  Eklentilerle şişirilmemiş, saf ve temiz kod blokları sayesinde web siteniz her tarayıcıda stabil çalışır.
                </p>
              </div>
              <div className="trust-item">
                <h3 className="trust-item__title">Mobil Uyum</h3>
                <p className="trust-item__desc">
                  Cihaz bağımsız, tüm ekran boyutlarına tam uyumlu esnek tasarım yapısı sayesinde kusursuz mobil deneyim.
                </p>
              </div>
              <div className="trust-item">
                <h3 className="trust-item__title">SSL Destekli Yayın</h3>
                <p className="trust-item__desc">
                  Otomatik güncellenen SSL sertifikası ile siteniz üzerinden geçen tüm veriler en üst düzeyde şifrelenir.
                </p>
              </div>
              <div className="trust-item">
                <h3 className="trust-item__title">SEO Uyumlu Yapı</h3>
                <p className="trust-item__desc">
                  Arama motorları ve anlamsal YZ tarayıcı botları için optimize edilmiş HTML5 etiket düzeni.
                </p>
              </div>
              <div className="trust-item">
                <h3 className="trust-item__title">Güvenli Form Altyapısı</h3>
                <p className="trust-item__desc">
                  Gelişmiş spam koruması ve veri filtreleme algoritmalarıyla güvenliği ve iletim kararlılığı sağlanmış form yapıları.
                </p>
              </div>
              <div className="trust-item">
                <h3 className="trust-item__title">Panel Yönetimi</h3>
                <p className="trust-item__desc">
                  Sadece işletmenizin ihtiyaç duyduğu alanları yönetebileceğiniz, sadeleştirilmiş müşteri kontrol paneli.
                </p>
              </div>
              <div className="trust-item">
                <h3 className="trust-item__title">Yayın Öncesi Test Süreci</h3>
                <p className="trust-item__desc">
                  Yayın öncesinde tarayıcı uyumluluğu, Core Web Vitals performans hedefleri ve form doğrulamaları test edilerek sıfır hata hedeflenir.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 12. Final CTA ve İletişim Formu */}
        <section className="contact" id="contact">
          <div className="container">
            <div className="contact__wrapper">
              <div className="contact__info">
                <h2 className="contact__title">Hadi, Projenizi Birlikte Planlayalım</h2>
                <p className="contact__desc">
                  İşletmenizin web altyapısını güçlendirmek ve CoreWeb yönetim paneliyle tanışmak için formu doldurun. Talebiniz doğrultusunda en kısa sürede size dönüş yapalım.
                </p>
              </div>
              
              <div className="contact__form-box">
                <form className="contact-form" id="main-contact-form" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="form-name" className="form-label">Adınız Soyadınız *</label>
                    <input 
                      type="text" 
                      id="form-name" 
                      name="name" 
                      className="form-input" 
                      required 
                      placeholder="Örn. Ahmet Yılmaz" 
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="form-email" className="form-label">E-posta Adresiniz *</label>
                    <input 
                      type="email" 
                      id="form-email" 
                      name="email" 
                      className="form-input" 
                      required 
                      placeholder="Örn. ahmet@sirket.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="form-phone" className="form-label">Telefon Numaranız *</label>
                    <input 
                      type="tel" 
                      id="form-phone" 
                      name="phone" 
                      className="form-input" 
                      required 
                      placeholder="Örn. 0555 123 45 67" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="form-message" className="form-label">Mesajınız</label>
                    <textarea 
                      id="form-message" 
                      name="message" 
                      className="form-input form-input--textarea" 
                      placeholder="Projeniz hakkında kısa bilgi verin..."
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={loading}
                    ></textarea>
                  </div>

                  {/* Honeypot field (hidden from real users) */}
                  <div className="website-dummy-field" style={{ display: 'none' }}>
                    <label>If you are a human, do not fill this field.</label>
                    <input 
                      type="text" 
                      name="website_dummy" 
                      value={formData.website_dummy}
                      onChange={handleInputChange} 
                      tabIndex={-1} 
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-checkbox">
                    <input 
                      type="checkbox" 
                      id="form-kvkk" 
                      required 
                      checked={consentAccepted}
                      onChange={(e) => setConsentAccepted(e.target.checked)}
                      disabled={loading}
                    />
                    <label htmlFor="form-kvkk">Bilgilerimin talebime dönüş yapılması amacıyla CoreWeb altyapısında işlenmesini kabul ediyorum. *</label>
                  </div>
                  
                  <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
                    {loading ? 'Gönderiliyor...' : 'Talebi Gönder'}
                  </button>
                  <div className={statusClass} id="form-status-msg">{statusMsg}</div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 13. Footer */}
      <footer className="footer">
        <div className="container footer__container">
          <div className="footer__brand">
            <a href="/" className="footer__logo">
              <img src="/logo.png" alt="CoreWeb Logo" className="logo-img" />
            </a>
            <p className="footer__desc">Yönetilebilir web altyapısı sağlayan teknoloji firması.</p>
          </div>
          <div className="footer__links">
            <a href="#services" className="footer__link">Hizmetler</a>
            <a href="#panel" className="footer__link">Yönetim Paneli</a>
            <a href="#solutions" className="footer__link">Sektörel Çözümler</a>
            <a href="#packages" className="footer__link">Paketler</a>
            <a href="#projects" className="footer__link">Projeler</a>
          </div>
        </div>
        <div className="container footer__bottom">
          <p>CoreWeb © 2026. Tüm hakları saklıdır. | KVKK Aydınlatma Metni</p>
        </div>
      </footer>
    </>
  );
}
