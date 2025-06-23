import React from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const sections = [
    { id: 'hero', label: 'Главная' },
    { id: 'about', label: 'О маркете' },
    { id: 'location', label: 'Локация' },
    { id: 'brands', label: 'Бренды' },
    { id: 'music', label: 'Музыка' },
    { id: 'activities', label: 'Активности' },
    { id: 'food', label: 'Еда' },
    { id: 'map', label: 'Карта' },
    { id: 'partners', label: 'Партнеры' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="container h-full">
        <div className="flex justify-between items-center h-20">
          <span className="text-2xl font-serif font-bold tracking-tight">RE→MARKET</span>
          <button onClick={onClose} className="p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col space-y-6 mt-12">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-2xl font-serif hover:text-gray-600 transition-colors duration-200 font-light"
              onClick={onClose}
            >
              {section.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu; 