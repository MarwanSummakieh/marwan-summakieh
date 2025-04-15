"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface IntroViewProps {
  onBeginClick: () => void;
}

const IntroView: React.FC<IntroViewProps> = ({ onBeginClick }) => {
  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="z-10 flex flex-col items-center text-center"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 py-4 mb-8">
        Welcome to Marwan&apos;s Digital Space
      </h1>
      <motion.button
        onClick={onBeginClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        Let&apos;s Begin
      </motion.button>
    </motion.div>
  );
};

export default React.memo(IntroView); 