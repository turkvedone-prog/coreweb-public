import { useEffect } from 'react';
import { useSite } from './layouts/SiteLayout';

export default function BurobigEcoBanner() {
  const { activeLang } = useSite();
  const translate = (tr, en, ar) => {
    if (activeLang === 'ar') return ar || en || tr;
    if (activeLang === 'en') return en || tr;
    return tr;
  };
  // Safe Intersection Observer for scroll animation reveal-up
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="eco-section reveal-up" aria-label={translate('Sürdürülebilirlik ve Çevre', 'Sustainability and Environment', 'الاستدامة والبيئة')} id="eco-banner">
      <div className="eco-container">
        <div className="eco-card">
          <div className="eco-header">
            <h2 className="eco-title">{translate('Sürdürülebilir Üretim, Güvenilir Standartlar', 'Sustainable Production, Reliable Standards', 'إنتاج مستدام، معايير موثوقة')}</h2>
            <p className="eco-subtitle">{translate('Doğaya duyarlı üretim anlayışımız, yeşil enerji kullanımı ve uluslararası kalite standartlarına uygun malzeme seçimimizle geleceğe değer katıyoruz.', 'With our environment-friendly production approach, green energy usage, and material selection complying with international quality standards, we add value to the future.', 'من خلال نهج الإنتاج الصديق للبيئة، واستخدام الطاقة الخضراء، واختيار المواد المتوافقة مع معايير الجودة الدولية، نضيف قيمة إلى المستقبل.')}</p>
          </div>
          <div className="eco-grid">
            <div className="eco-item">
              <div className="eco-icon-wrapper">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 2 7a8 8 0 0 1-7.9 8.07c-.4 0-.75-.1-.75-.1a7 7 0 0 1-1.35 3.03z"></path>
                  <path d="M19 2c-3 4-8 5.5-10 11"></path>
                </svg>
              </div>
              <h3 className="eco-item-title">{translate('Çevreye Duyarlı Üretim', 'Eco-Friendly Production', 'إنتاج صديق للبيئة')}</h3>
              <p className="eco-item-text">{translate('Üretim süreçlerimizde doğaya saygılı, kaynakları verimli kullanan ve sürdürülebilir yöntemleri benimsiyoruz.', 'In our production processes, we adopt environment-friendly, resource-efficient and sustainable methods.', 'في عمليات الإنتاج لدينا، نعتمد طرقًا صديقة للبيئة وموفرة للموارد ومستدامة.')}</p>
            </div>

            <div className="eco-item">
              <div className="eco-icon-wrapper">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <h3 className="eco-item-title">{translate('Yeşil Enerji Yaklaşımı', 'Green Energy Approach', 'نهج الطاقة الخضراء')}</h3>
              <p className="eco-item-text">{translate('Enerji kullanımında çevresel etkiyi azaltan, yenilenebilir ve verimli çözümleri önceliklendiriyoruz.', 'We prioritize renewable and efficient solutions that reduce environmental impact in energy usage.', 'نحن نعطي الأولوية للحلول المتجددة والفعالة التي تقلل من التأثير البيئي في استخدام الطاقة.')}</p>
            </div>

            <div className="eco-item">
              <div className="eco-icon-wrapper">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <h3 className="eco-item-title">{translate('Kaliteli ve Güvenli Malzemeler', 'Quality and Safe Materials', 'مواد عالية الجودة وآمنة')}</h3>
              <p className="eco-item-text">{translate('Kullanılan malzemeler dayanıklılık, hijyen, güvenlik ve uzun ömür kriterlerine göre titizlikle seçilir.', 'The materials used are meticulously selected based on criteria of durability, hygiene, safety, and longevity.', 'يتم اختيار المواد المستخدمة بدقة بناءً على معايير المتانة والنظافة والسلامة وطول العمر.')}</p>
            </div>

            <div className="eco-item">
              <div className="eco-icon-wrapper">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
              </div>
              <h3 className="eco-item-title">{translate('Uluslararası Standartlar', 'International Standards', 'المعايير الدولية')}</h3>
              <p className="eco-item-text">{translate('Ürün ve hizmet süreçlerimizde global kalite anlayışına uygun, güven veren standartları esas alıyoruz.', 'In our product and service processes, we base our work on reassuring standards in line with global quality understanding.', 'في عمليات منتجاتنا وخدماتنا، نستند في عملنا إلى معايير مطمئنة تتماشى مع فهم الجودة العالمي.')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
