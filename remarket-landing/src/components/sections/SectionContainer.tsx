import React from 'react';

interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: string;
  padding?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  className = '',
  style = {},
  maxWidth = 'max-w-7xl',
  padding = '',
  ...rest
}) => (
  <div
    className={`w-full mx-auto ${maxWidth} px-4 sm:px-8 ${padding} ${className}`.trim()}
    style={style}
    {...rest}
  >
    {children}
  </div>
);

export default SectionContainer; 