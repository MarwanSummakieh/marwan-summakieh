"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    UserCircleIcon, 
    SparklesIcon as SparklesOutlineIcon, 
    CodeBracketIcon 
} from "@heroicons/react/24/outline";

interface OptionsViewProps {
  onAboutMeClick: () => void;
  onProjectsClick: () => void;
  onCreativeSpaceClick: () => void;
}

const OptionsView: React.FC<OptionsViewProps> = ({
  onAboutMeClick,
  onProjectsClick,
  onCreativeSpaceClick,
}) => {
  return (
    <motion.div
      key="options"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="z-10 flex flex-col items-center justify-center gap-6 md:gap-10 mt-8 w-full px-4"
    >
      <h2 className="text-3xl font-semibold text-neutral-200 mb-4">Explore Marwan&apos;s Space</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 items-stretch justify-center gap-4 md:gap-6 w-full max-w-4xl">
        
        {/* About Me Button Card */}
        <motion.button
          onClick={onAboutMeClick}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,255,255,0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center justify-start p-4 md:p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white w-full text-center transition-all duration-300 flex-1 h-auto min-h-[180px]"
        >
          <UserCircleIcon className="h-8 md:h-10 w-8 md:w-10 mb-3 text-blue-300" />
          <span className="font-semibold text-sm md:text-lg mb-2">About Me</span>
          <p className="text-xs md:text-sm text-neutral-300 px-2">View my background, skills, and experience.</p>
        </motion.button>

        {/* Professional Projects Button Card */}
        <motion.button
          onClick={onProjectsClick}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,255,255,0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center justify-start p-4 md:p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white w-full text-center transition-all duration-300 flex-1 h-auto min-h-[180px]"
        >
          <CodeBracketIcon className="h-8 md:h-10 w-8 md:w-10 mb-3 text-green-300" />
          <span className="font-semibold text-sm md:text-lg mb-2">Projects</span>
          <p className="text-xs md:text-sm text-neutral-300 px-2">Check out some of my projects.</p>
        </motion.button>
        
        {/* Creative Space Button Card */}
        <motion.button
          onClick={onCreativeSpaceClick}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,255,255,0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center justify-start p-4 md:p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white w-full text-center transition-all duration-300 flex-1 h-auto min-h-[180px]"
        >
          <SparklesOutlineIcon className="h-8 md:h-10 w-8 md:w-10 mb-3 text-purple-300" />
          <span className="font-semibold text-sm md:text-lg mb-2">Creative Space</span>
          <p className="text-xs md:text-sm text-neutral-300 px-2">Check out personal projects and experiments (coming soon).</p>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default React.memo(OptionsView); 