import React from 'react';

interface SectionTextProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
  style?: React.CSSProperties;
}

const fontFamily = `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif`;

const SectionText: React.FC<SectionTextProps> = ({ children, align = 'right', className = '', style = {} }) => (
  <div
    className={`max-w-md text-base text-gray-900 leading-relaxed text-${align} ${className}`.trim()}
    style={{ fontFamily, ...style }}
  >
    {children}
  </div>
);

export default SectionText; 