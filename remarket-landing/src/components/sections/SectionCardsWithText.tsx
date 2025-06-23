import React from 'react';
import SectionContainer from './SectionContainer';
import SectionTitle from './SectionTitle';
import SectionText from './SectionText';
import Card from './Card';

interface SectionCardsWithTextProps {
  title?: string;
  cards: React.ReactNode[];
  text?: string;
  textAlign?: 'left' | 'center' | 'right';
  cardsPerRow?: number;
  rows?: number;
  sectionTitleProps?: React.ComponentProps<typeof SectionTitle>;
}

const SectionCardsWithText: React.FC<SectionCardsWithTextProps> = ({
  title,
  cards,
  text,
  textAlign = 'right',
  cardsPerRow = 3,
  rows = 1,
  sectionTitleProps = {},
}) => {
  const cardsInRows = [];
  for (let i = 0; i < rows; i++) {
    cardsInRows.push(cards.slice(i * cardsPerRow, (i + 1) * cardsPerRow));
  }
  return (
    <SectionContainer>
      {title && <SectionTitle {...sectionTitleProps} children={title} />}
      {cardsInRows.map((row, idx) => (
        <div key={idx} className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row gap-6 mb-12">
          {row.map((card, i) => (
            <Card key={i}>{card}</Card>
          ))}
        </div>
      ))}
      {text && <SectionText align={textAlign}>{text}</SectionText>}
    </SectionContainer>
  );
};

export default SectionCardsWithText; 