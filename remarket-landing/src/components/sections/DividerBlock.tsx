import React from 'react';
import { motion } from 'framer-motion';

interface DividerBlockProps {
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
  text?: string;
  image?: string;
  imageAlt?: string;
  textAlign?: 'left' | 'center' | 'right';
}

const DividerBlock: React.FC<DividerBlockProps> = ({ delay = 0, style = {}, className = '', text, image, imageAlt = '', textAlign = 'center' }) => (
  <motion.div
    className={`relative w-[132vw] max-w-7xl rounded-[1rem] mx-auto flex flex-col items-center justify-center ${className}`.trim()}
    style={{ height: '65vh', marginBottom: 50, background: image ? 'transparent' : '#e5e7eb', ...style }}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: 'easeOut', delay }}
    viewport={{ once: true, amount: 0.2 }}
  >
    {image && (
      <img src={image} alt={imageAlt} className="absolute inset-0 w-full h-full object-cover rounded-[1rem] opacity-1" />
    )}
  </motion.div>
);

export type { DividerBlockProps };
export default DividerBlock; 