import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  mt?: number;
  mb?: number;
  align?: 'left' | 'center' | 'right';
}

const fontFamily = `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif`;

const SectionTitle: React.FC<SectionTitleProps> = ({ children, mt = 40, mb = 40, align = 'center' }) => (
  <h2
    className={`w-full text-${align} text-gray-900 text-4xl sm:text-6xl md:text-7xl lg:text-[96px]`}
    style={{ fontWeight: 500, margin: `${mt}px 0 ${mb}px 0`, lineHeight: 1, fontFamily }}
  >
    {typeof children === 'string' ? children.toLocaleLowerCase() : children}
  </h2>
);

export default SectionTitle; 