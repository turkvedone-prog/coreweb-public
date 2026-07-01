import { useState, useRef, useEffect } from 'react';
import { useSite } from './layouts/SiteLayout';
import { updateSEOMeta } from '../../utils/seo';

export default function BurobigDesigners() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const detailRef = useRef(null);
  const { activeLang } = useSite();

  useEffect(() => {
    updateSEOMeta({
      title: activeLang === 'tr' ? 'Tasarımcılar' : activeLang === 'ar' ? 'المصممون' : 'Designers',
      description: activeLang === 'tr' 
        ? 'Bürobig ürünlerine heykelsi formlar ve minimalist modernizm katan dünyaca ünlü ödüllü tasarımcılarımız.' 
        : activeLang === 'ar' 
        ? 'مصممينا الحائزين على جوائز عالمية والذين يضيفون أشكالاً نحتية وحداثة بسيطة لمنتجات بيروبيج.' 
        : 'Our world-renowned award-winning designers who add sculptural forms and minimalist modernism to Bürobig products.',
      companyName: 'Bürobig Mobilya'
    });
  }, [activeLang]);

  const translate = (tr, en, ar) => {
    if (activeLang === 'ar') return ar || en || tr;
    if (activeLang === 'en') return en || tr;
    return tr;
  };

  const handleDesignerClick = (idx) => {
    setSelectedIdx(idx);
    setTimeout(() => {
      const element = detailRef.current;
      if (element) {
        const offset = 140; // sticky header + safety gap
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const designers = [
    {
      name: 'Işık Oral & E. Akın Oral',
      title: translate('Klan Studio', 'Klan Studio', 'Klan Studio'),
      image: '/assets/burobig/images/designer-klan.jpg',
      bio: translate(
        'Klan Studio, mimari hassasiyet ile sanatsal özgürlüğü birleştiren tasarımlara imza atmaktadır. Mekanın enerjisini ve insan hareketlerini merkeze alan çalışma disiplinleri sayesinde Bürobig koleksiyonlarına derinlik katmaktadırlar.',
        'Klan Studio creates designs that combine architectural precision with artistic freedom. Thanks to their working discipline centered on spatial energy and human movements, they add depth to Bürobig collections.',
        'يقوم استوديو كلان بإنشاء تصميمات تجمع بين الدقة المعمارية والحرية الفنية. بفضل نظام عملهم الذي يركز على الطاقة المكانية والحركات البشرية، يضيفون عمقًا إلى مجموعات بيروبيج.'
      ),
      signature: translate(
        'Kolektif Oturma Alanları & Premium Ofis Serileri',
        'Collective Seating Areas & Premium Office Series',
        'مناطق جلوس جماعية وسلسلة المكاتب الفاخرة'
      )
    },
    {
      name: 'A. Baki Çelik',
      title: translate('Tasarımcı', 'Designer', 'مصمم'),
      image: '/assets/burobig/images/designer-baki.jpg',
      bio: translate(
        'A. Baki Çelik, endüstriyel tasarım dünyasında işlevsellik ile heykelsi formları buluşturan özgün diliyle tanınır. Tasarımlarında keskin hatlar, doğal ahşap dokular ve modern metal detaylar bir araya gelerek prestijli ve zamansız alanlar yaratır.',
        'A. Baki Çelik is known for his unique design language that combines functionality with sculptural forms in industrial design. In his designs, sharp lines, natural wood textures, and modern metal details come together to create prestigious and timeless spaces.',
        'يشتهر أ. باقي تشيليك بلغته التصميمية الفريدة التي تجمع بين الوظيفة والأشكال النحتية في التصميم الصناعي. في تصميماته، تجتمع الخطوط الحادة، والأنسجة الخشبية الطبيعية، والتفاصيل المعدنية الحديثة لخلق مساحات مرموقة وخالدة.'
      ),
      signature: translate(
        'Monolith Yönetici Masası (Red Dot Tasarım Ödüllü)',
        'Monolith Executive Desk (Red Dot Design Award Winner)',
        'مكتب المدير التنفيذي Monolith (حائز على جائزة Red Dot للتصميم)'
      )
    },
    {
      name: 'Yunus Emre Pektaş',
      title: translate('Tasarımcı', 'Designer', 'مصمم'),
      image: '/assets/burobig/images/designer-pektas.jpg',
      bio: translate(
        'Yunus Emre Pektaş, insan ergonomisi ve modern çalışma dinamikleri üzerine yoğunlaşan tasarımlar üretmektedir. Ofis yaşamında konfor ile estetiğin sınırlarını zorlayan, kullanıcı dostu ve akıllı mekanizmaları ürünlerine entegre etmesiyle bilinir.',
        'Yunus Emre Pektaş produces designs focusing on human ergonomics and modern working dynamics. He is known for integrating user-friendly and intelligent mechanisms into his products, pushing the boundaries of comfort and aesthetics in office life.',
        'ينتج يونس إمري بيكتاش تصميمات تركز على بيئة العمل البشرية وديناميكيات العمل الحديثة. وهو معروف بدمج الآليات الذكية وسهلة الاستخدام في منتجاته، مما يدفع حدود الراحة والجمال في الحياة المكتبية.'
      ),
      signature: translate(
        'Vetra Ofis Koltuğu Serisi (Good Design Ödüllü)',
        'Vetra Office Chair Series (Good Design Award Winner)',
        'سلسلة كراسي المكتب Vetra (حائزة على جائزة التصميم الجيد)'
      )
    },
    {
      name: 'Rıza Özdemir',
      title: translate('Tasarımcı', 'Designer', 'مصمم'),
      image: '/assets/burobig/images/designer-ozdemir.jpg',
      bio: translate(
        'Rıza Özdemir, minimalist modernizmin temsilcilerinden olup tasarımlarında yalınlık, rasyonalite ve malzeme kalitesini ön planda tutar. Göz yormayan, dingin fakat güçlü bir prestij yansıtan çizgileriyle Bürobig tasarım felsefesini simgeler.',
        'Rıza Özdemir is a representative of minimalist modernism and prioritizes simplicity, rationality, and material quality in his designs. He symbolizes the Bürobig design philosophy with lines that reflect an easy-on-the-eyes, serene yet strong prestige.',
        'يعد رضا أوزدمير ممثلاً للحداثة البسيطة ويعطي الأولوية للبساطة والعقلانية وجودة المواد في تصميماته. إنه يرمز إلى فلسفة تصميم بيروبيج بخطوط تعكس هيبة هادئة وقوية ومريحة للعينين.'
      ),
      signature: translate(
        'İnka Yönetici Masası (German Design Award Ödüllü)',
        'İnka Executive Desk (German Design Award Winner)',
        'مكتب İnka التنفيذي (حائز على جائزة التصميم الألمانية)'
      )
    },
    {
      name: 'Bürobig Design Team',
      title: translate('Tasarım Ekibi', 'Design Team', 'فريق التصميم'),
      image: '/assets/burobig/images/designer-team.jpg',
      bio: translate(
        'Bürobig Tasarım Ekibi, markanın inovasyon vizyonunu ve uluslararası kalite standartlarını tüm ürün gruplarına yaymak için ortaklaşa çalışan multidisipliner bir ekiptir. Ergonomi, malzeme teknolojileri ve estetiği bütünsel olarak ele alırlar.',
        'Bürobig Design Team is a multidisciplinary team working collaboratively to extend the brand\'s innovation vision and international quality standards to all product groups. They handle ergonomics, material technologies, and aesthetics holistically.',
        'فريق تصميم بيروبيج هو فريق متعدد التخصصات يعمل بشكل تعاوني لنشر رؤية الابتكار للعلامة التجارية ومعايير الجودة الدولية لجميع مجموعات المنتجات. إنهم يتعاملون مع بيئة العمل وتقنيات المواد والجماليات بشكل كلي.'
      ),
      signature: translate(
        'Akıllı Depolama ve Operasyonel Masa Sistemleri',
        'Smart Storage and Operational Desk Systems',
        'أنظمة التخزين الذكية وطاولات العمل التشغيلية'
      )
    }
  ];

  return (
    <main className="designers-page">
      <div className="designers-container">
        
        {/* Page Top Indicator */}
        <div className="designers-top-bar">
          <span className="designers-top-title">
            {translate('TASARIM FELSEFESİ', 'DESIGN PHILOSOPHY', 'فلسفة التصميم')}
          </span>
        </div>

        <div className="designers-content-grid">
          
          {/* Left Column: Design Philosophy (Editorial Text) */}
          <section className="philosophy-column">
            <h1 className="philosophy-main-title">
              {translate('Köklü Duruş,', 'Rooted Stance,', 'موقف راسخ،')}<br />{translate('Yenilikçi Yaklaşım.', 'Innovative Approach.', 'نهj مبتكر.')}
            </h1>

            <div className="philosophy-text-wrapper">
              <div className="text-block">
                <p className="highlight-text font-bold">
                  {translate("Geleceği yalnızca hayal etmiyoruz. Onu tasarlıyoruz.", "We don't just imagine the future. We design it.", "نحن لا نتخيل المستقبل فحسب. نحن نصممه.")}
                </p>
                <p>
                  {translate(
                    "Bizim için tasarım bir form meselesi değil; bir duruş, bir vizyon ve bir karakter meselesidir. Dinamik ve cesur bir anlayışla hareket eder, fütürist bakış açısını minimal modernizmin rafineliğiyle harmanlarız. Zamana bağlı kalmayan, etkisini yitirmeyen çizgiler yaratırız. Trendlerin peşinden gitmeyiz, kendi trendimizi yaratırız.",
                    "For us, design is not a matter of form; it is a matter of stance, vision, and character. We act with a dynamic and bold approach, blending the futuristic perspective with the refinement of minimal modernism. We create lines that are timeless and never lose their impact. We do not follow trends, we create our own trend.",
                    "بالنسبة لنا، التصميم ليس مسألة شكل؛ إنه مسألة موقف ورؤية وشخصية. من خلال التحرك بفهم ديناميكي وجريء، نمزج المنظور المستقبلي مع تحسين الحداثة البسيطة. نحن نخلق خطوطًا لا يحدها زمن ولا تفقد تأثيرها. نحن لا نلاحق الاتجاهات، بل نخلق اتجاهنا الخاص."
                  )}
                </p>
                <p>
                  {translate(
                    "Her projeye insanı merkeze alarak başlarız. Estetikle ergonomiyi, fonksiyonla duyguyu, teknolojiyle sanatı bir araya getiririz. Çünkü gerçek tasarım sadece güzel görünen değil, iyi hissettirendir. Her detay bilinçli, her çizgi anlamlıdır.",
                    "We start every project by placing the human at the center. We bring together aesthetics with ergonomics, function with emotion, and technology with art. Because real design is not just what looks good, but what feels good. Every detail is conscious, every line is meaningful.",
                    "نبدأ كل مشروع مع الإنسان في المركز. نحن نجمع بين الجماليات وبيئة العمل، والوظيفة مع العاطفة، والتكنولوجيا مع الفن. لأن التصميم الحقيقي ليس فقط ما يبدو جيدًا، ولكن ما يشعر بالرضا. كل التفاصيل واعية، وكل خط ذو معنى."
                  )}
                </p>
                <p>
                  {translate(
                    "Ürünlerimizi birer obje olarak değil, yaşayan karakterler olarak ele alırız. Her tasarımın bir ruhu, bir hikâyesi ve bir amacı vardır. Mekânlara sadece mobilya değil; kimlik, atmosfer ve deneyim kazandırırız. Çünkü tasarım, kullanıcıyla bağ kurduğunda gerçek değerine ulaşır.",
                    "We treat our products not as objects, but as living characters. Every design has a soul, a story, and a purpose. We give spaces not just furniture, but identity, atmosphere, and experience. Because design reaches its true value when it connects with the user.",
                    "نحن نتعامل مع منتجاتنا ليس كأشياء، ولكن كشخصيات حية. كل تصميم له روح وقصة وهدف. نحن لا نجلب الأثاث فقط للمساحات؛ نجلب الهوية والجو والخبرة. لأن التصميم يصل إلى قيمته الحقيقية عندما يقيم رابطًا مع المستخدم."
                  )}
                </p>
                <p>
                  {translate(
                    "Bürobig olarak genç, dinamik ve özgür düşünen bir ekibiz. Sınırları zorlar, alışılmış kalıpları kırar ve henüz var olmayanın peşinden gideriz. Yapılmış olanı tekrar etmek bizi heyecanlandırmaz. Her projede bir adım ötesini hedefleriz. Cesur fikirlerden korkmayız, onları sahipleniriz. Çünkü fark, risk alanların yanındadır.",
                    "At Bürobig, we are a young, dynamic, and free-thinking team. We push boundaries, break conventional patterns, and chase what does not yet exist. Repeating what has already been done does not excite us. We target one step further in every project. We are not afraid of bold ideas, we embrace them. Because the difference is on the side of those who take risks.",
                    "بصفتنا بيروبيج، نحن فريق شاب وديناميكي وحر التفكير. نحن ندفع الحدود، ونكسر القوالب التقليدية، ونسعى وراء ما ليس له وجود بعد. تكرار ما تم إنجازه لا يثيرنا. نحن نهدف إلى خطوة أخرى إلى الأمام in كل مشروع. نحن لا نخاف من الأفكار الجريئة، بل نتبناها. لأن الفرق يكمن في جانب من يتحمل المخاطر."
                  )}
                </p>
                <p>
                  {translate(
                    "Bizim için tasarım bir sonuç değil, bir yolculuktur. Ve bu yolculukta estetik, teknoloji, fonksiyon ve duygu aynı rotada ilerler.",
                    "For us, design is not a result, but a journey. And on this journey, aesthetics, technology, function, and emotion follow the same route.",
                    "بالنسبة لنا، التصميم ليس نتيجة، بل رحلة. وفي هذه الرحلة، تتحرك الجماليات والتكنولوجيا والوظيفة والعاطفة على نفس المسار."
                  )}
                </p>
                <p className="font-bold">
                  {translate(
                    "Gelecek sıradan olanı değil, fark yaratanı hatırlar. Biz fark yaratmak için buradayız.",
                    "The future remembers the ones who make a difference, not the ordinary. We are here to make a difference.",
                    "المستقبل يتذكر من يصنع الفرق، وليس العادي. نحن هنا لنصنع فرقًا."
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* Right Column: Designers List Grid */}
          <section className="designers-column">
            <h2 className="designers-column-title">
              {translate('Sizin İçin Tasarlayanlar', 'Designed for You', 'مصممون من أجلك')}
            </h2>

            <div className="designers-grid">
              {designers.map((designer, idx) => (
                <div 
                  key={idx} 
                  className={`designer-card ${selectedIdx === idx ? 'active' : ''}`}
                  onClick={() => handleDesignerClick(idx)}
                >
                  <div className="designer-image-wrapper">
                    <img src={designer.image} alt={designer.name} className="designer-img" />
                  </div>
                  <div className="designer-meta">
                    <h4 className="designer-name">{designer.name}</h4>
                    <span className="designer-title">
                      {activeLang === 'tr' ? designer.title.toLocaleUpperCase('tr-TR') : designer.title.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Selected Designer Detail Showcase (Dynamic Block Below Grid) */}
        {selectedIdx !== null && (
          <div className="designer-detail-section" ref={detailRef}>
            <div className="designer-detail-image-wrapper">
              <img 
                src={designers[selectedIdx].image} 
                alt={designers[selectedIdx].name} 
                className="designer-detail-img" 
              />
            </div>
            <div className="designer-detail-info">
              <span className="designer-detail-label">
                {translate('TASARIMCI PROFİLİ', 'DESIGNER PROFILE', 'ملف المصمم')}
              </span>
              <h2 className="designer-detail-name">
                {designers[selectedIdx].name}
              </h2>
              <span className="designer-detail-title">
                {activeLang === 'tr' ? designers[selectedIdx].title.toLocaleUpperCase('tr-TR') : designers[selectedIdx].title.toUpperCase()}
              </span>
              <p className="designer-detail-bio">
                {designers[selectedIdx].bio}
              </p>
              {designers[selectedIdx].signature && (
                <div className="designer-detail-signature">
                  <span className="signature-title-label">
                    {translate('ÖNE ÇIKAN KOLEKSİYONLAR / ÖDÜLLER:', 'FEATURED COLLECTIONS / AWARDS:', 'المجموعات البارزة / الجوائز:')}
                  </span>
                  <p className="signature-content">
                    {designers[selectedIdx].signature}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
