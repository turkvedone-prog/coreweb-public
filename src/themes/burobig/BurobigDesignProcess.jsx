import { useEffect } from 'react';

export default function BurobigDesignProcess() {
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
          <span className="corporate-top-title">KURUMSAL / TASARIM SÜRECİ</span>
        </div>

        {/* SECTION: TASARIM SÜRECİ */}
        <section className="corporate-section reveal-up" style={{ borderBottom: 'none', paddingTop: '2rem' }}>
          <div className="corporate-grid">
            <div className="corporate-left">
              <h1 className="corporate-large-title">Süreçte zeka. Kontrolde ustalık.</h1>
              <h2 className="corporate-sub-title">Tasarım Sürecimiz</h2>
              <div className="corporate-text-wrapper">
                <p>Bürobig'te tasarım, deneyimli tasarımcıların bilgi birikimi ve sezgisiyle başlar. İşinde uzmanlaşmış ekibimiz, erken aşamada fikirleri test etmek, oranları değerlendirmek ve alternatifleri hızla analiz etmek amacıyla yapay zekâ destekli sistemlerden yararlanır.</p>
                <p>Bürobig Tasarım Laboratuvarı, bu sürecin merkezinde yer alır. Burada yapay zekâ, karar veren değil; tasarımcıyı destekleyen bir araç olarak konumlanır. Form, denge, işlev ve karakter gibi temel tasarım kararları, insan eli ve profesyonel deneyimle şekillenir.</p>
                <p>Her ürün, disiplin, kontrol ve ustalıkla ele alınır. Teknoloji süreci hızlandırır, uzmanlık yön verir. Sonuç olarak ortaya çıkan her tasarım, hesaplanmış bir aklın ve rafine edilmiş bir el emeğinin ürünüdür.</p>
              </div>
            </div>
            <div className="corporate-right">
              <div className="corporate-image-box">
                <img src="/assets/burobig/images/Tasarim%20Sureci.webp" alt="Tasarım Süreci — Bürobig" />
              </div>
              <div style={{ marginTop: '1.5rem', textAlign: 'left' }}>
                <div className="corporate-text-wrapper" style={{ marginBottom: '2rem' }}>
                  <p style={{ fontSize: '1.1rem', fontWeight: 400, color: '#1a1a1a', marginBottom: '0.5rem' }}>Bazı formlar zamansızdır.</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 400, color: '#1a1a1a', marginBottom: '1.25rem' }}>Bazı nesneler mekâna sadece işlev değil, karakter de katar.</p>
                  <p style={{ fontSize: '0.95rem', color: '#555555', lineHeight: 1.7, fontWeight: 300 }}>Adını aldığı monolitik mimariden ilham alan MONOLITH, bw3, sessiz duruşuyla gücü yansıtır. Yuvarlatılmış traverten tablası ve altındaki heykelsi hacimleriyle, sıradan bir çalışma masasından odanın odak noktasına dönüşür.</p>
                </div>
                <div style={{ borderTop: '1px solid #eaeaea', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.8rem', fontWeight: 400, letterSpacing: '2px', color: '#0e2922', textTransform: 'uppercase' }}>MONOLITH</span>
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontSize: '1.25rem', color: '#c9a96e' }}>Bürobig Tasarım Ekibi</span>
                  <span style={{ fontSize: '0.7rem', letterSpacing: '3px', color: '#8c9094', textTransform: 'uppercase', marginTop: '0.5rem', fontWeight: 500 }}>KONSEPT ESKİZ</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
