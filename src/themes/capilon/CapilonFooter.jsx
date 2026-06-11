import { Link } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import { Phone, ChevronUp } from 'lucide-react';
import './capilon.css';

export default function CapilonFooter() {
  const { tenantMapping, activeLang } = useSite();
  const { tenantSlug } = tenantMapping;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.vercel.app');

  const getLocalizedPath = (path) => {
    const prefix = isLocalOrPortal ? `/${tenantSlug}/${activeLang}` : `/${activeLang}`;
    return `${prefix}${path}`;
  };

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  return (
    <>
      {/* Footer */}
      <footer className="mega-footer" aria-label="Site Footer" id="iletisim-footer">
        <div className="footer-main-container">
          <div className="footer-links-area">
            <div className="footer-col">
              <h4 className="footer-heading">{translate('Popüler Takımlar', 'Popular Sets')}</h4>
              <ul className="footer-list">
                <li><a href={getLocalizedPath('/#koltuk')}>{translate('Koltuk Takımları', 'Living Room Sets')}</a></li>
                <li><a href={getLocalizedPath('/#kose')}>{translate('Köşe Takımları', 'Corner Sofa Sets')}</a></li>
                <li><Link to={getLocalizedPath('/koleksiyonlar/yemek-odalari')}>{translate('Yemek Odası Takımları', 'Dining Room Sets')}</Link></li>
                <li><a href={getLocalizedPath('/#yatak')}>{translate('Yatak Odası Takımları', 'Bedroom Sets')}</a></li>
                <li><a href={getLocalizedPath('/#genc')}>{translate('Genç Odası Takımları', 'Teen Room Sets')}</a></li>
                <li><a href="#evlilik-paketleri">{translate('Düğün Paketleri', 'Wedding Packages')}</a></li>
                <li><a href={getLocalizedPath('/#mutfak')}>{translate('Mutfak Takımları', 'Kitchen Sets')}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">{translate('Popüler Kategoriler', 'Popular Categories')}</h4>
              <ul className="footer-list">
                <li><a href={getLocalizedPath('/#koltuk')}>{translate('Oturma Grubu', 'Living Room')}</a></li>
                <li><Link to={getLocalizedPath('/koleksiyonlar/yemek-odalari')}>{translate('Yemek Odası', 'Dining Room')}</Link></li>
                <li><a href={getLocalizedPath('/#yatak')}>{translate('Yatak Odası', 'Bedroom')}</a></li>
                <li><a href={getLocalizedPath('/#genc')}>{translate('Genç ve Çocuk Odası', 'Teen & Kid Room')}</a></li>
                <li><a href="#bahce-mobilyalari">{translate('Bahçe Mobilyaları', 'Garden Furniture')}</a></li>
                <li><a href="#dolaplar">{translate('Dolaplar', 'Wardrobes')}</a></li>
                <li><a href={getLocalizedPath('/#tv')}>{translate('TV Üniteleri', 'TV Units')}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">{translate('Capilon Yatak', 'Capilon Mattress')}</h4>
              <ul className="footer-list">
                <li><a href="#yataklar">{translate('Yataklar', 'Mattresses')}</a></li>
                <li><a href="#yastik-yorgan">{translate('Yastık & Yorgan', 'Pillows & Quilts')}</a></li>
                <li><a href="#baza-baslik">{translate('Baza & Başlık', 'Bases & Headboards')}</a></li>
                <li><a href="#yatak-odasi-tekstili">{translate('Yatak Odası Tekstili', 'Bedroom Textile')}</a></li>
                <li><a href="#yatak-odasi-ceyiz">{translate('Yatak Odası Çeyiz Listesi', 'Bedroom Dowry List')}</a></li>
                <li><a href={getLocalizedPath('/#yatak')}>{translate('Tek Kişilik Yataklar', 'Single Mattresses')}</a></li>
                <li><a href={getLocalizedPath('/#yatak')}>{translate('Çift Kişilik Yataklar', 'Double Mattresses')}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">{translate('2026 Kataloglar', '2026 Catalogs')}</h4>
              <p className="footer-desc">{translate('Koleksiyonlarımızın kataloglarını inceleyin.', 'Examine the catalogs of our collections.')}</p>
              <div className="footer-catalogs-grid">
                <img src="/assets/capilon/images/hero_living_room_1779477814666.png" alt="Katalog 1" loading="lazy" />
                <img src="/assets/capilon/images/hero_bedroom_1779477829254.png" alt="Katalog 2" loading="lazy" />
                <img src="/assets/capilon/images/product_dining_1779477859352.png" alt="Katalog 3" loading="lazy" />
                <img src="/assets/capilon/images/capilon_banner_couple_1779566197653.png" alt="Katalog 4" loading="lazy" />
              </div>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Capilon Kurumsal</h4>
              <ul className="footer-list">
                <li><Link to={getLocalizedPath('/hikayemiz')}>{translate('Hakkımızda', 'About Us')}</Link></li>
                <li><Link to={getLocalizedPath('/iletisim')}>{translate('İletişim', 'Contact')}</Link></li>
                <li><a href="#is-ortakligi">{translate('İş Ortaklığı', 'Partnership')}</a></li>
                <li><a href="#kataloglar">{translate('Kataloglar', 'Catalogs')}</a></li>
                <li><Link to={getLocalizedPath('/magazalarimiz')}>{translate('Mağazalar', 'Stores')}</Link></li>
                <li><Link to={getLocalizedPath('/blog')}>{translate('Blog', 'Blog')}</Link></li>
                <li><a href="#tedarikci">{translate('Tedarikçi Başvuru', 'Supplier Application')}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">{translate('Hızlı Erişim', 'Quick Access')}</h4>
              <ul className="footer-list">
                <li><a href="#dekorasyon">{translate('Dekorasyon Önerileri', 'Decoration Tips')}</a></li>
                <li><a href="#siparislerim">{translate('Siparişlerim', 'My Orders')}</a></li>
                <li><a href="#hesabim">{translate('Hesabım', 'My Account')}</a></li>
                <li><a href="#siparis-takibi">{translate('Sipariş Takibi', 'Order Tracking')}</a></li>
                <li><a href="#sifremi-unuttum">{translate('Şifremi Unuttum', 'Forgot Password')}</a></li>
                <li><a href="#destek">{translate('Destek Merkezi', 'Support Center')}</a></li>
                <li><a href="#kampanyalar">{translate('Kampanyalar', 'Campaigns')}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">{translate('Sözleşmeler', 'Agreements')}</h4>
              <ul className="footer-list">
                <li><a href="#iptal">{translate('İptal ve İade Şartları', 'Cancellation & Return Policy')}</a></li>
                <li><a href="#bilgi">{translate('Bilgi Toplumu Hizmetleri', 'Information Society Services')}</a></li>
                <li><a href="#gizlilik">{translate('Gizlilik ve Güvenlik', 'Privacy & Security')}</a></li>
                <li><a href="#kvkk">{translate('KVKK Aydınlatma Metni', 'KVKK Disclosure')}</a></li>
                <li><a href="#aydinlatma">{translate('Aydınlatma Metni', 'Clarification Text')}</a></li>
                <li><a href="#ziyaretci">{translate('Ziyaretçi Aydınlatma Metni', 'Visitor Clarification Text')}</a></li>
                <li><a href="#kargo">{translate('Kargo ve Teslimat Politikası', 'Shipping & Delivery Policy')}</a></li>
                <li><a href="#cerez">{translate('Çerez Politikası', 'Cookie Policy')}</a></li>
              </ul>
            </div>
            <div className="footer-col contact-col">
              <h4 className="footer-heading">{translate('İletişim Merkezi', 'Contact Center')}</h4>
              <p className="footer-desc">{translate('Bize yazarak yada arayarak ulaşabilirsiniz.', 'You can reach us by writing or calling.')}</p>
              <Link to={getLocalizedPath('/iletisim')} className="footer-contact-btn">{translate('İletişim', 'Contact')}</Link>
              <a href="tel:+903123790333" className="footer-contact-btn tel-btn">
                <Phone size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                0312 379 03 33
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            Copyright © 2026 Capilon Mobilya. {translate('Tüm hakları saklıdır.', 'All rights reserved.')}
          </div>
          <div className="footer-signature" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href="https://www.coreweb.tr" target="_blank" className="footer-coreweb-link" rel="noopener noreferrer">
              <img src="/assets/coreweb/coreweb-logo-white.svg" className="coreweb-logo logo-disi" alt="CoreWeb" />
              <img src="/assets/coreweb/coreweb-logo-color.svg" className="coreweb-logo logo-color" alt="CoreWeb" />
            </a>
            <button onClick={scrollToTop} className="scroll-top-btn" aria-label={translate('Yukarı Git', 'Scroll to Top')}>
              <ChevronUp size={18} />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
