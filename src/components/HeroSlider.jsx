import { useState, useEffect } from 'react';
import { getLocalizedContent } from '../utils/i18nContent';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSlider({ sliders = [], activeLang }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (sliders.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % sliders.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [sliders.length]);

  const nextSlide = () => {
    setCurrentIdx((prev) => (prev + 1) % sliders.length);
  };

  const prevSlide = () => {
    setCurrentIdx((prev) => (prev - 1 + sliders.length) % sliders.length);
  };

  // Fallback Hero if no slides exist
  if (!sliders || sliders.length === 0) {
    return (
      <div className="relative bg-slate-950 text-white min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950/40 z-0" />
        <div className="slider-bg-circle" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-indigo-500/30 text-indigo-400 text-xs font-semibold bg-indigo-500/10 mb-6 backdrop-blur-sm animate-pulse">
            CoreWeb Web Portal
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            {activeLang === 'tr' ? 'CoreWeb Dünyasına Hoş Geldiniz' : 'Welcome to CoreWeb World'}
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            {activeLang === 'tr' 
              ? 'Şirketinizin dijital varlığını modern, hızlı ve şık bir web sitesi ile güçlendirin.'
              : 'Empower your company\'s digital presence with a modern, fast and elegant website.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] bg-slate-900 overflow-hidden group">
      {/* Slides */}
      {sliders.map((slide, idx) => {
        const localized = getLocalizedContent(slide, activeLang);
        const isActive = idx === currentIdx;
        const desktopImg = slide.desktopImg || '';
        const mobileImg = slide.mobileImg || desktopImg;
        const textColor = slide.textColor === 'light' ? 'text-white' : 'text-slate-900';
        const isDarkTheme = slide.textColor !== 'dark';

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image/Overlay */}
            <picture className="absolute inset-0 w-full h-full object-cover">
              <source media="(max-w: 640px)" srcSet={mobileImg} />
              <img 
                src={desktopImg} 
                alt={localized.title} 
                className="w-full h-full object-cover object-center" 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </picture>

            {/* Premium Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${
              isDarkTheme
                ? 'from-black/60 via-black/40 to-transparent'
                : 'from-white/60 via-white/40 to-transparent'
            }`} />

            {/* Slide Content */}
            <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className={`max-w-2xl space-y-6 transform transition-all duration-700 delay-300 ${
                isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              } ${slide.align === 'center' ? 'mx-auto text-center' : slide.align === 'right' ? 'ml-auto text-right' : 'text-left'}`}>
                {localized.subtitle && (
                  <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    isDarkTheme ? 'bg-white/10 text-white/90 border border-white/20' : 'bg-slate-900/10 text-slate-800'
                  } backdrop-blur-md`}>
                    {localized.subtitle}
                  </span>
                )}
                <h2 className={`text-4xl sm:text-6xl font-extrabold tracking-tight ${textColor} leading-tight`}>
                  {localized.title}
                </h2>
                {localized.content && (
                  <p className={`text-base sm:text-lg leading-relaxed ${isDarkTheme ? 'text-slate-300' : 'text-slate-600'}`}>
                    {localized.content}
                  </p>
                )}

                {/* Button Action */}
                {slide.btnText && (
                  <div className="pt-4">
                    <a
                      href={slide.btnUrl || '#'}
                      className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5 ${
                        isDarkTheme
                          ? 'bg-white text-slate-900 hover:bg-slate-100 hover:shadow-white/10'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-500/10'
                      }`}
                    >
                      {slide.btnText}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Controls */}
      {sliders.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/20 text-white border border-white/10 hover:bg-black/40 hover:scale-105 transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/20 text-white border border-white/10 hover:bg-black/40 hover:scale-105 transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2.5">
            {sliders.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIdx ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
