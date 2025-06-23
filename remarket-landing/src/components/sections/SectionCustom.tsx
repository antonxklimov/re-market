import React from 'react';
import SectionContainer from './SectionContainer';
import SectionTitle from './SectionTitle';

interface SectionCustomProps {
  title?: string;
  children: React.ReactNode;
}

const SectionCustom: React.FC<SectionCustomProps> = ({ title, children }) => (
  <SectionContainer>
    {title && <SectionTitle>{title}</SectionTitle>}
    {children}
  </SectionContainer>
);

export default SectionCustom; 