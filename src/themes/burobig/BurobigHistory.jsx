import { useEffect } from 'react';

export default function BurobigHistory() {
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
          <span className="corporate-top-title">KURUMSAL / HİKAYEMİZ</span>
        </div>

        {/* SECTION: HİKAYEMİZ */}
        <section className="corporate-section reveal-up" style={{ borderBottom: 'none', paddingTop: '2rem' }}>
          <div className="corporate-grid">
            <div className="corporate-left">
              <h1 className="corporate-large-title">Bürobig, 1986'dan beri derin köklerinden aldığı özgüvenle üretiyor.</h1>
              <h2 className="corporate-sub-title">Küçük Bir Atölye. Büyük Bir Ciddiyet.</h2>
            </div>
            <div className="corporate-right">
              <div className="corporate-text-wrapper">
                <p>1986 yılında kurulan Bürobig, ofis mobilyası sektöründe kaliteyi bir standart değil, bir kültür olarak benimseyen köklü ve saygın bir markadır. Kuruluşundan bu yana güven, sürdürülebilirlik ve süreklilik ilkeleri doğrultusunda faaliyet gösteren Bürobig; istikrarlı büyüme stratejisi, yüksek üretim standartları ve güçlü kurumsal yapısı sayesinde sektörde ayrıcalıklı bir konum elde etmiştir.</p>
                <p>Bürobig'in hikayesi, çalışma alanlarını yalnızca işlevsel mekanlar olarak değil; kurumsal kimliği yansıtan, verimliliği artıran ve kullanıcı deneyimi odağına alan yaşam alanları olarak ele alan bir vizyonla şekillenmiştir. Bu yaklaşım doğrultusunda marka, modern üretim altyapısını çağdaş tasarım anlayışı ve ileri mühendislik çözümleriyle bir araya getirerek, zamansız ve nitelikli ofis mobilyaları geliştirmektedir.</p>
                <p>Tasarım ve üretim süreçlerinde ergonomi, dayanıklılık ve estetik dengeyi ön planda tutan Bürobig, kullanılan malzemelerdeki seçiciliği, detaylara gösterdiği özen ve titizlikle yürütülen kalite kontrol süreçleriyle üst segment bir marka duruşu sergilemektedir. Her bir ürün, uzun ömürlü kullanım, konfor ve görsel bütünlük hedefiyle hayata geçirilmektedir.</p>
                <p>Kurumsal değerlerine bağlı, şeffaf ve sorumluluk bilinci yüksek yönetim anlayışıyla hareket eden Bürobig; müşteri memnuniyetini yalnızca bir hedef değil, sürdürülebilir başarının temel unsuru olarak kabul etmektedir. Çevreye duyarlı üretim yaklaşımı ve etik iş anlayışı, markanın uzun vadeli vizyonunu destekleyen önemli yapı taşları arasında yer almaktadır.</p>
                <p>Bugün Bürobig; deneyimli kadrosu, güçlü organizasyon yapısı ve yenilikçi bakış açısıyla, ofis mobilyası sektöründe referans alınan markalardan biri olarak konumlanmakta, ulusal ve uluslararası ölçekte prestijli projelere değer katmaya devam etmektedir. Geleceğe, köklü geçmişinden aldığı güç ve sürekli gelişim anlayışıyla kararlılıkla ilerlemektedir.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
