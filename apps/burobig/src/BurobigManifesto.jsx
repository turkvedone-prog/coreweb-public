import { useEffect } from 'react';
import { useSite } from './layouts/SiteLayout';
import { updateSEOMeta } from '../../utils/seo';

export default function BurobigManifesto() {
  const { activeLang } = useSite();
  const translate = (tr, en, ar) => {
    if (activeLang === 'ar') return ar || en || tr;
    if (activeLang === 'en') return en || tr;
    return tr;
  };

  useEffect(() => {
    updateSEOMeta({
      title: activeLang === 'tr' ? 'Manifesto' : activeLang === 'ar' ? 'البيان' : 'Manifesto',
      description: activeLang === 'tr' 
        ? 'Çalışma alanlarının geleceğine dair inancımızı ve tasarım manifestomuzu keşfedin.' 
        : activeLang === 'ar' 
        ? 'اكتشف إيماننا بمستقبل مساحات العمل وبيان التصميم الخاص بنا.' 
        : 'Discover our belief in the future of work spaces and our design manifesto.',
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
          <span className="corporate-top-title">{translate('KURUMSAL / MANİFESTO', 'CORPORATE / MANIFESTO', 'الشركة / البيان')}</span>
        </div>

        {/* SECTION: MANİFESTO */}
        <section className="corporate-section reveal-up" style={{ borderBottom: 'none', paddingTop: '2rem' }}>
          <div className="corporate-grid">
            <div className="corporate-left">
              <div className="manifesto-giant-title">
                {translate('TASARIMIN', 'TOMORROW OF', 'مستقبل')}<br />{translate('YARINI', 'DESIGN', 'التصميم')}
              </div>
              <h2 className="corporate-sub-title">
                {translate('Tasarımın Yarını', 'Tomorrow of Design', 'مستقبل التصميم')}
              </h2>
            </div>
            <div className="corporate-right">
              <div className="corporate-text-wrapper">
                <p>
                  {translate(
                    "Tasarımın yarını, biçimden önce mekânsal aklı merkeze alır. Görünenden çok, kurgulananla ilgilenir. Çünkü mimarlık, önce düşüncede başlar.",
                    "Tomorrow of design centers spatial mind before form. It deals with what is conceptualized rather than what is visible. Because architecture begins in thought first.",
                    "يضع غد التصميم العقل المكاني في المركز قبل الشكل. إنه يتعامل مع ما تم تصوره بدلاً من ما هو مرئي. لأن الهندسة المعمارية تبدأ في الفكر أولاً."
                  )}
                </p>
                <p>
                  {translate(
                    "Biz tasarımı; form üretmekten ziyade mekânı anlamlandırma süreci olarak ele alırız. Oran, ölçek, boşluk ve işlev arasındaki denge; tasarımın gerçek değerini belirler. Bu nedenle tasarımın yarını, yüzeyde değil, mekânın iç mantığında şekillenir.",
                    "We treat design not as producing forms, but as a process of making sense of space. The balance between proportion, scale, void, and function determines the true value of design. Therefore, the tomorrow of design is shaped not on the surface, but in the internal logic of space.",
                    "نحن نتعامل مع التصميم ليس كإنتاج للأشكال، بل كعملية إعطاء معنى للمساحة. يحدد التوازن بين النسبة والتحجيم والفراغ والوظيفة القيمة الحقيقية للتصميم. لذلك، يتشكل غد التصميم ليس على السطح، بل في المنطق الداخلي للمساحة."
                  )}
                </p>
                <p>
                  {translate(
                    "Bürobig için ofis; yalnızca yerleştirilen elemanlardan oluşan bir alan değil, bütüncül bir mekânsal kurgudur. Mobilya, bu kurgunun tamamlayıcısıdır. Mimariyle uyumlu, mekânla konuşan ve yapının karakterine saygı duyan bir dilin parçasıdır.",
                    "For Bürobig, the office is not just a space consisting of placed elements, but a holistic spatial setting. Furniture is the complement of this setting. It is part of a language that is compatible with architecture, talks to space, and respects the character of the structure.",
                    "بالنسبة لبيروبيج، لا يعد المكتب مجرد مساحة تتكون من عناصر موضوعة، بل هو إعداد مكاني شامل. الأثاث هو مكمل هذا الإعداد. إنه جزء من لغة متوافقة مع الهندسة المعمارية، وتتحدث إلى الفضاء، وتحترم طابع الهيكل."
                  )}
                </p>
                <p>
                  {translate(
                    "Tasarımın yarını; esnek kullanımı destekleyen, değişen çalışma senaryolarına uyum sağlayan, zamana direnmek yerine zamanla olgunlaşan bir yaklaşım gerektirir. Kalıcılık, gösterişle değil; doğru kararlarla sağlanır.",
                    "Tomorrow of design requires an approach that supports flexible use, adapts to changing work scenarios, and matures over time instead of resisting time. Permanence is achieved by right decisions, not by showiness.",
                    "يتطلب غد التصميم نهجًا يدعم الاستخدام المرن، ويتكيف مع سيناريوهات العمل المتغيرة، وينضج بمرور الوقت بدلاً من مقاومة الوقت. يتم تحقيق الديمومة من خلال القرارات الصحيحة، وليس من خلال التباهي."
                  )}
                </p>
                <p>
                  {translate(
                    "Biz trendleri referans almayız. Mekânı okur, bağlamı analiz eder ve tasarımı bu doğrultuda konumlandırırız. Çünkü iyi tasarım, bulunduğu yerle ilişki kurar; bağlamından kopuk değildir.",
                    "We do not reference trends. We read space, analyze context, and position design accordingly. Because good design establishes a relationship with where it is located; it is not detached from its context.",
                    "نحن لا نشير إلى الاتجاهات. نحن نقرأ المساحة، ونحلل السياق، ونضع التصميم وفقًا لذلك. لأن التصميم الجيد يقيم علاقة مع مكانه؛ فهو ليس منفصلاً عن سياقه."
                  )}
                </p>
                <p>
                  {translate(
                    "Tasarımın yarını; sessiz bir netlik, ölçülü bir iddia ve mimari tutarlılıkla tanımlanır.",
                    "Tomorrow of design is defined by silent clarity, measured claim, and architectural consistency.",
                    "يتم تعريف غد التصميم بالوضوح الصامت، والادعاء المدروس، والاتساق المعماري."
                  )}
                </p>
                <p style={{ fontWeight: 'bold' }}>
                  {translate("Biz bu tutarlılığı, her projede yeniden kurarız.", "We re-establish this consistency in every project.", "نحن نعيد تأسيس هذا الاتساق في كل مشروع.")}
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
