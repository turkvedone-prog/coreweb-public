import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSite } from './layouts/SiteLayout';
import { getPublishedLegalTexts } from './legalService';
import { updateSEOMeta } from '../../utils/seo';

export default function BurobigLegalDetail() {
  const { slug } = useParams();
  const { activeLang } = useSite();
  const [docData, setDocData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getPublishedLegalTexts()
      .then(list => {
        if (!isMounted) return;
        
        // Find matching document where translations[activeLang].slug matches slug OR document ID is type
        const found = list.find(item => {
          const trans = item.translations?.[activeLang];
          if (trans?.slug === slug) return true;
          if (item.id === slug) return true;
          
          // Fallback check: compare clean slug formats
          const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, '');
          const cleanTransSlug = (trans?.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          return cleanSlug === cleanTransSlug;
        });

        if (found) {
          setDocData(found);
        } else {
          setDocData(null);
        }
      })
      .catch(() => {
        if (isMounted) setDocData(null);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug, activeLang]);

  useEffect(() => {
    if (docData) {
      const trans = docData.translations?.[activeLang] || {};
      updateSEOMeta({
        title: trans.seoTitle || `${trans.title || 'Yasal Metin'} | Bürobig`,
        description: trans.metaDescription || '',
        companyName: ''
      });
    }
  }, [docData, activeLang]);

  if (loading) {
    return <div style={{ minHeight: '75vh' }} />;
  }

  if (!docData) {
    // Redirect/Show Not Found inside layout
    return (
      <main className="corporate-page" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="corporate-container" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#0d3b26', fontWeight: '400' }}>
            {activeLang === 'tr' ? 'Belge Bulunamadı' : 'Document Not Found'}
          </h2>
          <button 
            onClick={() => navigate(`/${activeLang}`)}
            style={{ 
              background: '#0d3b26', 
              color: '#fff', 
              border: 'none', 
              padding: '1rem 2.5rem', 
              fontSize: '0.85rem', 
              cursor: 'pointer' 
            }}
          >
            {activeLang === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home'}
          </button>
        </div>
      </main>
    );
  }

  const currentTrans = docData.translations?.[activeLang] || {};

  return (
    <main id="main-content" className="corporate-page" style={{ minHeight: '80vh', padding: '5rem 0', fontFamily: '"Outfit", sans-serif' }}>
      <style>{`
        .legal-content h2, .legal-content h3 { color: #0d3b26; margin-top: 2rem; margin-bottom: 1rem; font-weight: 500; font-size: 1.3rem; }
        .legal-content p { color: #555555; line-height: 1.8; margin-bottom: 1.2rem; font-size: 0.95rem; }
        .legal-content strong { color: #1a1a1a; font-weight: 600; }
        .legal-content ul, .legal-content ol { margin-bottom: 1.5rem; padding-left: 1.5rem; }
        .legal-content li { color: #555555; margin-bottom: 0.5rem; line-height: 1.7; font-size: 0.95rem; }
      `}</style>
      <div className="corporate-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 300, color: '#0d3b26', marginBottom: '2.5rem', borderBottom: '1px solid #eaeaea', paddingBottom: '1rem' }}>
          {currentTrans.title}
        </h1>
        <div 
          className="legal-content"
          dangerouslySetInnerHTML={{ __html: currentTrans.content || '' }} 
        />
      </div>
    </main>
  );
}
