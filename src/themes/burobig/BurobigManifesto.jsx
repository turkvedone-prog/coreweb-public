import { useEffect } from 'react';

export default function BurobigManifesto() {
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
          <span className="corporate-top-title">KURUMSAL / MANİFESTO</span>
        </div>

        {/* SECTION: MANİFESTO */}
        <section className="corporate-section reveal-up" style={{ borderBottom: 'none', paddingTop: '2rem' }}>
          <div className="corporate-grid">
            <div className="corporate-left">
              <div className="manifesto-giant-title">TASARIMIN<br />YARINI</div>
              <h2 className="corporate-sub-title">Tasarımın Yarını</h2>
            </div>
            <div className="corporate-right">
              <div className="corporate-text-wrapper">
                <p>Tasarımın yarını, biçimden önce mekânsal aklı merkeze alır. Görünenden çok, kurgulananla ilgilenir. Çünkü mimarlık, önce düşüncede başlar.</p>
                <p>Biz tasarımı; form üretmekten ziyade mekânı anlamlandırma süreci olarak ele alırız. Oran, ölçek, boşluk ve işlev arasındaki denge; tasarımın gerçek değerini belirler. Bu nedenle tasarımın yarını, yüzeyde değil, mekânın iç mantığında şekillenir.</p>
                <p>Bürobig için ofis; yalnızca yerleştirilen elemanlardan oluşan bir alan değil, bütüncül bir mekânsal kurgudur. Mobilya, bu kurgunun tamamlayıcısıdır. Mimariyle uyumlu, mekânla konuşan ve yapının karakterine saygı duyan bir dilin parçasıdır.</p>
                <p>Tasarımın yarını; esnek kullanımı destekleyen, değişen çalışma senaryolarına uyum sağlayan, zamana direnmek yerine zamanla olgunlaşan bir yaklaşım gerektirir. Kalıcılık, gösterişle değil; doğru kararlarla sağlanır.</p>
                <p>Biz trendleri referans almayız. Mekânı okur, bağlamı analiz eder ve tasarımı bu doğrultuda konumlandırırız. Çünkü iyi tasarım, bulunduğu yerle ilişki kurar; bağlamından kopuk değildir.</p>
                <p>Tasarımın yarını; sessiz bir netlik, ölçülü bir iddia ve mimari tutarlılıkla tanımlanır.</p>
                <p style={{ fontWeight: 'bold' }}>Biz bu tutarlılığı, her projede yeniden kurarız.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
