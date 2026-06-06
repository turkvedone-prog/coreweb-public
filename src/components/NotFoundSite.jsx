import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFoundSite({ title, reason }) {
  const isPageNotFound = reason?.includes('Sayfa') || reason?.includes('İçerik') || reason?.includes('Haber') || reason?.includes('Ürün');
  const finalTitle = title || (isPageNotFound ? 'Sayfa Bulunamadı' : 'Web Sitesi Bulunamadı');

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6 relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full text-center bg-slate-800/40 p-8 sm:p-10 rounded-3xl border border-slate-700/40 shadow-2xl backdrop-blur-xl space-y-6 relative z-10">
        <div className="inline-flex p-4 bg-red-500/10 rounded-2xl text-red-400">
          <AlertCircle className="h-10 w-10 stroke-[1.5]" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            {finalTitle}
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            {reason || 'Ulaşmaya çalıştığınız sayfa mevcut değil, adresi yanlış girilmiş veya yayından kaldırılmış olabilir.'}
          </p>
        </div>

        {isPageNotFound && (
          <div className="pt-2">
            <Link
              to=""
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Ana Sayfaya Dön</span>
            </Link>
          </div>
        )}

        <div className="text-[10px] text-slate-600 border-t border-slate-700/30 pt-4">
          CoreWeb &copy; {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
