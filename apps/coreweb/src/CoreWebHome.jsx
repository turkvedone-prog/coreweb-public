import { useState, useEffect, useRef } from 'react';
import { submitLead } from '../../services/apiService';
import { loadRecaptchaScript, executeRecaptcha } from '../../utils/recaptcha';
import { Cpu, Search, Mail, FileText, Database, Image, Shield, Globe, LineChart } from 'lucide-react';
import './coreweb.css';

export default function CoreWebHome() {
  const [panelTab, setPanelTab] = useState('summary');
  const [solutionsTab, setSolutionsTab] = useState('furniture');

  // Mock Dashboard States
  const [mockHeadline, setMockHeadline] = useState("Web siteniz bir sayfa değil. İşletmenizin dijital işletim sistemi olmalı.");
  const [mockSeoDesc, setMockSeoDesc] = useState("CoreWeb; kurumunuz için özel tasarlanmış, yüksek performanslı ve yönetilebilir web siteleri sunar.");
  const [isSpeedOptimized, setIsSpeedOptimized] = useState(false);
  const [buildStatus, setBuildStatus] = useState('idle');
  const [buildProgress, setBuildProgress] = useState(0);

  const startBuildSimulation = () => {
    if (buildStatus === 'building') return;
    setBuildStatus('building');
    setBuildProgress(0);
    
    const interval = setInterval(() => {
      setBuildProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setBuildStatus('success');
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const WIDTH = 440;
    const HEIGHT = 440;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // Coordinates matching relative positions of module nodes in core-scene
    const fixedNodes = [
      { id: 'core', x: 220, y: 220 },
      { id: 'seo', x: 198, y: 18 },
      { id: 'forms', x: 330, y: 88 },
      { id: 'content', x: 352, y: 229 },
      { id: 'products', x: 308, y: 352 },
      { id: 'media', x: 185, y: 392 },
      { id: 'security', x: 62, y: 343 },
      { id: 'hosting', x: 35, y: 202 },
      { id: 'analytics', x: 62, y: 79 }
    ];

    const particleCount = 26;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * WIDTH,
        y: Math.random() * HEIGHT,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1.2
      });
    }

    const mouse = { x: null, y: null, radius: 95 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    const getDistance = (p1, p2) => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const signals = [];
    fixedNodes.forEach((node) => {
      if (node.id !== 'core') {
        signals.push({
          node,
          progress: Math.random(),
          speed: Math.random() * 0.004 + 0.002
        });
      }
    });

    const draw = () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      // 1. Draw connecting vector lines
      ctx.lineWidth = 1;
      fixedNodes.forEach((node) => {
        if (node.id !== 'core') {
          ctx.beginPath();
          ctx.moveTo(220, 220);
          ctx.lineTo(node.x, node.y);
          if (node.id === 'seo' || node.id === 'content' || node.id === 'security' || node.id === 'media') {
            ctx.strokeStyle = 'rgba(226, 65, 37, 0.06)';
          } else {
            ctx.strokeStyle = 'rgba(14, 165, 233, 0.08)';
          }
          ctx.stroke();
        }
      });

      // 2. Animate and draw data flow pulses
      signals.forEach((sig) => {
        sig.progress += sig.speed;
        if (sig.progress > 1) {
          sig.progress = 0;
          sig.speed = Math.random() * 0.004 + 0.002;
        }
        
        const x = 220 + (sig.node.x - 220) * sig.progress;
        const y = 220 + (sig.node.y - 220) * sig.progress;
        
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = sig.node.id === 'seo' || sig.node.id === 'content' || sig.node.id === 'security' || sig.node.id === 'media'
          ? 'rgba(226, 65, 37, 0.45)'
          : 'rgba(14, 165, 233, 0.5)';
        ctx.fill();
      });

      // 3. Update drifting particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > WIDTH) p.vx *= -1;
        if (p.y < 0 || p.y > HEIGHT) p.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          const distToMouse = getDistance(p, mouse);
          if (distToMouse < mouse.radius) {
            const force = (mouse.radius - distToMouse) / mouse.radius;
            p.x += (mouse.x - p.x) * force * 0.025;
            p.y += (mouse.y - p.y) * force * 0.025;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.12)';
        ctx.fill();
      });

      // 4. Draw drift connections
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = getDistance(particles[i], particles[j]);
          if (dist < 75) {
            const alpha = (75 - dist) / 75 * 0.06;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(15, 23, 42, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // 5. Draw mouse attraction lines
      if (mouse.x !== null && mouse.y !== null) {
        ctx.lineWidth = 0.8;
        particles.forEach((p) => {
          const dist = getDistance(p, mouse);
          if (dist < mouse.radius) {
            const alpha = (mouse.radius - dist) / mouse.radius * 0.1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(226, 65, 37, ${alpha})`;
            ctx.stroke();
          }
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: '',
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
    document.title = "CoreWeb | Yönetilebilir Web Altyapısı ve Kurumsal Web Siteleri";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'CoreWeb; özel tasarım, müşteri paneli, SEO uyumlu yapı, güvenli form altyapısı ve yayın süreciyle işletmeler için yönetilebilir kurumsal web siteleri geliştirir.');
  }, []);

  // Preemptively load reCAPTCHA script
  useEffect(() => {
    loadRecaptchaScript(siteKey);
  }, [siteKey]);



  // Scroll Reveal IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg('Gönderiliyor...');
    setStatusClass('form-message');
    setLoading(true);

    const formattedMessage = `${formData.message}\n\nFirma Adı: ${formData.company}\nProje Türü: ${formData.projectType}`;

    try {
      let recaptchaToken = '';
      
      // Attempt to execute reCAPTCHA
      if (window.grecaptcha && window.grecaptcha.enterprise) {
        recaptchaToken = await window.grecaptcha.enterprise.execute(siteKey, { action: 'submitLead' });
      } else {
        try {
          recaptchaToken = await executeRecaptcha(siteKey, 'submitLead');
        } catch {
          // Silent fallback warning
        }
      }

      await submitLead({
        tenantSlug: 'coreweb',
        type: 'contact',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formattedMessage,
        company: formData.company,
        projectType: formData.projectType,
        consentAccepted: consentAccepted,
        website_dummy: formData.website_dummy,
        recaptchaToken
      });

      setStatusMsg('Talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.');
      setStatusClass('form-message form-message--success');
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        projectType: '',
        message: '',
        website_dummy: ''
      });
      setConsentAccepted(false);
    } catch {
      setStatusMsg('Form altyapısı yayın entegrasyonu sırasında aktif edilecektir.');
      setStatusClass('form-message form-message--error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
        {/* 2. Hero / Dijital İşletim Sistemi */}
        <section className="hero" id="hero">
          <div className="hero__grid-wrapper">
            <div className="hero__content">
              <h1 className="hero__title">
                Web siteniz bir sayfa değil. <br />
                <span className="hero__title-accent">İşletmenizin dijital işletim sistemi olmalı.</span>
              </h1>
              <p className="hero__subtitle">
                CoreWeb; özel tasarım web sitelerini müşteri paneli, SEO altyapısı, form yönetimi, içerik kontrolü ve yayın süreciyle birlikte çalışan bir dijital sisteme dönüştürür.
              </p>
              <div className="hero__ctas">
                <a href="#contact" className="btn btn--primary" onClick={(e) => handleSmoothScroll(e, '#contact')}>Projemi Planlayalım</a>
                <a href="#panel" className="btn btn--secondary" onClick={(e) => handleSmoothScroll(e, '#panel')}>Kontrol Merkezini İncele</a>
              </div>
            </div>
            
             <div className="hero__visual">
              <div className="core-scene" ref={containerRef}>
                {/* Dynamic Interactive Particle Constellation & Data Flow Canvas */}
                <canvas ref={canvasRef} className="connection-svg" />
                
                <div className="core-node">
                  <span className="core-node__title">CoreWeb</span>
                  <span className="core-node__subtitle">Dijital Çekirdek</span>
                  <div className="core-node__pulse"></div>
                </div>
                <div className="floating-module float-seo">
                  <Search size={14} style={{color: 'var(--c-accent)'}} />
                  <span className="float-text">SEO</span>
                </div>
                <div className="floating-module float-forms">
                  <Mail size={14} style={{color: 'var(--c-accent-cyan)'}} />
                  <span className="float-text">Formlar</span>
                </div>
                <div className="floating-module float-content">
                  <FileText size={14} style={{color: 'var(--c-accent)'}} />
                  <span className="float-text">İçerikler</span>
                </div>
                <div className="floating-module float-products">
                  <Database size={14} style={{color: 'var(--c-accent-cyan)'}} />
                  <span className="float-text">Ürünler</span>
                </div>
                <div className="floating-module float-media">
                  <Image size={14} style={{color: 'var(--c-accent)'}} />
                  <span className="float-text">Medya</span>
                </div>
                <div className="floating-module float-security">
                  <Shield size={14} style={{color: 'var(--c-accent-cyan)'}} />
                  <span className="float-text">Güvenlik</span>
                </div>
                <div className="floating-module float-hosting">
                  <Globe size={14} style={{color: 'var(--c-accent)'}} />
                  <span className="float-text">Hosting</span>
                </div>
                <div className="floating-module float-analytics">
                  <LineChart size={14} style={{color: 'var(--c-accent-cyan)'}} />
                  <span className="float-text">Analiz</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="marquee-wrapper" aria-hidden="true">
            <div className="marquee">
              <span className="marquee__item">ÖZEL TASARIM • HAFİF KOD MİMARİSİ • EDGE NETWORK • MÜŞTERİ PANELİ • GÜVENLİ FORM ALTYAPISI • SPAM KORUMASI • </span>
              <span className="marquee__item">ÖZEL TASARIM • HAFİF KOD MİMARİSİ • EDGE NETWORK • MÜŞTERİ PANELİ • GÜVENLİ FORM ALTYAPISI • SPAM KORUMASI • </span>
            </div>
          </div>
        </section>

        {/* 3. Neden Klasik Siteler Yetmiyor? (Problem) */}
        <section className="problem" id="problem">
          <div className="container">
            <div className="section-header">
              <span className="section-header__tag">Mevcut Durum</span>
              <h2 className="section-header__title">Neden Klasik Siteler Yetmiyor?</h2>
            </div>
            <div className="problem__grid">
              <div className="problem-card">
                <h3 className="problem-card__title">Performans ve Hız Kaybı</h3>
                <p className="problem-card__desc">
                  Hazır şablonlarla kurulan birçok site zamanla ağırlaşır, yönetimi zorlaşır ve işletmenin gerçek ihtiyacına tam uyum sağlamaz. CoreWeb ise projeye özel, sade, hızlı ve yönetilebilir bir yapı kurar.
                </p>
              </div>
              <div className="problem-card">
                <h3 className="problem-card__title">Eklenti ve Güvenlik Kırılganlığı</h3>
                <p className="problem-card__desc">
                  Sürekli güncellenmesi gereken üçüncü taraf yazılımlar ve eklenti yığınları, sitenizi dış tehditlere açık hale getirir. Sürüm uyuşmazlıkları sitenizin çökmesine veya işlev kaybetmesine neden olabilir.
                </p>
              </div>
              <div className="problem-card">
                <h3 className="problem-card__title">Şablon Sınırları ve Yönetim Zorluğu</h3>
                <p className="problem-card__desc">
                  Hazır tasarımlar işletmenizin özgün kimliğini yansıtamaz ve zamanla değişen hedeflerinize uyum sağlayamaz. Karmaşık paneller basit bir metin değişimini bile teknik bir çıkmaza dönüştürebilir.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CoreWeb Nasıl Çalışır? (Çözüm) */}
        <section className="solution" id="solution">
          <div className="container">
            <div className="solution__wrapper">
              <div className="solution__content">
                <span className="section-header__tag section-header__tag--alt">Yeni Yaklaşım</span>
                <h2 className="solution__title">CoreWeb Nasıl Çalışır?</h2>
                <p className="solution__desc">
                  CoreWeb, hazır şablonların ve eklenti bağımlılıklarının sınırlarını ortadan kaldırarak işletmenize özel dijital işletim sistemini 4 temel aşamada kurar.
                </p>
                <ul className="solution__list">
                  <li className="solution__item">
                    <strong>1. Özel Arayüz Tasarlanır:</strong> Markanıza özel, yüksek dönüşüm odaklı ve özgün arayüz kodlanır.
                  </li>
                  <li className="solution__item">
                    <strong>2. İçerik ve Talepler Panelden Yönetilir:</strong> Müşteri paneli üzerinden içerikler ve formlar tek merkezden kontrol edilir.
                  </li>
                  <li className="solution__item">
                    <strong>3. SEO ve Performans Altyapısı Kurulur:</strong> Arama motoru ve YZ arama robotlarına uyumlu hafif kod iskeleti oluşturulur.
                  </li>
                  <li className="solution__item">
                    <strong>4. Yayın, Güvenlik ve Bakım Takip Edilir:</strong> Küresel Edge sunucularda güvenli form altyapısı ve spam korumasıyla kesintisiz yayınlanır.
                  </li>
                </ul>
              </div>
              <div className="solution__visual">
                <div className="speed-meter">
                  <div className="speed-meter__circle">
                    <span className="speed-meter__value">A+</span>
                    <span className="speed-meter__label">Performans</span>
                  </div>
                  <p className="speed-meter__desc">Core Web Vitals Standartlarında Kararlı Kod Yapısı</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Kontrol Merkezi (Panel) */}
        <section className="panel-section" id="panel">
          <div className="container">
            <div className="panel-section__wrapper">
              <div className="panel-section__info">
                <span className="section-header__tag">Kontrol Merkezi</span>
                <h2 className="panel-section__title">Kendi Sitenizin Hakimi Olun</h2>
                <p className="panel-section__desc">
                  CoreWeb müşteri paneli, karmaşık teknik detayları geride bırakarak web sitenizin tüm kontrolünü size verir. Sadece sizin yönetmek istediğiniz alanlara odaklanır.
                </p>
                
                <div className="panel-nav" id="panel-nav" role="tablist">
                  <button 
                    className={`panel-nav__btn ${panelTab === 'summary' ? 'panel-nav__btn--active' : ''}`} 
                    onClick={() => setPanelTab('summary')}
                    role="tab" 
                    aria-selected={panelTab === 'summary'} 
                    aria-controls="mock-tab-summary"
                  >
                    <h4>Site Genel Görünüm</h4>
                    <p>Sistem genel sağlık durumu ve güvenlik özetleri.</p>
                  </button>
                  <button 
                    className={`panel-nav__btn ${panelTab === 'leads' ? 'panel-nav__btn--active' : ''}`} 
                    onClick={() => setPanelTab('leads')}
                    role="tab" 
                    aria-selected={panelTab === 'leads'} 
                    aria-controls="mock-tab-leads"
                  >
                    <h4>Gelen Formlar</h4>
                    <p>Müşteri talepleri ve iletişim formu bildirimleri.</p>
                  </button>
                  <button 
                    className={`panel-nav__btn ${panelTab === 'content' ? 'panel-nav__btn--active' : ''}`} 
                    onClick={() => setPanelTab('content')}
                    role="tab" 
                    aria-selected={panelTab === 'content'} 
                    aria-controls="mock-tab-content"
                  >
                    <h4>İçerik Yönetimi</h4>
                    <p>Sayfa metinleri ve görsel alanların güncellenmesi.</p>
                  </button>
                  <button 
                    className={`panel-nav__btn ${panelTab === 'seo' ? 'panel-nav__btn--active' : ''}`} 
                    onClick={() => setPanelTab('seo')}
                    role="tab" 
                    aria-selected={panelTab === 'seo'} 
                    aria-controls="mock-tab-seo"
                  >
                    <h4>SEO Kontrolü</h4>
                    <p>Meta başlıklar, açıklamalar ve indekslenebilirlik durumu.</p>
                  </button>
                  <button 
                    className={`panel-nav__btn ${panelTab === 'media' ? 'panel-nav__btn--active' : ''}`} 
                    onClick={() => setPanelTab('media')}
                    role="tab" 
                    aria-selected={panelTab === 'media'} 
                    aria-controls="mock-tab-media"
                  >
                    <h4>Medya Kütüphanesi</h4>
                    <p>Görsellerin, katalogların ve dosyaların yönetimi.</p>
                  </button>
                  <button 
                    className={`panel-nav__btn ${panelTab === 'build' ? 'panel-nav__btn--active' : ''}`} 
                    onClick={() => setPanelTab('build')}
                    role="tab" 
                    aria-selected={panelTab === 'build'} 
                    aria-controls="mock-tab-build"
                  >
                    <h4>Yayın Durumu</h4>
                    <p>Vercel Edge Network bağlantısı ve anlık yayın takibi.</p>
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
                    {/* Tab Content: Site Genel Görünüm (Summary) */}
                    <div className={`mock-tab-content ${panelTab === 'summary' ? 'mock-tab-content--active' : ''}`} id="mock-tab-summary" role="tabpanel">
                      <div className="mock-stats-grid">
                        <div className="mock-stat-card">
                          <span className="mock-stat-card__label">Altyapı Durumu</span>
                          <span className="mock-stat-card__val" style={{color: '#10b981'}}>Aktif</span>
                        </div>
                        <div className="mock-stat-card">
                          <span className="mock-stat-card__label">Mobil / Masaüstü Hız</span>
                          <span className={`mock-stat-card__val ${isSpeedOptimized ? 'text-speed-100' : 'text-speed-45'}`}>
                            {isSpeedOptimized ? '100 / 100' : '45 / 100'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mock-interactive-banner">
                        <p className="mock-interactive-text">
                          CoreWeb hız farkını test etmek için optimizasyon motorunu açın.
                        </p>
                        <button 
                          className={`mock-action-btn ${isSpeedOptimized ? 'mock-action-btn--active' : ''}`}
                          onClick={() => setIsSpeedOptimized(!isSpeedOptimized)}
                        >
                          {isSpeedOptimized ? '⚡ Optimizasyon Aktif' : '⚡ Optimizasyonu Aç'}
                        </button>
                      </div>

                      <div className="mock-security-status">
                        <div className="mock-security-stat">
                          <span>Form Güvenliği</span>
                          <strong className="mock-badge">Aktif</strong>
                        </div>
                        <div className="mock-security-stat">
                          <span>Edge SSL Sertifikası</span>
                          <strong className="mock-badge">Etkin</strong>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tab Content: Gelen Formlar (Leads) */}
                    <div className={`mock-tab-content ${panelTab === 'leads' ? 'mock-tab-content--active' : ''}`} id="mock-tab-leads" role="tabpanel">
                      <div className="mock-leads-list">
                        <div className="mock-lead-item">
                          <div className="mock-lead-item__meta">
                            <strong>Form güvenliği aktif</strong>
                            <span>Spam korumalı iletişim modülü devrede</span>
                          </div>
                          <span className="mock-badge">Etkin</span>
                        </div>
                        <div className="mock-lead-item">
                          <div className="mock-lead-item__meta">
                            <strong>Site yayına hazır</strong>
                            <span>Yayın öncesi kontrol tamamlandı</span>
                          </div>
                          <span className="mock-badge">Hazır</span>
                        </div>
                        <div className="mock-lead-item">
                          <div className="mock-lead-item__meta">
                            <strong>Panel modülü aktif</strong>
                            <span>İçerik alanları düzenli, talep akışı hazır</span>
                          </div>
                          <span className="mock-badge">Aktif</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tab Content: İçerik Yönetimi */}
                    <div className={`mock-tab-content ${panelTab === 'content' ? 'mock-tab-content--active' : ''}`} id="mock-tab-content" role="tabpanel">
                      <div className="mock-content-editor">
                        <div className="mock-editor-group">
                          <label className="mock-editor-label" htmlFor="mock-headline-input">Anasayfa Başlık Düzenleme</label>
                          <input 
                            id="mock-headline-input"
                            type="text" 
                            className="mock-editor-text-input" 
                            value={mockHeadline} 
                            onChange={(e) => setMockHeadline(e.target.value)} 
                          />
                        </div>
                        
                        <div className="mock-live-preview-box">
                          <span className="mock-preview-tag">Müşteri Sitesi Canlı Önizleme:</span>
                          <div className="mock-preview-screen">
                            <h4 className="mock-preview-title">{mockHeadline || 'Başlık yazın...'}</h4>
                            <p className="mock-preview-desc">CoreWeb altyapısı ile anlık içerik güncellemeleri saniyesinde yayında.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tab Content: SEO Kontrolü */}
                    <div className={`mock-tab-content ${panelTab === 'seo' ? 'mock-tab-content--active' : ''}`} id="mock-tab-seo" role="tabpanel">
                      <div className="mock-content-editor">
                        <div className="mock-editor-group">
                          <label className="mock-editor-label" htmlFor="mock-seo-desc-input">Meta Açıklaması (Meta Description)</label>
                          <textarea 
                            id="mock-seo-desc-input"
                            rows="2"
                            className="mock-editor-text-input mock-editor-textarea" 
                            value={mockSeoDesc} 
                            onChange={(e) => setMockSeoDesc(e.target.value)} 
                          />
                        </div>
                        
                        <div className="mock-google-snippet">
                          <span className="mock-preview-tag">Arama Motoru (Google) Görünümü:</span>
                          <div className="google-result-card">
                            <span className="google-url">https://www.siteniz.com</span>
                            <h4 className="google-title">Sitenizin Başlığı | Sektörel Lider</h4>
                            <p className="google-desc">{mockSeoDesc || 'Lütfen meta açıklaması girin...'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tab Content: Medya Kütüphanesi */}
                    <div className={`mock-tab-content ${panelTab === 'media' ? 'mock-tab-content--active' : ''}`} id="mock-tab-media" role="tabpanel">
                      <div className="mock-media-library">
                        <div className="mock-media-grid">
                          <div className="mock-media-card">
                            <div className="mock-media-thumb">🖼️</div>
                            <span>logo-white.svg</span>
                          </div>
                          <div className="mock-media-card">
                            <div className="mock-media-thumb">📄</div>
                            <span>katalog-2026.pdf</span>
                          </div>
                          <div className="mock-media-card">
                            <div className="mock-media-thumb">🖼️</div>
                            <span>hero-banner.webp</span>
                          </div>
                        </div>
                        <div className="mock-media-status">
                          <span>Medya Durumu:</span>
                          <strong className="mock-badge">Tüm dosyalar optimize edildi</strong>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tab Content: Yayın Durumu */}
                    <div className={`mock-tab-content ${panelTab === 'build' ? 'mock-tab-content--active' : ''}`} id="mock-tab-build" role="tabpanel">
                      <div className="mock-build-status">
                        <div className="mock-build-header">
                          <span className={`mock-build-pulse ${buildStatus === 'building' ? 'mock-build-pulse--busy' : buildStatus === 'success' ? 'mock-build-pulse--success' : ''}`}></span>
                          <div>
                            <strong>Küresel Yayın Altyapısı (Edge Network)</strong>
                            <p>
                              {buildStatus === 'idle' && 'Değişiklikler dağıtıma hazır.'}
                              {buildStatus === 'building' && 'Derleme yapılıyor ve Vercel Edge sunucularına dağıtılıyor...'}
                              {buildStatus === 'success' && 'Tebrikler! Siteniz küresel ağda güncellendi.'}
                            </p>
                          </div>
                        </div>

                        {buildStatus === 'building' && (
                          <div className="mock-progress-container">
                            <div className="mock-progress-bar" style={{width: `${buildProgress}%`}}></div>
                            <span className="mock-progress-text">{buildProgress}%</span>
                          </div>
                        )}

                        <div className="mock-action-row" style={{marginTop: '1rem'}}>
                          <button 
                            className="mock-action-btn mock-action-btn--primary"
                            onClick={startBuildSimulation}
                            disabled={buildStatus === 'building'}
                          >
                            {buildStatus === 'idle' && 'Değişiklikleri Canlıya Al'}
                            {buildStatus === 'building' && 'Derleniyor...'}
                            {buildStatus === 'success' && 'Yeniden Dağıt'}
                          </button>
                        </div>

                        <div className="mock-security-status" style={{marginTop: '1.25rem'}}>
                          <div className="mock-security-stat">
                            <span>Dağıtım Altyapısı</span>
                            <strong>Vercel Edge</strong>
                          </div>
                          <div className="mock-security-stat">
                            <span>Durum</span>
                            <strong style={{color: buildStatus === 'success' ? '#10b981' : '#f59e0b'}}>
                              {buildStatus === 'idle' && 'Beklemede'}
                              {buildStatus === 'building' && 'Yükleniyor'}
                              {buildStatus === 'success' && 'Yayında'}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. İşletmenize Göre Modüller */}
        <section className="services" id="modules">
          <div className="container">
            <div className="section-header section-header--center">
              <span className="section-header__tag">Modüller</span>
              <h2 className="section-header__title">İşletmenize Göre Modüller</h2>
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
                <h3 className="service-card__title">Form ve Talep Yönetimi</h3>
                <p className="service-card__desc">
                  Gelen teklif ve iletişim taleplerini filtreleyen, spam korumalı, güvenli form altyapısı ve düzenli bildirim akışı.
                </p>
              </article>
              <article className="service-card">
                <div className="service-card__icon service-card__icon--hosting"></div>
                <h3 className="service-card__title">Hosting ve Koruyucu Bakım</h3>
                <p className="service-card__desc">
                  Sürekli güncellenen altyapı, yüksek erişilebilirlikli küresel sunucu dağıtımı, yedekleme ve teknik bakım süreci.
                </p>
              </article>
              <article className="service-card">
                <div className="service-card__icon service-card__icon--design"></div>
                <h3 className="service-card__title">Yayın Öncesi Test Süreci</h3>
                <p className="service-card__desc">
                  Sitenin yayına alınmasından önce tarayıcı uyumluluğu, Core Web Vitals performans hedefleri ve form güvenliğinin tam testi.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* 7. Sektörel Çözümler */}
        <section className="solutions" id="solutions">
          <div className="container">
            <div className="section-header section-header--center">
              <span className="section-header__tag">Sektör Odaklı</span>
              <h2 className="section-header__title">Sektörel Çözümler</h2>
            </div>
            
            <div className="solutions__tabs-wrapper">
              <div className="solutions-tabs" id="solutions-tabs-nav" role="tablist">
                <button 
                  className={`solutions-tabs__btn ${solutionsTab === 'furniture' ? 'solutions-tabs__btn--active' : ''}`} 
                  onClick={() => setSolutionsTab('furniture')}
                  role="tab" 
                  aria-selected={solutionsTab === 'furniture'} 
                  aria-controls="sol-tab-furniture"
                >
                  Mobilya ve Üretim Firmaları
                </button>
                <button 
                  className={`solutions-tabs__btn ${solutionsTab === 'logistics' ? 'solutions-tabs__btn--active' : ''}`} 
                  onClick={() => setSolutionsTab('logistics')}
                  role="tab" 
                  aria-selected={solutionsTab === 'logistics'} 
                  aria-controls="sol-tab-logistics"
                >
                  Lojistik ve Nakliye Firmaları
                </button>
                <button 
                  className={`solutions-tabs__btn ${solutionsTab === 'corporate' ? 'solutions-tabs__btn--active' : ''}`} 
                  onClick={() => setSolutionsTab('corporate')}
                  role="tab" 
                  aria-selected={solutionsTab === 'corporate'} 
                  aria-controls="sol-tab-corporate"
                >
                  Kurumsal Hizmet Şirketleri
                </button>
                <button 
                  className={`solutions-tabs__btn ${solutionsTab === 'health' ? 'solutions-tabs__btn--active' : ''}`} 
                  onClick={() => setSolutionsTab('health')}
                  role="tab" 
                  aria-selected={solutionsTab === 'health'} 
                  aria-controls="sol-tab-health"
                >
                  Sağlık ve Klinikler
                </button>
                <button 
                  className={`solutions-tabs__btn ${solutionsTab === 'construction' ? 'solutions-tabs__btn--active' : ''}`} 
                  onClick={() => setSolutionsTab('construction')}
                  role="tab" 
                  aria-selected={solutionsTab === 'construction'} 
                  aria-controls="sol-tab-construction"
                >
                  İnşaat ve Yapı Firmaları
                </button>
                <button 
                  className={`solutions-tabs__btn ${solutionsTab === 'b2b' ? 'solutions-tabs__btn--active' : ''}`} 
                  onClick={() => setSolutionsTab('b2b')}
                  role="tab" 
                  aria-selected={solutionsTab === 'b2b'} 
                  aria-controls="sol-tab-b2b"
                >
                  B2B Ürün Katalog Siteleri
                </button>
              </div>
              
              <div className="solutions-content-box">
                {/* Tab: Furniture */}
                <div className={`sol-tab-pane ${solutionsTab === 'furniture' ? 'sol-tab-pane--active' : ''}`} id="sol-tab-furniture" role="tabpanel">
                  <h3 className="sol-tab-pane__title">Mobilya ve Üretim Firmaları</h3>
                  <ul className="sol-tab-pane__list">
                    <li>Ürün/koleksiyon tanıtım yapısı</li>
                    <li>Katalog ve medya yönetimi</li>
                    <li>Form ve teklif talebi akışı</li>
                  </ul>
                </div>
                
                {/* Tab: Logistics */}
                <div className={`sol-tab-pane ${solutionsTab === 'logistics' ? 'sol-tab-pane--active' : ''}`} id="sol-tab-logistics" role="tabpanel">
                  <h3 className="sol-tab-pane__title">Lojistik ve Nakliye Firmaları</h3>
                  <ul className="sol-tab-pane__list">
                    <li>Gönderi takibi ve formları</li>
                    <li>Fiyat teklif talebi akışı</li>
                    <li>Dinamik bilgi talepleri yönetimi</li>
                  </ul>
                </div>
                
                {/* Tab: Corporate */}
                <div className={`sol-tab-pane ${solutionsTab === 'corporate' ? 'sol-tab-pane--active' : ''}`} id="sol-tab-corporate" role="tabpanel">
                  <h3 className="sol-tab-pane__title">Kurumsal Hizmet Şirketleri</h3>
                  <ul className="sol-tab-pane__list">
                    <li>SEO uyumlu hizmet sayfaları</li>
                    <li>Dijital itibar ve sunum odaklı tasarım</li>
                    <li>Güvenli iletişim formları</li>
                  </ul>
                </div>
                
                {/* Tab: Health */}
                <div className={`sol-tab-pane ${solutionsTab === 'health' ? 'sol-tab-pane--active' : ''}`} id="sol-tab-health" role="tabpanel">
                  <h3 className="sol-tab-pane__title">Sağlık ve Klinikler</h3>
                  <ul className="sol-tab-pane__list">
                    <li>Tedavi ve hekim tanıtım yapısı</li>
                    <li>KVKK / GDPR uyumlu formlar</li>
                    <li>Randevu / bilgi talebi akışı</li>
                  </ul>
                </div>
                
                {/* Tab: Construction */}
                <div className={`sol-tab-pane ${solutionsTab === 'construction' ? 'sol-tab-pane--active' : ''}`} id="sol-tab-construction" role="tabpanel">
                  <h3 className="sol-tab-pane__title">İnşaat ve Yapı Firmaları</h3>
                  <ul className="sol-tab-pane__list">
                    <li>Yüksek çözünürlüklü proje portföyü</li>
                    <li>Teknik detay ve şartname tabloları</li>
                    <li>Dinamik teklif ve iş geliştirme formları</li>
                  </ul>
                </div>
                
                {/* Tab: B2B */}
                <div className={`sol-tab-pane ${solutionsTab === 'b2b' ? 'sol-tab-pane--active' : ''}`} id="sol-tab-b2b" role="tabpanel">
                  <h3 className="sol-tab-pane__title">B2B Ürün Katalog Siteleri</h3>
                  <ul className="sol-tab-pane__list">
                    <li>Hızlı arama ve filtreleme altyapısı</li>
                    <li>Teknik veri ve PDF kılavuz yönetimi</li>
                    <li>Toplu teklif ve katalog talebi akışı</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Yayına Alma Akışı */}
        <section className="process" id="process">
          <div className="container">
            <div className="section-header section-header--center">
              <span className="section-header__tag">Akış</span>
              <h2 className="section-header__title">Yayına Alma Akışı</h2>
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
                <h3 className="process-card__title">Yayına Alma & Bakım</h3>
                <p className="process-card__desc">
                  Altyapıyı güvenli küresel ağlarda yayınlıyor, periyodik teknik kontroller ve güncellemelerle sistemin sürekliliğini sağlıyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>





        {/* 11. Güven Katmanı */}
        <section className="trust" id="trust">
          <div className="container">
            <div className="section-header section-header--center">
              <span className="section-header__tag">Güven Katmanı</span>
              <h2 className="section-header__title">Güven Katmanı</h2>
            </div>
            <div className="trust__grid">
              <div className="trust-item">
                <h3 className="trust-item__title">Hafif Kod Mimarisi</h3>
                <p className="trust-item__desc">
                  Eklentilerle şişirilmemiş, saf ve temiz kod blokları sayesinde web siteniz her tarayıcıda kararlı çalışır.
                </p>
              </div>
              <div className="trust-item">
                <h3 className="trust-item__title">Mobil Uyum</h3>
                <p className="trust-item__desc">
                  Cihaz bağımsız, tüm ekran boyutlarına tam uyumlu esnek tasarım yapısı sayesinde kesintisiz mobil deneyim.
                </p>
              </div>
              <div className="trust-item">
                <h3 className="trust-item__title">SSL Destekli Yayın</h3>
                <p className="trust-item__desc">
                  Otomatik güncellenen SSL sertifikası ile siteniz üzerinden geçen tüm veriler en üst düzeyde şifrelenir.
                </p>
              </div>
              <div className="trust-item">
                <h3 className="trust-item__title">SEO Uyumlu Sayfa İskeleti</h3>
                <p className="trust-item__desc">
                  Arama motorları ve anlamsal YZ tarayıcı botları için optimize edilmiş HTML5 etiket düzeni.
                </p>
              </div>
              <div className="trust-item">
                <h3 className="trust-item__title">Güvenli Form Altyapısı</h3>
                <p className="trust-item__desc">
                  Gelişmiş spam koruması ve veri filtreleme algoritmalarıyla güvenliği sağlanmış form yapıları.
                </p>
              </div>
              <div className="trust-item">
                <h3 className="trust-item__title">Panelden Yönetim</h3>
                <p className="trust-item__desc">
                  Sadece işletmenizin ihtiyaç duyduğu alanları yönetebileceğiniz, sadeleştirilmiş müşteri kontrol paneli.
                </p>
              </div>
              <div className="trust-item">
                <h3 className="trust-item__title">Yayın Öncesi Kontrol Süreci</h3>
                <p className="trust-item__desc">
                  Yayın öncesinde tarayıcı uyumluluğu, Core Web Vitals performans hedefleri ve form doğrulamaları test edilerek sıfır hata hedeflenir.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 12. Projeni Planlayalım (Form) */}
        <section className="contact" id="contact">
          <div className="container">
            <div className="contact__wrapper">
              <div className="contact__info">
                <h2 className="contact__title">Web sitenizi yönetilebilir bir sisteme dönüştürelim.</h2>
                <p className="contact__desc">
                  CoreWeb ile yalnızca yayına alınan bir web sitesi değil; içerikleri, formları, SEO kontrolleri ve yayın süreci yönetilebilen uzun vadeli bir dijital altyapı kurun.
                </p>
              </div>
              
              <div className="contact__form-box">
                <form className="contact-form" id="main-contact-form" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="form-name" className="form-label">Ad Soyad *</label>
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
                    <label htmlFor="form-company" className="form-label">Firma Adı *</label>
                    <input 
                      type="text" 
                      id="form-company" 
                      name="company" 
                      className="form-input" 
                      required 
                      placeholder="Örn. CoreWeb A.Ş." 
                      value={formData.company}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="form-email" className="form-label">E-posta Adresi *</label>
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
                    <label htmlFor="form-phone" className="form-label">Telefon Numarası *</label>
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
                    <label htmlFor="form-projectType" className="form-label">Proje Türü *</label>
                    <select 
                      id="form-projectType" 
                      name="projectType" 
                      className="form-input" 
                      required
                      value={formData.projectType}
                      onChange={handleInputChange}
                      disabled={loading}
                    >
                      <option value="" disabled>Lütfen seçin...</option>
                      <option value="Kurumsal Web Sitesi">Kurumsal Web Sitesi</option>
                      <option value="Ürün Katalog Sitesi">Ürün Katalog Sitesi</option>
                      <option value="Hizmet Tanıtım Altyapısı">Hizmet Tanıtım Altyapısı</option>
                      <option value="Diğer">Diğer</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="form-message" className="form-label">Mesajınız</label>
                    <textarea 
                      id="form-message" 
                      name="message" 
                      className="form-input form-input--textarea" 
                      placeholder="Projeniz hakkında detaylar verin..."
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
  );
}
