import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const SectionHeader = ({ title, subtitle, highlight, center = true }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className={`${center ? 'text-center' : ''} mb-16`}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        {title} {highlight && <span className="text-primary-600">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;