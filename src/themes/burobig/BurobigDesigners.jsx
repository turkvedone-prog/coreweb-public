import { useState, useRef } from 'react';

export default function BurobigDesigners() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const detailRef = useRef(null);

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
      name: 'Işık Oral & F. Akın Oral',
      title: 'Klan Studio',
      image: '/assets/burobig/images/designer-klan.png',
      bio: 'Klan Studio, mimari hassasiyet ile sanatsal özgürlüğü birleştiren tasarımlara imza atmaktadır. Mekanın enerjisini ve insan hareketlerini merkeze alan çalışma disiplinleri sayesinde Bürobig koleksiyonlarına derinlik katmaktadırlar.',
      signature: 'Kolektif Oturma Alanları & Premium Ofis Serileri'
    },
    {
      name: 'A. Baki Çelik',
      title: 'Tasarımcı',
      image: '/assets/burobig/images/designer-baki.png',
      bio: 'A. Baki Çelik, endüstriyel tasarım dünyasında işlevsellik ile heykelsi formları buluşturan özgün diliyle tanınır. Tasarımlarında keskin hatlar, doğal ahşap dokular ve modern metal detaylar bir araya gelerek prestijli ve zamansız alanlar yaratır.',
      signature: 'Monolith Yönetici Masası (Red Dot Tasarım Ödüllü)'
    },
    {
      name: 'Yunus Emre Pektaş',
      title: 'Tasarımcı',
      image: '/assets/burobig/images/designer-pektas.png',
      bio: 'Yunus Emre Pektaş, insan ergonomisi ve modern çalışma dinamikleri üzerine yoğunlaşan tasarımlar üretmektedir. Ofis yaşamında konfor ile estetiğin sınırlarını zorlayan, kullanıcı dostu ve akıllı mekanizmaları ürünlerine entegre etmesiyle bilinir.',
      signature: 'Vetra Ofis Koltuğu Serisi (Good Design Ödüllü)'
    },
    {
      name: 'Rıza Özdemir',
      title: 'Tasarımcı',
      image: '/assets/burobig/images/designer-ozdemir.png',
      bio: 'Rıza Özdemir, minimalist modernizmin temsilcilerinden olup tasarımlarında yalınlık, rasyonalite ve malzeme kalitesini ön planda tutar. Göz yormayan, dingin fakat güçlü bir prestij yansıtan çizgileriyle Bürobig tasarım felsefesini simgeler.',
      signature: 'İnka Yönetici Masası (German Design Award Ödüllü)'
    },
    {
      name: 'Bürobig Design Team',
      title: 'Tasarım Ekibi',
      image: '/assets/burobig/images/designer-team.png',
      bio: 'Bürobig Tasarım Ekibi, markanın inovasyon vizyonunu ve uluslararası kalite standartlarını tüm ürün gruplarına yaymak için ortaklaşa çalışan multidisipliner bir ekiptir. Ergonomi, malzeme teknolojileri ve estetiği bütünsel olarak ele alırlar.',
      signature: 'Akıllı Depolama ve Operasyonel Masa Sistemleri'
    }
  ];

  return (
    <main className="designers-page">
      <div className="designers-container">
        
        {/* Page Top Indicator */}
        <div className="designers-top-bar">
          <span className="designers-top-title">
            TASARIM FELSEFESİ
          </span>
        </div>

        <div className="designers-content-grid">
          
          {/* Left Column: Design Philosophy (Editorial Text) */}
          <section className="philosophy-column">
            <h1 className="philosophy-main-title">
              Köklü Duruş,<br />Yenilikçi Yaklaşım.
            </h1>

            <div className="philosophy-text-wrapper">
              <div className="text-block tr-text">
                <p className="highlight-text font-bold">Geleceği yalnızca hayal etmiyoruz. Onu tasarlıyoruz.</p>
                <p>Bizim için tasarım bir form meselesi değil; bir duruş, bir vizyon ve bir karakter meselesidir. Dinamik ve cesur bir anlayışla hareket eder, fütürist bakış açısını minimal modernizmin rafineliğiyle harmanlarız. Zamana bağlı kalmayan, etkisini yitirmeyen çizgiler yaratırız. Trendlerin peşinden gitmeyiz, kendi trendimizi yaratırız.</p>
                <p>Her projeye insanı merkeze alarak başlarız. Estetikle ergonomiyi, fonksiyonla duyguyu, teknolojiyle sanatı bir araya getiririz. Çünkü gerçek tasarım sadece güzel görünen değil, iyi hissettirendir. Her detay bilinçli, her çizgi anlamlıdır.</p>
                <p>Ürünlerimizi birer obje olarak değil, yaşayan karakterler olarak ele alırız. Her tasarımın bir ruhu, bir hikâyesi ve bir amacı vardır. Mekânlara sadece mobilya değil; kimlik, atmosfer ve deneyim kazandırırız. Çünkü tasarım, kullanıcıyla bağ kurduğunda gerçek değerine ulaşır.</p>
                <p>Bürobig olarak genç, dinamik ve özgür düşünen bir ekibiz. Sınırları zorlar, alışılmış kalıpları kırar ve henüz var olmayanın peşinden gideriz. Yapılmış olanı tekrar etmek bizi heyecanlandırmaz. Her projede bir adım ötesini hedefleriz. Cesur fikirlerden korkmayız, onları sahipleniriz. Çünkü fark, risk alanların yanındadır.</p>
                <p>Bizim için tasarım bir sonuç değil, bir yolculuktur. Ve bu yolculukta estetik, teknoloji, fonksiyon ve duygu aynı rotada ilerler.</p>
                <p className="font-bold">Gelecek sıradan olanı değil, fark yaratanı hatırlar.<br />Biz fark yaratmak için buradayız.</p>
              </div>
            </div>
          </section>

          {/* Right Column: Designers List Grid */}
          <section className="designers-column">
            <h2 className="designers-column-title">
              Sizin İçin Tasarlayanlar
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
                    <span className="designer-title">{designer.title}</span>
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
                Tasarımcı Profili
              </span>
              <h2 className="designer-detail-name">
                {designers[selectedIdx].name}
              </h2>
              <span className="designer-detail-title">
                {designers[selectedIdx].title}
              </span>
              <p className="designer-detail-bio">
                {designers[selectedIdx].bio}
              </p>
              {designers[selectedIdx].signature && (
                <div className="designer-detail-signature">
                  <span className="signature-title-label">
                    Öne Çıkan Koleksiyonlar / Ödüller:
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
