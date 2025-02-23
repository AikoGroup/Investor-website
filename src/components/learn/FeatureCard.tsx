'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="
        backdrop-blur-sm
        bg-white/5
        rounded-xl
        p-6
        border
        border-white/10
        hover:border-white/20
        transition-all
        duration-300
        hover:shadow-lg
      "
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-blue-100">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
