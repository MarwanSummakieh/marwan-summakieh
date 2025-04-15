"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    SparklesIcon as SparklesOutlineIcon, 
    ArrowLeftIcon 
} from "@heroicons/react/24/outline";

interface CreativeSpaceViewProps {
  onBack: () => void;
}

const CreativeSpaceView: React.FC<CreativeSpaceViewProps> = ({ onBack }) => {
  return (
    <motion.div
      key="creative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="z-10 flex flex-col items-center justify-center gap-4 md:gap-8 mt-8 w-full px-4 text-center text-white"
    >
      <SparklesOutlineIcon className="h-16 w-16 mb-4 text-purple-400" />
      <h2 className="text-3xl font-bold mb-2">Creative Space</h2>
      <p className="text-xl text-neutral-300 mb-6">Coming Soon!</p>
      <motion.button
        onClick={onBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors duration-300"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        Back
      </motion.button>
    </motion.div>
  );
};

export default React.memo(CreativeSpaceView); 