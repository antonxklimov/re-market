import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  className?: string;
  delay?: number;
  children?: React.ReactNode;
}

const fontFamily = `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif`;
const cardSizeClass = 'w-full aspect-square max-w-full sm:max-w-xl';

const Card: React.FC<CardProps> = ({ className = '', delay = 0, children }) => (
  <motion.div
    className={`${cardSizeClass} bg-gray-200 rounded-2xl flex items-center justify-center overflow-hidden ${className}`.trim()}
    style={{ fontFamily }}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: 'easeOut', delay }}
    viewport={{ once: true, amount: 0.2 }}
  >
    {children}
  </motion.div>
);

export default Card; 