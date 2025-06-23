import React, { useState } from 'react';

const menuItems = [
  { id: 'about', label: 'о маркете' },
  { id: 'location', label: 'локация' },
  { id: 'brands', label: 'бренды' },
  { id: 'music', label: 'музыка' },
  { id: 'activities', label: 'активности' },
  { id: 'food', label: 'еда' },
  { id: 'map', label: 'карта' },
  // { id: 'partners', label: 'партнеры' },
  // { id: 'media', label: 'медиа' },
];

const blurHandlers = {
  onMouseOver: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.filter = 'blur(2px)'),
  onMouseOut: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.filter = 'none'),
  onTouchStart: (e: React.TouchEvent<HTMLElement>) => (e.currentTarget.style.filter = 'blur(2px)'),
  onTouchEnd: (e: React.TouchEvent<HTMLElement>) => (e.currentTarget.style.filter = 'none'),
};

const Navigation: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string, closeMobile?: boolean) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const isMobile = window.innerWidth < 1024;
      const offset = isMobile ? 80 : 100;
      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const top = rect.top + scrollTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    if (closeMobile) setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop menu */}
      <nav
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 min-w-[320px] lg:min-w-[900px] rounded-2xl px-2 sm:px-4 lg:px-8 py-2 flex justify-center items-center transition-all duration-300 h-12"
        style={{
          maxWidth: 'calc(100vw - 16px)',
          height: '48px',
          background: 'rgba(255,255,255,0.18)',
          boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        {/* Оверлей для размытых краёв */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            zIndex: 1,
            boxShadow: '0 0 32px 12px rgba(247,248,243,0.7)',
            filter: 'blur(8px)',
            opacity: 0.7,
          }}
        />
        {/* Desktop: горизонтальное меню */}
        <div className="hidden lg:flex w-full justify-center space-x-2 sm:space-x-4 lg:space-x-6">
          {menuItems.map((item) => (
                <a
              key={item.id}
              href={`#${item.id}`}
              className="font-medium text-gray-900 transition-all duration-200 px-1 py-1 rounded-lg"
              style={{ fontSize: '1rem', lineHeight: '1.4rem', whiteSpace: 'nowrap', WebkitTapHighlightColor: 'transparent' }}
              {...blurHandlers}
              onClick={e => handleMenuClick(e, item.id)}
            >
              {item.label}
                </a>
              ))}
            </div>
        {/* Mobile: кнопка Меню */}
        <div className="flex lg:hidden w-full justify-center">
            <button
              className="min-w-[320px] lg:min-w-[900px] rounded-2xl px-2 sm:px-4 lg:px-8 py-2 flex justify-center items-center transition-all duration-300 h-12 bg-white/60 text-base font-semibold text-gray-900 hover:bg-white/80"
              style={{
                maxWidth: 'calc(100vw - 16px)',
                height: '48px',
                background: 'rgba(255,255,255,0.18)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: 'none',
                border: 'none',
                WebkitTapHighlightColor: 'transparent',
              }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Открыть меню"
            >
              Меню
            </button>
        </div>
      </nav>
      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed top-20 left-1/2 transform -translate-x-1/2 z-50 min-w-[320px] max-w-[90vw] rounded-2xl px-2 sm:px-4 py-2 flex flex-col items-center justify-center animate-fade-in"
          style={{
            background: 'rgba(255,255,255,0.18)',
            boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            width: 'calc(100vw - 16px)',
            height: 'auto',
            position: 'fixed',
            left: '50%',
            top: '80px',
            transform: 'translateX(-50%)',
          }}
        >
          {/* Оверлей для размытых краёв */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              zIndex: 1,
              boxShadow: '0 0 32px 12px rgba(247,248,243,0.7)',
              filter: 'blur(8px)',
              opacity: 0.7,
            }}
          />
          <div className="relative w-full flex flex-col items-center space-y-2 py-2">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="w-full text-center font-medium text-gray-900 transition-all duration-200 px-2 py-1 rounded-lg"
                style={{ fontSize: '1rem', lineHeight: '1.4rem', whiteSpace: 'nowrap', WebkitTapHighlightColor: 'transparent', position: 'relative', zIndex: 2 }}
                onClick={e => handleMenuClick(e, item.id, true)}
                {...blurHandlers}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation; 