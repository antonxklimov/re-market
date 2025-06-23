import React from 'react';
import SectionContainer from './SectionContainer';
import SectionTitle from './SectionTitle';

const fontFamily = `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif`;

interface SectionContactsProps {
  title?: string;
  email?: string;
  telegram?: string;
}

const SectionContacts: React.FC<SectionContactsProps> = ({
  title = 'контакты',
  email = 'info@remarket.com',
  telegram = '@remarket',
}) => (
  <SectionContainer>
    {title && <SectionTitle>{title}</SectionTitle>}
    <div className="flex flex-col gap-2 items-center text-lg sm:text-xl mt-8" style={{ fontFamily }}>
      <a href={`mailto:${email}`} className="hover:underline">{email}</a>
      <a href={`https://t.me/${telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{telegram}</a>
    </div>
  </SectionContainer>
);

export default SectionContacts; 