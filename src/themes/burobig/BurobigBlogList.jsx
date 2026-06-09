import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, BookOpen } from 'lucide-react';

export default function BurobigBlogList({ blogs, formatDate, getLocalizedPath }) {
  const categories = ['Hepsi', 'Tasarım', 'Trendler', 'Mekan Kurgusu', 'Sürdürülebilirlik'];
  const [selectedCategory, setSelectedCategory] = useState('Hepsi');

  const filteredBlogs = selectedCategory === 'Hepsi'
    ? blogs
    : blogs.filter(b => b.category?.trim().toLowerCase() === selectedCategory.trim().toLowerCase());

  return (
    <main id="main-content" className="blog-list-page">
      {/* Blog Header */}
      <section className="blog-list-header">
        <h1 className="blog-list-title">Blog</h1>
        <p className="blog-list-subtitle">
          Ofis yaşamı, çalışma trendleri, ergonomi ve premium tasarım dünyasına dair en son makale ve fikirlerimizi keşfedin.
        </p>
      </section>

      {/* Categories Bar */}
      <div className="category-filter-container">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="blog-list-grid-container">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12" style={{ border: '1px solid #eaeaea', borderRadius: '12px', padding: '3rem', backgroundColor: '#ffffff', maxWidth: '400px', margin: '0 auto' }}>
            <BookOpen className="h-8 w-8 mx-auto text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Yazı Bulunmadı</h3>
            <p className="text-sm text-slate-500">Bu kategori altında henüz yayınlanmış bir yazı bulunmuyor.</p>
          </div>
        ) : (
          <div className="blog-list-grid">
            {filteredBlogs.map((blog) => {
              const blogSlug = blog.slug || blog.id;
              const detailPath = getLocalizedPath(`/blog/${blogSlug}`);

              return (
                <article key={blog.id} className="blog-list-card">
                  <div className="blog-list-image-wrapper">
                    <img src={blog.coverImageUrl} alt={blog.title} />
                    {blog.category && <span className="blog-list-tag">{blog.category}</span>}
                  </div>
                  <div className="blog-list-card-content">
                    <div className="blog-list-date">
                      <Calendar className="h-3 w-3" style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                    <Link to={detailPath} className="blog-list-card-title">
                      {blog.title}
                    </Link>
                    <p className="blog-list-card-summary">
                      {blog.summary || (blog.content?.replace(/<[^>]*>/g, '').substring(0, 150) + '...')}
                    </p>
                    <Link to={detailPath} className="blog-list-read-more">
                      <span>Hemen İncele</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
