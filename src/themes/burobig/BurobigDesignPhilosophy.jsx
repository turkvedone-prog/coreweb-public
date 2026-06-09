import { useEffect } from 'react';

export default function BurobigDesignPhilosophy() {
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
          <span className="corporate-top-title">KURUMSAL / TASARIM FELSEFESİ</span>
        </div>

        {/* SECTION: TASARIM FELSEFESİ */}
        <section className="corporate-section reveal-up" style={{ borderBottom: 'none', paddingTop: '2rem' }}>
          <div className="corporate-grid">
            <div className="corporate-left">
              <h1 className="corporate-large-title">Köklü Duruş, Yenilikçi Yaklaşım.</h1>
              <h2 className="corporate-sub-title">Geleceği yalnızca hayal etmiyoruz. Onu tasarlıyoruz.</h2>
            </div>
            <div className="corporate-right">
              <div className="corporate-text-wrapper">
                <p>Bizim için tasarım bir form meselesi değil; bir duruş, bir vizyon ve bir karakter meselesidir. Dinamik ve cesur bir anlayışla hareket eder, fütürist bakış açısını minimal modernizmin rafineliğiyle harmanlarız. Zamana bağlı kalmayan, etkisini yitirmeyen çizgiler yaratırız. Trendlerin peşinden gitmeyiz, kendi trendimizi yaratırız.</p>
                <p>Her projeye insanı merkeze alarak başlarız. Estetikle ergonomiyi, fonksiyonla duyguyu, teknolojiyle sanatı bir araya getiririz. Çünkü gerçek tasarım sadece güzel görünen değil, iyi hissettirendir. Her detay bilinçli, her çizgi anlamlıdır.</p>
                <p>Ürünlerimizi birer obje olarak değil, yaşayan karakterler olarak ele alırız. Her tasarımın bir ruhu, bir hikâyesi ve bir amacı vardır. Mekânlara sadece mobilya değil; kimlik, atmosfer ve deneyim kazandırırız. Çünkü tasarım, kullanıcıyla bağ kurduğunda gerçek değerine ulaşır.</p>
                <p>Bürobig olarak genç, dinamik ve özgür düşünen bir ekibiz. Sınırları zorlar, alışılmış kalıpları kırar ve henüz var olmayanın peşinden gideriz. Yapılmış olanı tekrar etmek bizi heyecanlandırmaz. Her projede bir adım ötesini hedefleriz. Cesur fikirlerden korkmayız, onları sahipleniriz. Çünkü fark, risk alanların yanındadır.</p>
                <p>Bizim için tasarım bir sonuç değil, bir yolculuktur. Ve bu yolculukta estetik, teknoloji, fonksiyon ve duygu aynı rotada ilerler.</p>
                <p style={{ fontWeight: 'bold', marginTop: '2rem' }}>Gelecek sıradan olanı değil, fark yaratanı hatırlar. Biz fark yaratmak için buradayız.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
