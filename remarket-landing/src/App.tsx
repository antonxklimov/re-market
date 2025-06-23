import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import { ReactComponent as Logo } from './images/logo_white.svg';
import { motion } from 'framer-motion';
import SectionCardsWithText from './components/sections/SectionCardsWithText';
import SectionHorizontalCard from './components/sections/SectionHorizontalCard';
import SectionContainer from './components/sections/SectionContainer';
import SectionTitle from './components/sections/SectionTitle';
import SectionText from './components/sections/SectionText';
import Admin from './Admin';
import { Routes, Route } from 'react-router-dom';
import DividerBlock, { DividerBlockProps } from './components/sections/DividerBlock';
// import { Footer } from "./components/ui/footer";

const description =
  'Основная идея RE→MARKET заключается в том, чтобы показать, чем живет современная культура в Москве и познакомить с теми, кто ее создает. Мода, бьюти, искусство, музыка и многое другое, что окружает нас каждый день – все лучшее из этого можно найти здесь';

const fontFamily = `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif`;

// Универсальный класс для карточек теперь адаптивный
const cardSizeClass = "w-full aspect-square max-w-full sm:max-w-xl";

const Card = ({ className = "", delay = 0 }: { className?: string, delay?: number }) => (
  <motion.div
    className={`${cardSizeClass} bg-gray-200 rounded-2xl flex items-center justify-center overflow-hidden ${className}`}
    style={{ fontFamily }}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: 'easeOut', delay }}
    viewport={{ once: true, amount: 0.2 }}
  >
    {/* Здесь может быть фото или заглушка */}
  </motion.div>
);

const TextBlock = () => (
  <div className="max-w-md text-base text-gray-900 leading-relaxed" style={{ fontFamily }}>
    {description}
  </div>
);

const sectionClass =
  'relative z-10 flex flex-col lg:flex-row items-start justify-center w-full py-16 gap-12 lg:gap-24';

const LOCAL_KEY = "remarket_sections";
const SECTIONS = [
  { id: "about", label: "О маркете" },
  { id: "location", label: "Локация" },
  { id: "brands", label: "Бренды" },
  { id: "music", label: "Музыка" },
  { id: "activities", label: "Активности" },
  { id: "food", label: "Еда" },
  { id: "map", label: "Карта" },
  { id: "partners", label: "Партнеры" },
  { id: "media", label: "Медиа" },
];

function getDefaultSectionData() {
  return Object.fromEntries(SECTIONS.map(s => [s.id, { text: "", image: "" }]));
}

const App: React.FC = () => {
  const [sectionData, setSectionData] = useState(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) return JSON.parse(saved);
    return getDefaultSectionData();
  });

  // Для heroImage (титульная картинка)
  const heroImage = sectionData.heroImage || "";

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem(LOCAL_KEY);
      if (saved) setSectionData(JSON.parse(saved));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Вспомогательная функция для карточки с картинкой или заглушкой
  const ImageCard: React.FC<{ image?: string; alt?: string; className?: string }> = ({ image, alt = '', className = "" }) => (
    image ? (
      <motion.div className={`${cardSizeClass} bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden ${className}`}
        style={{ fontFamily }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <img src={image} alt={alt} className="object-cover w-full h-full" />
      </motion.div>
    ) : (
      <Card className={className} />
    )
  );

  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={
        <div className="min-h-screen bg-[#f7f8f3] font-sans relative overflow-hidden" style={{ fontFamily }}>
          <Navigation />
          {/* Общий контейнер для выравнивания всех секций и разделителей */}
          <div className="max-w-7xl mx-auto w-full">
            {/* Первый экран: серый блок и логотип */}
            <div className="relative flex items-center min-h-screen">
              {/* Логотип под блоком */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none" style={{zIndex: 1, transform: 'translate(-50%, -60%)', fontFamily }}>
                <Logo className="w-[40vw] max-w-2xl h-auto text-black" style={{fill: 'currentColor'}} />
              </div>
              {/* Первый разделитель (титульная картинка) */}
              <div className="absolute left-0 w-[132vw] max-w-7xl" style={{ top: 'calc(40% + 145px)', zIndex: 2, borderRadius: '1rem', fontFamily }}>
                <DividerBlock image={heroImage} />
              </div>
            </div>
            {/* --- О маркете --- */}
            <section id="about" className="scroll-mt-24 mb-12" style={{ marginTop: 275 }}>
              <SectionTitle>о маркете</SectionTitle>
              <div className={sectionClass} style={{ fontFamily }}>
                <div className="flex-shrink-0 w-full max-w-xl flex justify-start">
                  <ImageCard image={sectionData.about.image} alt="О маркете" />
                </div>
                <div className="flex-1 flex flex-col items-start justify-start px-4">
                  <div className="max-w-md text-base text-gray-900 leading-relaxed" style={{ fontFamily }}>
                    {sectionData.about.text || description}
                  </div>
                </div>
              </div>
            </section>
            {/* --- Локация --- */}
            <SectionContainer id="location" className="mb-12">
              <SectionTitle mt={40} mb={24}>Локация</SectionTitle>
              <SectionText className="mb-6" align="center">{sectionData.location.text || 'двор бара "Стрелка"'}</SectionText>
              <DividerBlock text={sectionData.location.text} image={sectionData.location.image} />
            </SectionContainer>
            {/* --- Бренды --- */}
            <div id="brands" className="mb-12">
              <SectionCardsWithText
                title="Бренды"
                cards={Array(3).fill(0).map((_, i) => (
                  <ImageCard key={i} image={sectionData.brands.image} alt="Бренд" />
                ))}
                text={sectionData.brands.text}
                cardsPerRow={3}
                rows={1}
              />
            </div>
            {/* --- Музыка --- */}
            <div id="music" className="mb-12">
              <SectionCardsWithText
                title="Музыка"
                cards={Array(3).fill(0).map((_, i) => (
                  <ImageCard key={i} image={sectionData.music.image} alt="Музыка" />
                ))}
                text={sectionData.music.text}
                cardsPerRow={3}
                rows={1}
              />
            </div>
            {/* --- Активности --- */}
            <SectionContainer id="activities" className="mb-12">
              <SectionTitle mt={40} mb={24}>Активности</SectionTitle>
              <SectionText className="mb-6" align="center">{sectionData.activities.text}</SectionText>
              <DividerBlock text={sectionData.activities.text} image={sectionData.activities.image} />
            </SectionContainer>
            {/* --- Еда --- */}
            <SectionContainer id="food" className="mb-12">
              <SectionTitle mt={40} mb={24}>Еда</SectionTitle>
              <SectionText className="mb-6" align="left">{sectionData.food.text || 'Текст про еду'}</SectionText>
              <DividerBlock text={sectionData.food.text} image={sectionData.food.image} />
            </SectionContainer>
            {/* --- Карта --- */}
            <SectionContainer id="map" className="mb-12">
              <SectionTitle mt={40} mb={24}>Карта</SectionTitle>
              <SectionText className="mb-6" align="center">{sectionData.map.text}</SectionText>
              <DividerBlock text={sectionData.map.text} image={sectionData.map.image} />
            </SectionContainer>
            {/* --- Партнеры --- */}
            <div id="partners" className="mb-12">
              <SectionCardsWithText
                title="Партнеры"
                cards={Array(4).fill(0).map((_, i) => (
                  <ImageCard key={i} image={sectionData.partners.image} alt="Партнер" />
                ))}
                text={sectionData.partners.text}
                cardsPerRow={4}
                rows={1}
              />
            </div>
            {/* --- Медиа --- */}
            <div id="media" className="mb-12">
              <SectionCardsWithText
                title="Медиа"
                cards={Array(4).fill(0).map((_, i) => (
                  <ImageCard key={i} image={sectionData.media.image} alt="Медиа" />
                ))}
                text={sectionData.media.text}
                cardsPerRow={4}
                rows={1}
              />
            </div>
          </div>
        </div>
      } />
    </Routes>
  );
};

export default App;
