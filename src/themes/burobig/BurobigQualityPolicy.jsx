import { useEffect } from 'react';

export default function BurobigQualityPolicy() {
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
          <span className="corporate-top-title">KURUMSAL / KALİTE POLİTİKAMIZ</span>
        </div>

        {/* SECTION: KALİTE POLİTİKAMIZ */}
        <section className="corporate-section reveal-up" style={{ borderBottom: 'none', paddingTop: '2rem' }}>
          <div className="corporate-grid">
            <div className="corporate-left">
              <h1 className="corporate-large-title">Her çözüm, sıfır hata payı hedefiyle üretilir.</h1>
              <h2 className="corporate-sub-title">Disiplinli yaklaşım. Kalıcı kalite. Sessiz güç.</h2>
              <div className="corporate-text-wrapper">
                <p>Bürobig'de kalite, denetlenen bir sonuç değil, başından itibaren uygulanan bir disiplindir. Tasarımın ilk kararından, üretimin son detayına kadar tüm süreçlerimiz bu disiplin üzerine kurulur.</p>
                <p>Her ürün, aynı netlikle ele alınır. Her süreç, aynı dikkatle yürütülür. Her detay, aynı seviyede tamamlanır.</p>
                <p>Kaliteyi söylemlerle değil, tekrar edilebilir sonuçlarla tanımlarız. Malzeme seçiminden işçiliğe, üretim akışından son kontrole kadar her aşama, tutarlılık ve süreklilik esasına göre yönetilir. Bürobig ürünleri bu nedenle ilk günden itibaren güven verir ve zamanla değer kazanır.</p>
              </div>
            </div>
            <div className="corporate-right">
              <div className="corporate-text-wrapper">
                <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Bürobig;</p>
                <ul className="corporate-list">
                  <li>Kaliteyi şansa bırakmaz, sistemli biçimde üretir,</li>
                  <li>Disiplinden taviz vermez,</li>
                  <li>Aynı kalite seviyesini her üründe korur,</li>
                  <li>Uzun ömürlü ve sürdürülebilir çözümler benimser,</li>
                  <li>Çevreye ve kaynaklara karşı sorumluluk bilinciyle hareket eder,</li>
                  <li>Kalite bilincini kurum kültürünün ayrılmaz bir parçası olarak görür.</li>
                </ul>
                <p style={{ marginTop: '2rem' }}>Bizim için kalite, dikkat çekmek için yükseltilmiş bir ses değildir. Kullanıldıkça hissedilen, zamanla kendini kanıtlayan sessiz bir güçtür.</p>
                <p>Bu kalite politikası; Bürobig'in disiplinli yaklaşımını, kalıcı kalite anlayışını ve tüm faaliyetlerinde sürdürdüğü net duruşu ifade eder.</p>
              </div>
            </div>
          </div>

          <div className="corporate-image-box corporate-image-box--bottom" style={{ marginTop: '4rem' }}>
            <img src="/assets/burobig/images/Kalite%20Politikamiz.webp" alt="Her çözüm sıfır hata payıyla üretilir — Kalite Politikamız" />
          </div>
        </section>

      </div>
    </main>
  );
}
