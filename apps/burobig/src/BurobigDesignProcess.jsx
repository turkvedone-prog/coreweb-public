import { useEffect } from 'react';
import { useSite } from './layouts/SiteLayout';
import { updateSEOMeta } from '../../utils/seo';

export default function BurobigDesignProcess() {
  const { activeLang } = useSite();
  const translate = (tr, en, ar) => {
    if (activeLang === 'ar') return ar || en || tr;
    if (activeLang === 'en') return en || tr;
    return tr;
  };

  useEffect(() => {
    updateSEOMeta({
      title: activeLang === 'tr' ? 'Tasarım Süreci' : activeLang === 'ar' ? 'عملية التصميم' : 'Design Process',
      description: activeLang === 'tr' 
        ? 'İlk karalamadan bitmiş premium ofis ürününe kadar Bürobig tasarım ve üretim süreci.' 
        : activeLang === 'ar' 
        ? 'عملية تصميم وإنتاج بيروبيج من الرسم الأولي إلى المنتج المكتبي الفاخر النهائي.' 
        : 'The Bürobig design and production process from initial sketch to finished premium office product.',
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
          <span className="corporate-top-title">{translate('KURUMSAL / TASARIM SÜRECİ', 'CORPORATE / DESIGN PROCESS', 'الشركة / عملية التصميم')}</span>
        </div>

        {/* SECTION: TASARIM SÜRECİ */}
        <section className="corporate-section reveal-up" style={{ borderBottom: 'none', paddingTop: '2rem' }}>
          <div className="corporate-grid">
            <div className="corporate-left">
              <h1 className="corporate-large-title">
                {translate('Süreçte zeka. Kontrolde ustalık.', 'Intelligence in process. Mastery in control.', 'الذكاء في العملية. الإتقان في السيطرة.')}
              </h1>
              <h2 className="corporate-sub-title">
                {translate('Tasarım Sürecimiz', 'Our Design Process', 'عملية التصميم لدينا')}
              </h2>
              <div className="corporate-text-wrapper">
                <p>
                  {translate(
                    "Bürobig'te tasarım, deneyimli tasarımcıların bilgi birikimi ve sezgisiyle başlar. İşinde uzmanlaşmış ekibimiz, erken aşamada fikirleri test etmek, oranları değerlendirmek ve alternatifleri hızla analiz etmek amacıyla yapay zekâ destekli sistemlerden yararlanır.",
                    "At Bürobig, design begins with the knowledge and intuition of experienced designers. Our specialized team utilizes AI-supported systems to test ideas at an early stage, evaluate proportions, and analyze alternatives rapidly.",
                    "في بيروبيج، يبدأ التصميم بالمعرفة والحدس لدى المصممين ذوي الخبرة. يستخدم فريقنا المتخصص أنظمة مدعومة بالذكاء الاصطناعي لاختبار الأفكار في مرحلة مبكرة، وتقييم النسب، وتحليل البدائل بسرعة."
                  )}
                </p>
                <p>
                  {translate(
                    "Bürobig Tasarım Laboratuvarı, bu sürecin merkezinde yer alır. Burada yapay zekâ, karar veren değil; tasarımcıyı destekleyen bir araç olarak konumlanır. Form, denge, işlev ve karakter gibi temel tasarım kararları, insan eli ve profesyonel deneyimle şekillenir.",
                    "The Bürobig Design Laboratory lies at the center of this process. Here, artificial intelligence is positioned not as a decision-maker, but as a tool supporting the designer. Fundamental design decisions such as form, balance, function, and character are shaped by human hands and professional experience.",
                    "يقع مختبر تصميم بيروبيج في قلب هذه العملية. هنا، لا يتم وضع الذكاء الاصطناعي كصانع قرار، بل كأداة تدعم المصمم. يتم تشكيل قرارات التصميم الأساسية مثل الشكل والتوازن والوظيفة والشخصية من خلال الأيدي البشرية والخبرة المهنية."
                  )}
                </p>
                <p>
                  {translate(
                    "Her ürün, disiplin, kontrol and ustalıkla ele alınır. Teknoloji süreci hızlandırır, uzmanlık yön verir. Sonuç olarak ortaya çıkan her tasarım, hesaplanmış bir aklın ve rafine edilmiş bir el emeğinin ürünüdür.",
                    "Each product is handled with discipline, control, and mastery. Technology accelerates the process, expertise guides it. Consequently, every design that emerges is the product of a calculated mind and refined craftsmanship.",
                    "يتم التعامل مع كل منتج بانضباط وسيطرة وإتقان. تعمل التكنولوجيا على تسريع العملية، وتوجهها الخبرة. وبالتالي، فإن كل تصميم يظهر هو نتاج عقل مدروس وحرفية مكررة."
                  )}
                </p>
              </div>
            </div>
            <div className="corporate-right">
              <div className="corporate-image-box">
                <img 
                  src="/assets/burobig/images/Tasarim%20Sureci.webp" 
                  alt={translate("Tasarım Süreci — Bürobig", "Design Process — Bürobig", "عملية التصميم — بيروبيج")} 
                />
              </div>
              <div style={{ marginTop: '1.5rem', textAlign: 'left' }}>
                <div className="corporate-text-wrapper" style={{ marginBottom: '2rem' }}>
                  <p style={{ fontSize: '1.1rem', fontWeight: 400, color: '#1a1a1a', marginBottom: '0.5rem' }}>
                    {translate('Bazı formlar zamansızdır.', 'Some forms are timeless.', 'بعض الأشكال خالدة.')}
                  </p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 400, color: '#1a1a1a', marginBottom: '1.25rem' }}>
                    {translate('Bazı nesneler mekâna sadece işlev değil, karakter de katar.', 'Some objects add not only function, but also character to the space.', 'تضيف بعض الأشياء ليس فقط وظيفة، بل أيضًا طابعًا للمساحة.')}
                  </p>
                  <p style={{ fontSize: '0.95rem', color: '#555555', lineHeight: 1.7, fontWeight: 300 }}>
                    {translate(
                      "Adını aldığı monolitik mimariden ilham alan MONOLITH, bw3, sessiz duruşuyla gücü yansıtır. Yuvarlatılmış traverten tablası ve altındaki heykelsi hacimleriyle, sıradan bir çalışma masasından odanın odak noktasına dönüşür.",
                      "Inspired by the monolithic architecture from which it gets its name, MONOLITH, bw3, reflects strength with its silent stance. With its rounded travertine top and sculptural volumes beneath, it transforms from an ordinary desk into the focal point of the room.",
                      "مستوحى من الهندسة المعمارية المتجانسة التي أخذ منها اسمه، يعكس MONOLITH، bw3، القوة بموقفه الصامت. مع سطحه الدائري من الترافرتين وأحجامه النحتية بالأسفل، يتحول من مكتب عادي إلى نقطة محورية في الغرفة."
                    )}
                  </p>
                </div>
                <div style={{ borderTop: '1px solid #eaeaea', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ fontFamily: "var(--font-primary)", fontSize: '1.8rem', fontWeight: 400, letterSpacing: '2px', color: '#0e2922', textTransform: 'uppercase' }}>MONOLITH</span>
                  <span style={{ fontFamily: "var(--font-primary)", fontStyle: 'italic', fontSize: '1.25rem', color: '#c9a96e' }}>
                    {translate('Bürobig Tasarım Ekibi', 'Bürobig Design Team', 'فريق تصميم بيروبيج')}
                  </span>
                  <span style={{ fontSize: '0.7rem', letterSpacing: '3px', color: '#8c9094', textTransform: 'uppercase', marginTop: '0.5rem', fontWeight: 500 }}>
                    {translate('KONSEPT ESKİZ', 'CONCEPT SKETCH', 'رسم مفهوم')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
