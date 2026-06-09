import { useEffect } from 'react';

export default function BurobigSustainability() {
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
          <span className="corporate-top-title">KURUMSAL / SÜRDÜRÜLEBİLİRLİK</span>
        </div>

        {/* SECTION: SÜRDÜRÜLEBİLİRLİK */}
        <section className="corporate-section reveal-up" style={{ borderBottom: 'none', paddingTop: '2rem' }}>
          <div className="corporate-grid">
            <div className="corporate-left">
              <h1 className="corporate-large-title">Geleceği korumayı merkeze alan çevre odaklı bir anlayış.</h1>
              <h2 className="corporate-sub-title">Gelecek için tasarlarız.</h2>
            </div>
            <div className="corporate-right">
              <div className="corporate-text-wrapper">
                <p>Geleceği korumayı merkeze alan çevre odaklı bir anlayışla tasarlıyor ve üretiyoruz. Tasarımın ilk fikrinden üretimin son aşamasına kadar her adımda doğaya karşı sorumluluğumuzu gözetiyor, aldığımız her kararı uzun vadeli etkileriyle değerlendiriyoruz. Kaynakları bilinçli kullanmayı, israfı azaltmayı ve sürdürülebilir malzeme seçimlerini üretim kültürümüzün ayrılmaz bir parçası olarak görüyoruz.</p>
                <p>Uzun ömürlü, dayanıklı ve çevreyle uyumlu çözümler geliştirerek yalnızca bugünün ihtiyaçlarına değil, yarının beklentilerine de cevap vermeyi hedefliyoruz. Çevreye saygıyı bir söylem değil, iş yapma biçimimizin doğal bir sonucu olarak benimsiyor; sorumlu üretimin geleceğin tasarım anlayışını belirleyeceğine inanıyoruz.</p>
              </div>
            </div>
          </div>

          <div className="corporate-image-box corporate-image-box--bottom" style={{ marginTop: '4rem' }}>
            <img src="/assets/burobig/images/Surdurebilirlik.webp" alt="Sürdürülebilirlik — Bürobig" />
          </div>
        </section>

      </div>
    </main>
  );
}
