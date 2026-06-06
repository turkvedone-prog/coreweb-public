export default function LoadingState() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-50/50 backdrop-blur-md z-50">
      <div className="flex flex-col items-center space-y-4 p-6 rounded-3xl bg-white/70 border border-slate-200/50 shadow-xl max-w-xs w-full">
        <div className="relative flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-[3px] border-indigo-600 border-t-transparent" />
        </div>
        <p className="text-slate-500 font-semibold text-xs tracking-wide uppercase text-center animate-pulse">
          Yükleniyor...
        </p>
      </div>
    </div>
  );
}
