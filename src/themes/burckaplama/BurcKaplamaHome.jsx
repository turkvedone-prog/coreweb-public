import { useSite } from '../../layouts/SiteLayout';

export default function BurcKaplamaHome() {
  const { activeLang } = useSite();

  return (
    <div className="bk-home">
      {/* Hero Section */}
      <section className="bk-hero">
        <div className="bk-hero-bg" />
        <div className="bk-hero-content">
          <span className="bk-hero-badge">
            {activeLang === 'tr' ? 'Ahşabın Doğal Sanatı' : 'Natural Art of Wood'}
          </span>
          <h1 className="bk-hero-title">
            {activeLang === 'tr' ? (
              <>
                Mekanlara Değer Katan <br />
                <span>Nitelikli Kaplamalar</span>
              </>
            ) : (
              <>
                Premium Wood Veneers <br />
                <span>That Elevate Spaces</span>
              </>
            )}
          </h1>
          <p className="bk-hero-desc">
            {activeLang === 'tr'
              ? 'Yüksek kaliteli ahşap kaplama ve panel çözümlerimizle mimari projelerinize, mobilyalarınıza benzersiz bir estetik ve doğallık kazandırıyoruz.'
              : 'Add unique aesthetics and natural elegance to your architectural projects and furniture with our high-quality wood veneer and panel solutions.'}
          </p>
          <div className="bk-cta-group">
            <button className="bk-btn bk-btn-primary">
              {activeLang === 'tr' ? 'Koleksiyonları Keşfet' : 'Discover Collections'}
            </button>
            <button className="bk-btn bk-btn-secondary">
              {activeLang === 'tr' ? 'Bizimle İletişime Geçin' : 'Contact Us'}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bk-features">
        <div className="bk-section-header">
          <span className="bk-section-subtitle">
            {activeLang === 'tr' ? 'Neden Burç Kaplama?' : 'Why Choose Burç Kaplama?'}
          </span>
          <h2 className="bk-section-title">
            {activeLang === 'tr' ? 'Üstün Kalite ve Kusursuz İşçilik' : 'Superior Quality & Flawless Craftsmanship'}
          </h2>
        </div>

        <div className="bk-grid">
          <div className="bk-card">
            <div className="bk-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3 className="bk-card-title">
              {activeLang === 'tr' ? 'Seçkin Orman Ürünleri' : 'Premium Wood Selection'}
            </h3>
            <p className="bk-card-desc">
              {activeLang === 'tr'
                ? 'Dünyanın en nitelikli ve sürdürülebilir ormanlarından özenle seçilen tomrukları işleyerek en kaliteli kaplamaları üretiyoruz.'
                : 'We produce the finest veneers by processing logs carefully selected from the world\'s most qualified and sustainable forests.'}
            </p>
          </div>

          <div className="bk-card">
            <div className="bk-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <h3 className="bk-card-title">
              {activeLang === 'tr' ? 'Gelişmiş Teknoloji' : 'Advanced Technology'}
            </h3>
            <p className="bk-card-desc">
              {activeLang === 'tr'
                ? 'Modern dilme ve kurutma hatlarımızla, ahşabın dokusunu ve yapısını bozmadan yüksek hassasiyette üretim yapıyoruz.'
                : 'With our modern slicing and drying lines, we perform high-precision production without disturbing the texture of wood.'}
            </p>
          </div>

          <div className="bk-card">
            <div className="bk-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            </div>
            <h3 className="bk-card-title">
              {activeLang === 'tr' ? 'Geniş Ürün Yelpazesi' : 'Broad Product Range'}
            </h3>
            <p className="bk-card-desc">
              {activeLang === 'tr'
                ? 'Doğal kaplamalardan yapay kaplamalara, ekotik ağaçlardan özel tasarımlı endüstriyel panellere kadar yüzlerce çeşit sunuyoruz.'
                : 'We offer hundreds of varieties from natural veneers to engineered veneers, exotic woods to custom industrial panels.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
