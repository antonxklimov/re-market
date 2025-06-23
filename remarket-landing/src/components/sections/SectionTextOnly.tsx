import React from 'react';
import SectionContainer from './SectionContainer';
import SectionTitle from './SectionTitle';
import SectionText from './SectionText';

interface SectionTextOnlyProps {
  title?: string;
  text: string;
  textAlign?: 'left' | 'center' | 'right';
}

const SectionTextOnly: React.FC<SectionTextOnlyProps> = ({ title, text, textAlign = 'right' }) => (
  <SectionContainer>
    {title && <SectionTitle>{title}</SectionTitle>}
    <SectionText align={textAlign}>{text}</SectionText>
  </SectionContainer>
);

export default SectionTextOnly; 