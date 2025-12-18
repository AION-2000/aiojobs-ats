
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  layout?: boolean;
}

export const PageTransition: React.FC<MotionWrapperProps> = ({ children, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const FadeIn: React.FC<MotionWrapperProps> = ({ children, className, delay = 0, layout }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    className={className}
    layout={layout}
  >
    {children}
  </motion.div>
);

export const SlideIn: React.FC<MotionWrapperProps & { direction?: 'left' | 'right' | 'up' | 'down' }> = ({ 
  children, 
  className, 
  delay = 0, 
  direction = 'up' 
}) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      x: direction === 'left' ? -20 : direction === 'right' ? 20 : 0,
      y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0 
    },
    visible: { opacity: 1, x: 0, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
