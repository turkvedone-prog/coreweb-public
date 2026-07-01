import { useEffect } from 'react';
import { useSite } from './layouts/SiteLayout';
import { updateSEOMeta } from '../../utils/seo';

export default function BurobigSustainability() {
  const { activeLang } = useSite();
  const translate = (tr, en, ar) => {
    if (activeLang === 'ar') return ar || en || tr;
    if (activeLang === 'en') return en || tr;
    return tr;
  };

  useEffect(() => {
    updateSEOMeta({
      title: activeLang === 'tr' ? 'Sürdürülebilirlik' : activeLang === 'ar' ? 'الاستدامة' : 'Sustainability',
      description: activeLang === 'tr' 
        ? 'Geleceği korumayı merkeze alan çevre odaklı premium ofis mobilyası üretim anlayışımız.' 
        : activeLang === 'ar' 
        ? 'نهج إنتاج أثاث المكاتب الفاخر الصديق للبيئة والذي يركز على حماية المستقبل.' 
        : 'Our environment-oriented premium office furniture production approach centered on protecting the future.',
      companyName: 'Bürobig Mobilya'
    });
  }, [activeLang]);

  useEffect(() => {
    // Reveal Animation
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
  }, []);

  return (
    <main id="main-content" className="corporate-page">
      <div className="corporate-container">
        
        {/* Page Top Indicator */}
        <div className="corporate-top-bar">
          <span className="corporate-top-title">{translate('KURUMSAL / SÜRDÜRÜLEBİLİRLİK', 'CORPORATE / SUSTAINABILITY', 'الشركة / الاستدامة')}</span>
        </div>

        {/* SECTION: SÜRDÜRÜLEBİLİRLİK */}
        <section className="corporate-section reveal-up" style={{ borderBottom: 'none', paddingTop: '2rem' }}>
          <div className="corporate-grid">
            <div className="corporate-left">
              <h1 className="corporate-large-title">
                {translate('Geleceği korumayı merkeze alan çevre odaklı bir anlayış.', 'An environment-oriented understanding centered on protecting the future.', 'فهم يركز على البيئة ويتمحور حول حماية المستقبل.')}
              </h1>
              <h2 className="corporate-sub-title">
                {translate('Gelecek için tasarlarız.', 'We design for the future.', 'نحن نصممه للمستقبل.')}
              </h2>
            </div>
            <div className="corporate-right">
              <div className="corporate-text-wrapper">
                <p>
                  {translate(
                    "Geleceği korumayı merkeze alan çevre odaklı bir anlayışla tasarlıyor ve üretiyoruz. Tasarımın ilk fikrinden üretimin son aşamasına kadar her adımda doğaya karşı sorumluluğumuzu gözetiyor, aldığımız her kararı uzun vadeli etkileriyle değerlendiriyoruz. Kaynakları bilinçli kullanmayı, israfı azaltmayı ve sürdürülebilir malzeme seçimlerini üretim kültürümüzün ayrılmaz bir parçası olarak görüyoruz.",
                    "We design and produce with an environment-oriented understanding centered on protecting the future. At every step from the first concept of design to the last phase of production, we respect our responsibility towards nature, and evaluate every decision we make with its long-term effects. We see conscious resource usage, waste reduction, and sustainable material selection as an inseparable part of our production culture.",
                    "نحن نصمم وننتج بفهم يركز على البيئة ويتمحور حول حماية المستقبل. في كل خطوة من المفهوم الأول للتصميم إلى المرحلة الأخيرة من الإنتاج، نحترم مسؤوليتنا تجاه الطبيعة، ونقيم كل قرار نتخذه بتأثيراته على المدى الطويل. نحن نرى الاستخدام الواعي للموارد، والحد من النفايات، واختيار المواد المستدامة كجزء لا يتجزأ من ثقافة الإنتاج لدينا."
                  )}
                </p>
                <p>
                  {translate(
                    "Uzun ömürlü, dayanıklı ve çevreyle uyumlu çözümler geliştirerek yalnızca bugünün ihtiyaçlarına değil, yarının beklentilerine de cevap vermeyi hedefliyoruz. Çevreye saygıyı bir söylem değil, iş yapma biçimimizin doğal bir sonucu olarak benimsiyor; sorumlu üretimin geleceğin tasarım anlayışını belirleyeceğine inanıyoruz.",
                    "By developing long-lasting, durable, and environment-compatible solutions, we aim to meet not only today's needs but also tomorrow's expectations. We adopt respect for environment not as a rhetoric, but as a natural consequence of our way of doing business; we believe that responsible production will define the design concept of the future.",
                    "من خلال تطوير حلول طويلة الأمد ومتينة ومتوافقة مع البيئة، نهدف إلى تلبية ليس فقط احتياجات اليوم ولكن أيضًا توقعات الغد. نحن نتبنى احترام البيئة ليس كبلاغة، بل كنتيجة طبيعية لطريقتنا في ممارسة الأعمال؛ ونحن نعتقد أن الإنتاج المسؤول سيحدد مفهوم التصميم في المستقبل."
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="corporate-image-box corporate-image-box--bottom" style={{ marginTop: '4rem' }}>
            <img 
              src="/assets/burobig/images/Surdurebilirlik.webp" 
              alt={translate("Sürdürülebilirlik — Bürobig", "Sustainability — Bürobig", "الاستدامة — بيروبيج")} 
            />
          </div>
        </section>

      </div>
    </main>
  );
}
