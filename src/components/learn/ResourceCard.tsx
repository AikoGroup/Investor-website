'use client';

import React from 'react';
import { motion } from 'framer-motion';


interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  onClick?: () => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, icon, href, onClick }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
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
          cursor-pointer
        "
      >
        <div className="flex items-center mb-4">
          <div className="text-2xl mr-3">{icon}</div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-blue-100">{description}</p>
      </motion.div>
    </a>
  );
};

export default ResourceCard;
