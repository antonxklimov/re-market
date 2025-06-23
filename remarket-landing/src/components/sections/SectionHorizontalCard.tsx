import React from 'react';
import SectionContainer from './SectionContainer';
import SectionTitle from './SectionTitle';
import Card from './Card';
import SectionText from './SectionText';

interface SectionHorizontalCardProps {
  title?: string;
  cardContent?: React.ReactNode;
  text?: string;
  textAlign?: 'left' | 'center' | 'right';
  sectionTitleProps?: React.ComponentProps<typeof SectionTitle>;
  sectionTextProps?: React.ComponentProps<typeof SectionText>;
}

const SectionHorizontalCard: React.FC<SectionHorizontalCardProps> = ({
  title,
  cardContent,
  text,
  textAlign = 'right',
  sectionTitleProps = {},
  sectionTextProps = {},
}) => (
  <SectionContainer>
    {title && <SectionTitle mt={40} mb={24} {...sectionTitleProps}>{title}</SectionTitle>}
    {text && <SectionText align={textAlign} className="mb-6" {...sectionTextProps}>{text}</SectionText>}
    <Card className="w-full aspect-[3/1] max-w-5xl mx-auto mb-8">{cardContent}</Card>
  </SectionContainer>
);

export default SectionHorizontalCard; 