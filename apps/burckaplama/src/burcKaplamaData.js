export const burcKaplamaData = {
  navigation: [
    { id: 'home', label: { tr: 'Anasayfa', en: 'Home' }, path: '/' },
    { id: 'about', label: { tr: 'Hakkımızda', en: 'About Us' }, path: '/hikayemiz' },
    { id: 'services', label: { tr: 'Hizmetler', en: 'Services' }, path: '/urunler' },
    { id: 'quality', label: { tr: 'Kalite Politikamız', en: 'Quality Policy' }, path: '/kalite-politikamiz' },
    { id: 'blog', label: { tr: 'Blog / Bilgi Merkezi', en: 'Blog' }, path: '/blog' },
    { id: 'contact', label: { tr: 'İletişim', en: 'Contact' }, path: '/iletisim' }
  ],
  company: {
    name: 'Burç Ağaç Kaplama',
    title: {
      tr: 'BURÇ AĞAÇ KAPLAMA A.Ş.',
      en: 'BURC WOOD VENEER CO.'
    },
    address: {
      tr: 'Bursa OSB, Bursa, Türkiye',
      en: 'Bursa OIZ, Bursa, Turkey'
    },
    addressDetail: {
      tr: 'Müşteri adres detayı bekleniyor',
      en: 'Client address details pending'
    },
    phone: 'Müşteri telefon bilgisi bekleniyor',
    email: 'Müşteri e-posta bilgisi bekleniyor',
    workingHours: {
      tr: 'Pzt - Cmt: 08:30 - 18:30',
      en: 'Mon - Sat: 08:30 - 18:30'
    },
    slogan: {
      tr: 'Doğadan ilham alan yenilikçi çizgilerle, geleceğin premium ofis ve yaşam alanlarını tasarlıyoruz.',
      en: 'We design premium offices and living spaces of the future with innovative lines inspired by nature.'
    }
  },
  slider: [
    {
      id: 1,
      subtitle: { tr: 'SEKTÖREL LİDERLİK', en: 'INDUSTRY LEADERSHIP' },
      title: { tr: 'Doğal Ahşap Kaplama', en: 'Natural Wood Veneers' },
      desc: { 
        tr: 'Doğadan elde edilen saf ahşabın eşsiz haresini ve dokusunu doğrudan premium projelerinize taşıyoruz.', 
        en: 'We bring the unique grain and texture of pure natural wood directly to your premium projects.' 
      },
      image: '/assets/burckaplama/surface-treatment.png'
    },
    {
      id: 2,
      subtitle: { tr: 'İLERİ TEKNOLOJİ', en: 'ADVANCED TECHNOLOGY' },
      title: { tr: 'Teknolojik Alpi Kaplama', en: 'Technological Alpi Veneers' },
      desc: { 
        tr: 'Sürdürülebilir orman kaynaklarından üretilen, kusursuz desen sürekliliğine sahip inovatif kaplama serileri.', 
        en: 'Innovative veneer series produced from sustainable forest resources with flawless pattern continuity.' 
      },
      image: '/assets/burckaplama/metal-plating.png'
    },
    {
      id: 3,
      subtitle: { tr: 'ÖZGÜN TASARIM', en: 'UNIQUE DESIGN' },
      title: { tr: 'Nadir Kök Ahşap Kaplama', en: 'Rare Burl Wood Veneers' },
      desc: { 
        tr: 'Doğanın en karmaşık ve sanatsal girdap desenlerini barındıran, lüks projeler için nadide çözümler.', 
        en: 'Rare solutions containing nature\'s most complex and artistic swirling patterns for luxury projects.' 
      },
      image: '/assets/burckaplama/protective-coating.png'
    }
  ],
  services: [
    {
      id: 'dogal-kaplama',
      slug: 'dogal-kaplama',
      title: { tr: 'Doğal Ahşap Kaplama', en: 'Natural Wood Veneer' },
      category: 'Doğal Kaplama',
      image: '/assets/burckaplama/veneer_dogal.png',
      summary: { 
        tr: 'Doğadan elde edilen saf ahşabın eşsiz haresini ve dokusunu doğrudan mekanlarınıza taşır.', 
        en: 'Brings the unique grain and texture of pure wood obtained from nature directly to your spaces.' 
      },
      desc: { 
        tr: 'Seçkin tomruklardan kesilen doğal ahşap kaplama levhalarımız, her yüzeyde benzersiz bir desen ve sıcaklık sunar. Mobilya, kapı ve özel panel üretimlerinde estetiğin doğal temsilcisidir.', 
        en: 'Our natural wood veneer sheets cut from selected logs offer a unique pattern and warmth on every surface. The natural representative of aesthetics in furniture, doors, and custom panels.' 
      },
      specs: [
        { key: { tr: 'Malzeme Türü', en: 'Material Type' }, value: { tr: 'Ceviz, Meşe, Freze, Hareliler', en: 'Walnut, Oak, Quarter, Crown Cut' } },
        { key: { tr: 'Standart Ebatlar', en: 'Standard Sizes' }, value: { tr: 'Boy: 210-320 cm / En: 10-35 cm', en: 'Length: 210-320 cm / Width: 10-35 cm' } },
        { key: { tr: 'Kalınlık Seçenekleri', en: 'Thickness Options' }, value: { tr: '0.55 mm - 1.5 mm Arası', en: 'Between 0.55 mm - 1.5 mm' } }
      ]
    },
    {
      id: 'kok-kaplama',
      slug: 'kok-kaplama',
      title: { tr: 'Kök Ahşap Kaplama', en: 'Burl Wood Veneer' },
      category: 'Kök Kaplama',
      image: '/assets/burckaplama/veneer_kok.png',
      summary: { 
        tr: 'Ağacın kök kısımlarından elde edilen, doğanın en karmaşık girdap desenli nadide kaplama türüdür.', 
        en: 'A rare veneer type featuring nature\'s most complex swirling patterns, obtained from root sections.' 
      },
      desc: { 
        tr: 'Ağacın toprak altında kalan özel kök veya ur kısımlarından elde edilen sanatsal desenler. Klasik ve modern lüks tasarımlarda, yat ve otomotiv içi ahşap dekorasyonlarında benzersiz odak noktaları oluşturur.', 
        en: 'Artistic patterns obtained from special root or burl parts of trees. It creates unique focal points in classic and modern luxury designs, as well as yacht and automotive interior decorations.' 
      },
      specs: [
        { key: { tr: 'Desen Karakteri', en: 'Pattern Character' }, value: { tr: 'Yoğun Girdap, Halka ve Doku', en: 'Intense Swirls, Rings and Textures' } },
        { key: { tr: 'Kullanım Alanları', en: 'Usage Areas' }, value: { tr: 'Yat İçi, Lüks Otomotiv, Özel Mobilyalar', en: 'Yacht Interiors, Luxury Automotive, Custom Furniture' } },
        { key: { tr: 'Nadir Türler', en: 'Rare Species' }, value: { tr: 'Ceviz Kökü, Zeytin Kökü, Maun Uru', en: 'Walnut Burl, Olive Burl, Mahogany Burl' } }
      ]
    },
    {
      id: 'alpi-kaplama',
      slug: 'alpi-kaplama',
      title: { tr: 'Alpi & Alpi Kök Kaplama', en: 'Alpi & Alpi Burl Veneer' },
      category: 'Alpi Kaplama',
      image: '/assets/burckaplama/veneer_alpi.png',
      summary: { 
        tr: 'Sürdürülebilir orman kaynaklarından üretilen, kusursuz desen sürekliliğine sahip teknolojik kaplamalar.', 
        en: 'Technological veneers produced from sustainable forest resources providing flawless pattern continuity.' 
      },
      desc: { 
        tr: 'İleri teknolojiyle işlenen ahşapların boyanması ve katmanlar halinde preslenmesiyle üretilen endüstriyel ahşap serisi. Geniş yüzeyli projelerde kusursuz desen takibi ve sürdürülebilir orman güvencesi sunar.', 
        en: 'Industrial wood series produced by dyeing and pressing wood layers with advanced technology. Offers flawless pattern matching on large surface projects and sustainable forest guarantee.' 
      },
      specs: [
        { key: { tr: 'Sürdürülebilirlik', en: 'Sustainability' }, value: { tr: 'FSC Sertifikalı Hızlı Büyüyen Ağaçlar', en: 'FSC Certified Fast-Growing Trees' } },
        { key: { tr: 'Desen Kararlılığı', en: 'Pattern Stability' }, value: { tr: 'Sıfır Hata, Sürekli Çizgisel/Haresel Takip', en: 'Zero Defect, Continuous Linear/Crown Match' } },
        { key: { tr: 'Renk Çeşitliliği', en: 'Color Variety' }, value: { tr: 'Doğal Tonlar ve Egzotik Renk Pigmentleri', en: 'Natural Tones & Exotic Color Pigments' } }
      ]
    },
    {
      id: 'proje-panel',
      slug: 'proje-panel',
      title: { tr: 'Mimari Panel & Proje Çözümleri', en: 'Architectural Panel & Project Solutions' },
      category: 'Özel Çözümler',
      image: '/assets/burckaplama/blog_veneer_trends.png',
      summary: { 
        tr: 'Premium ofis, otel ve lüks konut projeleri için özel kaplamalı panel üretimi ve teknik destek.', 
        en: 'Custom veneered panel production and technical support for premium office, hotel and luxury residential projects.' 
      },
      desc: { 
        tr: 'İç mimarlar ve yüklenici firmalar için projeye özel ebatlı, arkası astarlı veya MDF/Yonga levha üzerine preslenmiş hazır ahşap panel çözümleri sunuyoruz.', 
        en: 'We offer ready-to-use veneered panel solutions pressed on MDF/Particle board or fleece-backed, custom-sized for interior designers and contractors.' 
      },
      specs: [
        { key: { tr: 'Destek Tipi', en: 'Support Type' }, value: { tr: 'Mühendislik ve Mimari Şartname Desteği', en: 'Engineering & Architectural Spec Support' } },
        { key: { tr: 'Presleme Seçenekleri', en: 'Pressing Options' }, value: { tr: 'MDF, Yonga Levha, Kontraplak Üzerine Pres', en: 'Pressing on MDF, Particle Board, Plywood' } },
        { key: { tr: 'Doku Seçenekleri', en: 'Texture Options' }, value: { tr: 'Zımparalı, Astarlı, Fırçalanmış Yüzeyler', en: 'Sanded, Fleece-backed, Brushed Surfaces' } }
      ]
    }
  ]
};

export function translate(lang, obj) {
  if (!obj) return '';
  return obj[lang] || obj['tr'] || '';
}
