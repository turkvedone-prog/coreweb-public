import { useEffect } from 'react';
import { useSite } from './layouts/SiteLayout';
import { updateSEOMeta } from '../../utils/seo';

export default function BurobigQualityPolicy() {
  const { activeLang } = useSite();
  const translate = (tr, en, ar) => {
    if (activeLang === 'ar') return ar || en || tr;
    if (activeLang === 'en') return en || tr;
    return tr;
  };

  useEffect(() => {
    updateSEOMeta({
      title: activeLang === 'tr' ? 'Kalite Politikamız' : activeLang === 'ar' ? 'سياسة الجودة لدينا' : 'Our Quality Policy',
      description: activeLang === 'tr' 
        ? 'Uluslararası standartlarda, sürdürülebilir ve yüksek standartlı Bürobig kalite güvencesi.' 
        : activeLang === 'ar' 
        ? 'ضمان الجودة من بيروبيج بالمعايير الدولية والمستدامة والعالية.' 
        : 'International standard, sustainable and high-standard Bürobig quality assurance.',
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
          <span className="corporate-top-title">{translate('KURUMSAL / KALİTE POLİTİKAMIZ', 'CORPORATE / OUR QUALITY POLICY', 'الشركة / سياسة الجودة لدينا')}</span>
        </div>

        {/* SECTION: KALİTE POLİTİKAMIZ */}
        <section className="corporate-section reveal-up" style={{ borderBottom: 'none', paddingTop: '2rem' }}>
          <div className="corporate-grid">
            <div className="corporate-left">
              <h1 className="corporate-large-title">
                {translate('Her çözüm, sıfır hata payı hedefiyle üretilir.', 'Every solution is produced with a target of zero margin of error.', 'يتم إنتاج كل حل بهدف صفر هامش خطأ.')}
              </h1>
              <h2 className="corporate-sub-title">
                {translate('Disiplinli yaklaşım. Kalıcı kalite. Sessiz güç.', 'Disciplined approach. Lasting quality. Silent power.', 'نهج منضبط. جودة دائمة. قوة صامتة.')}
              </h2>
              <div className="corporate-text-wrapper">
                <p>
                  {translate(
                    "Bürobig'de kalite, denetlenen bir sonuç değil, başından itibaren uygulanan bir disiplindir. Tasarımın ilk kararından, üretimin son detayına kadar tüm süreçlerimiz bu disiplin üzerine kurulur.",
                    "At Bürobig, quality is not a controlled result, but a discipline applied from the very beginning. From the first decision of design to the last detail of production, all our processes are built on this discipline.",
                    "في بيروبيج، الجودة ليست نتيجة خاضعة للرقابة، بل هي نظام يتم تطبيقه منذ البداية. من القرار الأول للتصميم إلى التفاصيل الأخيرة للإنتاج، تبنى جميع عملياتنا على هذا النظام."
                  )}
                </p>
                <p>
                  {translate(
                    "Her ürün, aynı netlikle ele alınır. Her süreç, aynı dikkatle yürütülür. Her detay, aynı seviyede tamamlanır.",
                    "Each product is handled with the same clarity. Each process is conducted with the same care. Each detail is completed at the same level.",
                    "يتم التعامل مع كل منتج بنفس الوضوح. يتم إجراء كل عملية بنفس الرعاية. يتم الانتهاء من كل تفصيل على نفس المستوى."
                  )}
                </p>
                <p>
                  {translate(
                    "Kaliteyi söylemlerle değil, tekrar edilebilir sonuçlarla tanımlarız. Malzeme seçiminden işçiliğe, üretim akışından son kontrole kadar her aşama, tutarlılık ve süreklilik esasına göre yönetilir. Bürobig ürünleri bu nedenle ilk günden itibaren güven verir ve zamanla değer kazanır.",
                    "We define quality not with rhetoric, but with repeatable results. From material selection to craftsmanship, from production flow to final control, every stage is managed on the basis of consistency and continuity. Therefore, Bürobig products reassure from the first day and gain value over time.",
                    "نحن نعرف الجودة ليس بالبلاغة، بل بالنتائج القابلة للتكرار. من اختيار المواد إلى الحرفية، ومن تدفق الإنتاج إلى الرقابة النهائية، يتم إدارة كل مرحلة على أساس الاتساق والاستمرارية. لذلك، فإن منتجات بيروبيج تطمئن منذ اليوم الأول وتكتسب قيمة بمرور الوقت."
                  )}
                </p>
              </div>
            </div>
            <div className="corporate-right">
              <div className="corporate-text-wrapper">
                <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Bürobig;</p>
                <ul className="corporate-list">
                  <li>{translate('Kaliteyi şansa bırakmaz, sistemli biçimde üretir,', 'Does not leave quality to chance, produces systematically,', 'لا يترك الجودة للصدفة، ينتج بشكل منهجي،')}</li>
                  <li>{translate('Disiplinden taviz vermez,', 'Does not compromise on discipline,', 'لا يساوم على الانضباط،')}</li>
                  <li>{translate('Aynı kalite seviyesini her üründe korur,', 'Maintains the same quality level in every product,', 'يحافظ على نفس مستوى الجودة في كل منتج،')}</li>
                  <li>{translate('Uzun ömürlü ve sürdürülebilir çözümler benimser,', 'Adopts long-lasting and sustainable solutions,', 'يعتمد حلولاً طويلة الأمد ومستدامة،')}</li>
                  <li>{translate('Çevreye ve kaynaklara karşı sorumluluk bilinciyle hareket eder,', 'Acts with a sense of responsibility towards environment and resources,', 'يعمل بحس المسؤولية تجاه البيئة والموارد،')}</li>
                  <li>{translate('Kalite bilincini kurum kültürünün ayrılmaz bir parçası olarak görür.', 'Sees quality awareness as an inseparable part of corporate culture.', 'يرى الوعي بالجودة كجزء لا يتجزأ من ثقافة الشركة.')}</li>
                </ul>
                <p style={{ marginTop: '2rem' }}>
                  {translate(
                    "Bizim için kalite, dikkat çekmek için yükseltilmiş bir ses değildir. Kullanıldıkça hissedilen, zamanla kendini kanıtlayan sessiz bir güçtür.",
                    "For us, quality is not a raised voice to attract attention. It is a silent power felt as it is used, proving itself over time.",
                    "بالنسبة لنا، الجودة ليست صوتًا مرتفعًا لجذب الانتباه. إنها قوة صامتة تشعر بها عند استخدامها، وتثبت نفسها بمرور الوقت."
                  )}
                </p>
                <p>
                  {translate(
                    "Bu kalite politikası; Bürobig'in disiplinli yaklaşımını, kalıcı kalite anlayışını ve tüm faaliyetlerinde sürdürdüğü net duruşu ifade eder.",
                    "This quality policy expresses Bürobig's disciplined approach, permanent quality understanding, and the clear stance maintained in all its activities.",
                    "تعبر سياسة الجودة هذه عن نهج بيروبيج المنضبط، وفهم الجودة الدائم، والموقف الواضح الذي يتم الحفاظ عليه في جميع أنشطته."
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="corporate-image-box corporate-image-box--bottom" style={{ marginTop: '4rem' }}>
            <img 
              src="/assets/burobig/images/Kalite%20Politikamiz.webp" 
              alt={translate("Her çözüm sıfır hata payıyla üretilir — Kalite Politikamız", "Every solution is produced with zero margin of error — Our Quality Policy", "يتم إنتاج كل حل مع صفر هامش خطأ — سياسة الجودة لدينا")} 
            />
          </div>
        </section>

      </div>
    </main>
  );
}
