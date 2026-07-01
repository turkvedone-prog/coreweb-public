import { useEffect } from 'react';
import { useSite } from './layouts/SiteLayout';
import { updateSEOMeta } from '../../utils/seo';

export default function BurobigHistory() {
  const { activeLang } = useSite();
  const translate = (tr, en, ar) => {
    if (activeLang === 'ar') return ar || en || tr;
    if (activeLang === 'en') return en || tr;
    return tr;
  };

  useEffect(() => {
    updateSEOMeta({
      title: activeLang === 'tr' ? 'Hikayemiz' : activeLang === 'ar' ? 'قصتنا' : 'Our Story',
      description: activeLang === 'tr' 
        ? 'Bürobig premium ofis mobilyalarının 1986 yılından günümüze uzanan başarı hikayesi.' 
        : activeLang === 'ar' 
        ? 'قصة نجاح أثاث المكاتب الفاخر من بيروبيج من عام 1986 إلى الوقت الحاضر.' 
        : 'The success story of Bürobig premium office furniture from 1986 to the present.',
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
          <span className="corporate-top-title">{translate('KURUMSAL / HİKAYEMİZ', 'CORPORATE / OUR STORY', 'الشركة / قصتنا')}</span>
        </div>

        {/* SECTION: HİKAYEMİZ */}
        <section className="corporate-section reveal-up" style={{ borderBottom: 'none', paddingTop: '2rem' }}>
          <div className="corporate-grid">
            <div className="corporate-left">
              <h1 className="corporate-large-title">
                {translate(
                  "Bürobig, 1986'dan beri derin köklerinden aldığı özgüvenle üretiyor.",
                  "Bürobig has been producing since 1986 with self-confidence drawn from its deep roots.",
                  "تنتج بيروبيج منذ عام 1986 بثقة بالنفس مستمدة من جذورها العميقة."
                )}
              </h1>
              <h2 className="corporate-sub-title">
                {translate('Küçük Bir Atölye. Büyük Bir Ciddiyet.', 'A Small Workshop. Great Seriousness.', 'ورشة عمل صغيرة. جدية كبيرة.')}
              </h2>
            </div>
            <div className="corporate-right">
              <div className="corporate-text-wrapper">
                <p>
                  {translate(
                    "1986 yılında kurulan Bürobig, ofis mobilyası sektöründe kaliteyi bir standart değil, bir kültür olarak benimseyen köklü ve saygın bir markadır. Kuruluşundan bu yana güven, sürdürülebilirlik ve süreklilik ilkeleri doğrultusunda faaliyet gösteren Bürobig; istikrarlı büyüme stratejisi, yüksek üretim standartları ve güçlü kurumsal yapısı sayesinde sektörde ayrıcalıklı bir konum elde etmiştir.",
                    "Founded in 1986, Bürobig is an established and respected brand that adopts quality not as a standard, but as a culture in the office furniture sector. Operating in line with the principles of trust, sustainability, and continuity since its inception, Bürobig has gained a privileged position in the sector thanks to its stable growth strategy, high production standards, and strong corporate structure.",
                    "تأسست شركة بيروبيج عام 1986، وهي علامة تجارية راسخة ومحترمة تتبنى الجودة ليس كمعيار، بل كثقافة في قطاع أثاث المكاتب. تعمل شركة بيروبيج بما يتماشى مع مبادئ الثقة والاستدامة والاستمرارية منذ تأسيسها، وقد اكتسبت مكانة متميزة في القطاع بفضل استراتيجية النمو المستقرة ومعايير الإنتاج العالية والهيكل المؤسسي القوي."
                  )}
                </p>
                <p>
                  {translate(
                    "Bürobig'in hikayesi, çalışma alanlarını yalnızca işlevsel mekanlar olarak değil; kurumsal kimliği yansıtan, verimliliği artıran ve kullanıcı deneyimi odağına alan yaşam alanları olarak ele alan bir vizyonla şekillenmiştir. Bu yaklaşım doğrultusunda marka, modern üretim altyapısını çağdaş tasarım anlayışı ve ileri mühendislik çözümleriyle bir araya getirerek, zamansız ve nitelikli ofis mobilyaları geliştirmektedir.",
                    "The story of Bürobig is shaped by a vision that treats workspaces not just as functional areas, but as living spaces that reflect corporate identity, increase productivity, and focus on user experience. In line with this approach, the brand develops timeless and qualified office furniture by combining modern production infrastructure with contemporary design approach and advanced engineering solutions.",
                    "تتشكل قصة بيروبيج من خلال رؤية تتعامل مع مساحات العمل ليس فقط كمساحات وظيفية، ولكن كمساحات معيشة تعكس الهوية المؤسسية، وتزيد من الإنتاجية، وتركز على تجربة المستخدم. وتماشيًا مع هذا النهج، تعمل العلامة التجارية على تطوير أثاث مكتبي خالد ومؤهل من خلال الجمع بين بنية الإنتاج الحديثة ونهج التصميم المعاصر والحلول الهندسية المتقدمة."
                  )}
                </p>
                <p>
                  {translate(
                    "Tasarım ve üretim süreçlerinde ergonomi, dayanıklılık ve estetik dengeyi ön planda tutan Bürobig, kullanılan malzemelerdeki seçiciliği, detaylara gösterdiği özen ve titizlikle yürütülen kalite kontrol süreçleriyle üst segment bir marka duruşu sergilemektedir. Her bir ürün, uzun ömürlü kullanım, konfor ve görsel bütünlük hedefiyle hayata geçirilmektedir.",
                    "Prioritizing ergonomics, durability, and aesthetic balance in design and production processes, Bürobig exhibits an upper-segment brand stance with its selectivity in materials used, attention to detail, and meticulously carried out quality control processes. Each product is created with the goal of long-lasting use, comfort, and visual integrity.",
                    "من خلال إعطاء الأولوية لبيئة العمل والمتانة والتوازن الجمالي في عمليات التصميم والإنتاج، تُظهر بيروبيج موقفًا تجاريًا من الفئة العليا مع انتقائيتها في المواد المستخدمة، والاهتمام بالتفاصيل، وعمليات مراقبة الجودة التي يتم إجراؤها بدقة. يتم إنشاء كل منتج بهدف الاستخدام طويل الأمد والراحة والتكامل البصري."
                  )}
                </p>
                <p>
                  {translate(
                    "Kurumsal değerlerine bağlı, şeffaf ve sorumluluk bilinci yüksek yönetim anlayışıyla hareket eden Bürobig; müşteri memnuniyetini yalnızca bir hedef değil, sürdürülebilir başarının temel unsuru olarak kabul etmektedir. Çevreye duyarlı üretim yaklaşımı ve etik iş anlayışı, markanın uzun vadeli vizyonunu destekleyen önemli yapı taşları arasında yer almaktadır.",
                    "Acting with a transparent management approach that is loyal to its corporate values and has a high sense of responsibility, Bürobig accepts customer satisfaction not only as a target but as the fundamental element of sustainable success. Environment-friendly production approach and ethical business understanding are among the important building blocks supporting the long-term vision of the brand.",
                    "تعمل شركة بيروبيج بنهج إداري شفاف مخلص لقيمها المؤسسية ويتمتع بحس عالٍ من المسؤولية، وهي تقبل رضا العملاء ليس فقط كهدف ولكن كعنصر أساسي للنجاح المستدام. يعد نهج الإنتاج الصديق للبيئة وفهم الأعمال الأخلاقية من بين اللبنات الأساسية الهامة التي تدعم رؤية العلامة التجارية على المدى الطويل."
                  )}
                </p>
                <p>
                  {translate(
                    "Bugün Bürobig; deneyimli kadrosu, güçlü organizasyon yapısı ve yenilikçi bakış açısıyla, ofis mobilyası sektöründe referans alınan markalardan biri olarak konumlanmakta, ulusal ve uluslararası ölçekte prestijli projelere değer katmaya devam etmektedir. Geleceğe, köklü geçmişinden aldığı güç ve sürekli gelişim anlayışıyla kararlılıkla ilerlemektedir.",
                    "Today, Bürobig is positioned as one of the reference brands in the office furniture sector with its experienced staff, strong organizational structure, and innovative perspective, and continues to add value to prestigious projects on a national and international scale. It moves forward resolutely to the future with the strength drawn from its deep-rooted past and continuous development understanding.",
                    "واليوم، تم تصنيف بيروبيج كواحدة من العلامات التجارية المرجعية في قطاع أثاث المكاتب بفضل طاقمها ذوي الخبرة، وهيكلها التنظيمي القوي، ومنظورها المبتكر، وتستمر في إضافة قيمة للمشاريع المرموقة على الصعيدين الوطني والدولي. إنها تتقدم بثبات نحو المستقبل بالقوة المستمدة من ماضيها العريق وفهم التطوير المستمر."
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
