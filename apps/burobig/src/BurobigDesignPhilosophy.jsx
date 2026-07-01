import { useEffect } from 'react';
import { useSite } from './layouts/SiteLayout';
import { updateSEOMeta } from '../../utils/seo';

export default function BurobigDesignPhilosophy() {
  const { activeLang } = useSite();
  const translate = (tr, en, ar) => {
    if (activeLang === 'ar') return ar || en || tr;
    if (activeLang === 'en') return en || tr;
    return tr;
  };

  useEffect(() => {
    updateSEOMeta({
      title: activeLang === 'tr' ? 'Tasarım Felsefesi' : activeLang === 'ar' ? 'فلسفة التصميم' : 'Design Philosophy',
      description: activeLang === 'tr' 
        ? 'Ergonomi, estetik ve işlevselliği zamansız çizgilerle birleştiren Bürobig tasarım felsefesi.' 
        : activeLang === 'ar' 
        ? 'فلسفة تصميم بيروبيج التي تجمع بين بيئة العمل والجماليات والوظائف مع خطوط خالدة.' 
        : 'The Bürobig design philosophy combining ergonomics, aesthetics, and functionality with timeless lines.',
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
          <span className="corporate-top-title">{translate('KURUMSAL / TASARIM FELSEFESİ', 'CORPORATE / DESIGN PHILOSOPHY', 'الشركة / فلسفة التصميم')}</span>
        </div>

        {/* SECTION: TASARIM FELSEFESİ */}
        <section className="corporate-section reveal-up" style={{ borderBottom: 'none', paddingTop: '2rem' }}>
          <div className="corporate-grid">
            <div className="corporate-left">
              <h1 className="corporate-large-title">
                {translate('Köklü Duruş, Yenilikçi Yaklaşım.', 'Established Stance, Innovative Approach.', 'موقف راسخ، نهج مبتكر.')}
              </h1>
              <h2 className="corporate-sub-title">
                {translate('Geleceği yalnızca hayal etmiyoruz. Onu tasarlıyoruz.', 'We do not just imagine the future. We design it.', 'نحن لا نتخيل المستقبل فحسب. نحن نصممه.')}
              </h2>
            </div>
            <div className="corporate-right">
              <div className="corporate-text-wrapper">
                <p>
                  {translate(
                    "Bizim için tasarım bir form meselesi değil; bir duruş, bir vizyon ve bir karakter meselesidir. Dinamik ve cesur bir anlayışla hareket eder, fütürist bakış açısını minimal modernizmin rafineliğiyle harmanlarız. Zamana bağlı kalmayan, etkisini yitirmeyen çizgiler yaratırız. Trendlerin peşinden gitmeyiz, kendi trendimizi yaratırız.",
                    "For us, design is not a matter of form; it is a matter of stance, vision, and character. Moving with a dynamic and bold understanding, we blend futuristic perspective with the refinement of minimal modernism. We create lines that are not bound by time and do not lose their impact. We do not chase trends, we create our own trend.",
                    "بالنسبة لنا، التصميم ليس مسألة شكل؛ إنه مسألة موقف ورؤية وشخصية. من خلال التحرك بفهم ديناميكي وجريء، نمزج المنظور المستقبلي مع تحسين الحداثة البسيطة. نحن نخلق خطوطًا لا يحدها زمن ولا تفقد تأثيرها. نحن لا نلاحق الاتجاهات، بل نخلق اتجاهنا الخاص."
                  )}
                </p>
                <p>
                  {translate(
                    "Her projeye insanı merkeze alarak başlarız. Estetikle ergonomiyi, fonksiyonla duyguyu, teknolojiyle sanatı bir araya getiririz. Çünkü gerçek tasarım sadece güzel görünen değil, iyi hissettirendir. Her detay bilinçli, her çizgi anlamlıdır.",
                    "We start every project with human at the center. We combine aesthetics with ergonomics, function with emotion, technology with art. Because real design is not just what looks good, but what feels good. Every detail is conscious, every line is meaningful.",
                    "نبدأ كل مشروع مع الإنسان في المركز. نحن نجمع بين الجماليات وبيئة العمل، والوظيفة مع العاطفة، والتكنولوجيا مع الفن. لأن التصميم الحقيقي ليس فقط ما يبدو جيدًا، ولكن ما يشعر بالرضا. كل التفاصيل واعية، وكل خط ذو معنى."
                  )}
                </p>
                <p>
                  {translate(
                    "Ürünlerimizi birer obje olarak değil, yaşayan karakterler olarak ele alırız. Her tasarımın bir ruhu, bir hikâyesi ve bir amacı vardır. Mekânlara sadece mobilya değil; kimlik, atmosfer ve deneyim kazandırırız. Çünkü tasarım, kullanıcıyla bağ kurduğunda gerçek değerine ulaşır.",
                    "We treat our products not as objects, but as living characters. Each design has a soul, a story, and a purpose. We bring not just furniture to spaces; we bring identity, atmosphere, and experience. Because design reaches its true value when it establishes a bond with the user.",
                    "نحن نتعامل مع منتجاتنا ليس كأشياء، ولكن كشخصيات حية. كل تصميم له روح وقصة وهدف. نحن لا نجلب الأثاث فقط للمساحات؛ نجلب الهوية والجو والخبرة. لأن التصميم يصل إلى قيمته الحقيقية عندما يقيم رابطًا مع المستخدم."
                  )}
                </p>
                <p>
                  {translate(
                    "Bürobig olarak genç, dinamik ve özgür düşünen bir ekibiz. Sınırları zorlar, alışılmış kalıpları kırar ve henüz var olmayanın peşinden gideriz. Yapılmış olanı tekrar etmek bizi heyecanlandırmaz. Her projede bir adım ötesini hedefleriz. Cesur fikirlerden korkmayız, onları sahipleniriz. Çünkü fark, risk alanların yanındadır.",
                    "As Bürobig, we are a young, dynamic, and free-thinking team. We push the boundaries, break the conventional molds, and pursue what does not exist yet. Repeating what has been done does not excite us. We aim for one step further in every project. We are not afraid of bold ideas, we embrace them. Because the difference is on the side of those who take risks.",
                    "بصفتنا بيروبيج، نحن فريق شاب وديناميكي وحر التفكير. نحن ندفع الحدود، ونكسر القوالب التقليدية، ونسعى وراء ما ليس له وجود بعد. تكرار ما تم إنجازه لا يثيرنا. نحن نهدف إلى خطوة أخرى إلى الأمام في كل مشروع. نحن لا نخاف من الأفكار الجريئة، بل نتبناها. لأن الفرق يكمن في جانب من يتحمل المخاطر."
                  )}
                </p>
                <p>
                  {translate(
                    "Bizim için tasarım bir sonuç değil, bir yolculuktur. Ve bu yolculukta estetik, teknoloji, fonksiyon ve duygu aynı rotada ilerler.",
                    "For us, design is not a result, but a journey. And in this journey, aesthetics, technology, function, and emotion move on the same route.",
                    "بالنسبة لنا، التصميم ليس نتيجة، بل رحلة. وفي هذه الرحلة، تتحرك الجماليات والتكنولوجيا والوظيفة والعاطفة على نفس المسار."
                  )}
                </p>
                <p style={{ fontWeight: 'bold', marginTop: '2rem' }}>
                  {translate(
                    "Gelecek sıradan olanı değil, fark yaratanı hatırlar. Biz fark yaratmak için buradayız.",
                    "The future remembers the difference-maker, not the ordinary. We are here to make a difference.",
                    "المستقبل يتذكر من يصنع الفرق، وليس العادي. نحن هنا لنصنع فرقًا."
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
