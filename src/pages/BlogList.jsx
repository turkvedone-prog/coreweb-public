import { useEffect, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedBlogs } from '../services/publicContentService';
import { getLocalizedContent } from '../utils/i18nContent';
import { useSite } from '../layouts/SiteLayout';
import { Calendar, ChevronRight, BookOpen } from 'lucide-react';
import { updateSEOMeta } from '../utils/seo';
import ImageWithFallback from '../components/ImageWithFallback';
import themeRegistry from '../themes/themeRegistry';

export default function BlogList() {
  const { tenantMapping, activeLang, settings } = useSite();
  const { tenantId, tenantSlug } = tenantMapping;
  
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(tenantSlug !== 'capilon');
  const [error, setError] = useState(null);

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'coreweb.tr' || hostname.endsWith('.vercel.app');
  const companyName = settings?.companyName || tenantSlug || 'CoreWeb';

  useEffect(() => {
    if (!tenantId) return;

    if (tenantSlug === 'capilon') {
      return;
    }

    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const rawBlogs = await getPublishedBlogs(tenantId);
        const localizedBlogs = rawBlogs.map(doc => getLocalizedContent(doc, activeLang)).filter(Boolean);
        setBlogs(localizedBlogs);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(activeLang === 'tr' ? 'Blog yazıları yüklenirken bir hata oluştu.' : 'An error occurred while loading blog posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [tenantId, activeLang, tenantSlug]);

  // SEO Update
  useEffect(() => {
    updateSEOMeta({
      title: activeLang === 'tr' ? 'Blog' : 'Blog',
      description: activeLang === 'tr' 
        ? `${companyName} blog yazıları, güncel makaleler ve sektörel haberler.`
        : `${companyName} blog posts, articles, and industry insights.`,
      companyName
    });
  }, [activeLang, companyName]);

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  const getLocalizedPath = (path) => {
    const prefix = isLocalOrPortal ? `/${tenantSlug}/${activeLang}` : `/${activeLang}`;
    return `${prefix}${path}`;
  };

  const formatDate = (dateVal) => {
    if (!dateVal) return '';
    let dateObj;
    if (dateVal.seconds) {
      dateObj = new Date(dateVal.seconds * 1000);
    } else {
      dateObj = new Date(dateVal);
    }
    return dateObj.toLocaleDateString(activeLang === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
          <p className="mt-4 text-slate-500 font-medium">{translate('Yazılar yükleniyor...', 'Loading posts...')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-800">
          <p className="font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  const theme = themeRegistry[tenantSlug];
  if (theme?.BlogList) {
    const DynamicBlogList = theme.BlogList;
    return (
      <Suspense fallback={null}>
        <DynamicBlogList
          blogs={blogs}
          formatDate={formatDate}
          getLocalizedPath={getLocalizedPath}
        />
      </Suspense>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <BookOpen className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            {translate('Blog', 'Blog')}
          </h1>
          <p className="text-lg text-slate-600">
            {translate(
              'Sektörel gelişmeler, makaleler ve ipuçları içeren güncel paylaşımlarımızı keşfedin.',
              'Discover our latest articles, insights, and industry updates.'
            )}
          </p>
        </div>

        {/* Content List */}
        {blogs.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
            <div className="p-3 bg-slate-100 text-slate-400 rounded-2xl inline-block">
              <BookOpen className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{translate('Blog Yazısı Bulunmuyor', 'No Blog Posts Found')}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {translate('Bu kiracı için henüz yayınlanmış bir blog yazısı bulunmamaktadır.', 'There are no published blog posts for this tenant yet.')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => {
              // Ensure we fallback correctly to default language slug if the active slug isn't there
              const blogSlug = blog.slug || blog.id;
              const detailPath = getLocalizedPath(`/blog/${blogSlug}`);

              return (
                <article key={blog.id} className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                  {/* Image Container */}
                  <div className="aspect-[16/9] w-full bg-slate-100 overflow-hidden relative">
                    <ImageWithFallback 
                      src={blog.coverImageUrl} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      fallbackIcon={BookOpen}
                    />
                    {blog.category && (
                      <span className="absolute top-4 left-4 bg-indigo-600 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-lg">
                        {blog.category}
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-grow space-y-4">
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 line-clamp-2 hover:text-indigo-600 transition-colors">
                      <Link to={detailPath}>{blog.title}</Link>
                    </h2>

                    <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed flex-grow">
                      {blog.summary || blog.content?.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
                    </p>

                    {blog.isFallback && (
                      <span className="text-[10px] text-amber-600 bg-amber-50 self-start px-2 py-0.5 rounded font-medium">
                        {translate(`Sadece Türkçe`, `Turkish Only`)}
                      </span>
                    )}

                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                      <Link 
                        to={detailPath} 
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                      >
                        <span>{translate('Devamını Oku', 'Read More')}</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
