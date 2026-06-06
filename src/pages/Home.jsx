import { useEffect, useState } from 'react';
import { getSliders } from '../services/publicContentService';
import HeroSlider from '../components/HeroSlider';
import { Mail, Phone, Sparkles, Award, Users } from 'lucide-react';
import { useSite } from '../layouts/SiteLayout';
import { updateSEOMeta } from '../utils/seo';

export default function Home() {
  const { tenantMapping, activeLang, settings } = useSite();
  const { tenantId, tenantSlug } = tenantMapping;
  const [sliders, setSliders] = useState([]);
  const [loadingSliders, setLoadingSliders] = useState(true);

  const companyName = settings?.companyName || tenantSlug || 'CoreWeb';

  useEffect(() => {
    // Dynamic SEO update for homepage
    const homeDescription = activeLang === 'tr'
      ? `${companyName} firmamıza hoş geldiniz. Modern teknolojiler ve uzman ekibimizle profesyonel çözümler sunuyoruz.`
      : `Welcome to ${companyName}. We offer professional solutions with modern technologies and our expert team.`;
    
    updateSEOMeta({
      title: settings?.homeTitle || (activeLang === 'tr' ? 'Ana Sayfa' : 'Home'),
      description: settings?.companyDescription || homeDescription,
      image: settings?.logos?.header || settings?.logos?.footer || '',
      companyName: settings?.homeTitle ? '' : companyName
    });
  }, [activeLang, companyName, settings]);

  useEffect(() => {
    if (!tenantId) return;

    const fetchSlidersData = async () => {
      try {
        const slidersData = await getSliders(tenantId);
        setSliders(slidersData);
      } catch (err) {
        console.error('Error fetching sliders for Home page:', err);
      } finally {
        setLoadingSliders(false);
      }
    };

    fetchSlidersData();
  }, [tenantId]);

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  return (
    <div className="home-page bg-slate-50 min-h-screen">
      {/* Hero Slider */}
      {loadingSliders ? (
        <div className="h-[600px] w-full bg-slate-900 animate-pulse flex items-center justify-center text-slate-400">
          {translate('Slider yükleniyor...', 'Loading slider...')}
        </div>
      ) : (
        <HeroSlider sliders={sliders} activeLang={activeLang} />
      )}

      {/* Welcome Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {translate('Biz Kimiz?', 'Who We Are?')}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            {translate(
              `${companyName} olarak müşterilerimize en kaliteli hizmetleri sunmak, dijital dönüşüm yolculuklarında yanlarında yer almak ve sektöre yön veren çözümler üretmek için çalışıyoruz. Modern teknolojiler ve uzman kadromuzla yanınızdayız.`,
              `As ${companyName}, we strive to offer the highest quality services to our customers, accompany them in their digital transformation journeys, and produce industry-leading solutions. We are here for you with modern technologies and our expert staff.`
            )}
          </p>
        </div>
      </section>

      {/* Stats/Badges Section */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 text-center space-y-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{translate('Yüksek Kalite Standartları', 'High Quality Standards')}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {translate('Tüm süreçlerimizde en yüksek kalite standartlarını uygulayarak kusursuz işler çıkartıyoruz.', 'We deliver flawless results by applying the highest quality standards in all our processes.')}
              </p>
            </div>

            <div className="flex flex-col items-center p-6 text-center space-y-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{translate('Müşteri Odaklılık', 'Customer Centered')}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {translate('Müşterilerimizin ihtiyaçlarını en ince ayrıntısına kadar dinliyor ve onlara özel çözümler geliştiriyoruz.', 'We listen to our customers\' needs down to the finest detail and develop custom solutions.')}
              </p>
            </div>

            <div className="flex flex-col items-center p-6 text-center space-y-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{translate('Sürekli İnovasyon', 'Continuous Innovation')}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {translate('Gelişen teknolojileri yakından takip ediyor, kendimizi sürekli yenileyerek sektörün önünde yer alıyoruz.', 'We closely follow emerging technologies, constantly renewing ourselves to stay ahead of the industry.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Info Section */}
      {settings?.contact && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <span className="text-indigo-400 font-semibold text-sm uppercase tracking-wider">{translate('İletişime Geçin', 'Get In Touch')}</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{translate('Projelerinizi Birlikte Hayata Geçirelim', 'Let\'s Bring Your Projects to Life Together')}</h2>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  {translate(
                    'Sorularınız, iş ortaklığı talepleriniz veya projeleriniz için bize dilediğiniz zaman ulaşabilirsiniz. Ekibimiz en kısa sürede size dönüş sağlayacaktır.',
                    'You can reach us at any time for your questions, partnership requests or projects. Our team will get back to you as soon as possible.'
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {settings.contact.phone && (
                  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 flex flex-col justify-between h-32">
                    <Phone className="h-6 w-6 text-indigo-400" />
                    <div>
                      <div className="text-xs text-slate-500 mb-1">{translate('Telefon Numarası', 'Phone Number')}</div>
                      <a href={`tel:${settings.contact.phone}`} className="text-sm font-bold hover:text-indigo-400 transition-colors">{settings.contact.phone}</a>
                    </div>
                  </div>
                )}
                {settings.contact.email && (
                  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 flex flex-col justify-between h-32">
                    <Mail className="h-6 w-6 text-indigo-400" />
                    <div>
                      <div className="text-xs text-slate-500 mb-1">{translate('E-Posta Adresi', 'Email Address')}</div>
                      <a href={`mailto:${settings.contact.email}`} className="text-sm font-bold hover:text-indigo-400 transition-colors break-all">{settings.contact.email}</a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
