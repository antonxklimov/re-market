import React from 'react';
import SectionContainer from './SectionContainer';
import SectionTitle from './SectionTitle';
import Card from './Card';
import SectionText from './SectionText';

interface SectionSideBySideProps {
  title?: string;
  cardContent?: React.ReactNode;
  text: string;
  cardPosition?: 'left' | 'right';
  textAlign?: 'left' | 'center' | 'right';
}

const SectionSideBySide: React.FC<SectionSideBySideProps> = ({
  title,
  cardContent,
  text,
  cardPosition = 'right',
  textAlign = 'left',
}) => (
  <SectionContainer>
    {title && <SectionTitle>{title}</SectionTitle>}
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full max-w-5xl mx-auto">
      {cardPosition === 'left' && <Card className="flex-shrink-0 w-full max-w-xl" >{cardContent}</Card>}
      <SectionText align={textAlign} className="flex-1">{text}</SectionText>
      {cardPosition === 'right' && <Card className="flex-shrink-0 w-full max-w-xl" >{cardContent}</Card>}
    </div>
  </SectionContainer>
);

export default SectionSideBySide; 