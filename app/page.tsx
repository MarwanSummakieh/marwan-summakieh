"use client";

import { useState } from "react";
import Chatbot from "@/components/Chatbot";
import { GoogleGeminiEffect } from "@/components/ui/GLowingLines";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, ChevronUpIcon, UserCircleIcon, SparklesIcon as SparklesOutlineIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import React from 'react';
import AboutMeProfile from "@/components/AboutMeProfile";

// Define view states as a type for better clarity
type ViewState = 'intro' | 'options' | 'profile' | 'creative';

const Home: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('intro');
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
  const [chatHasBeenOpened, setChatHasBeenOpened] = useState(false);

  // Handler to switch view to Options
  const handleBeginClick = () => {
    setCurrentView('options');
  };

  // Handler to switch view to Profile
  const handleAboutMeClick = () => {
    setCurrentView('profile');
  };

  // Handler to navigate back to options from profile
  const handleBackToOptions = () => {
    setCurrentView('options');
  };

  // Handler to open chat and mark it as opened
  const handleAskAboutMeClick = () => {
    setIsChatDrawerOpen(true);
    setChatHasBeenOpened(true);
  };

  // Handler to close chat drawer
  const handleCloseChatClick = () => {
    setIsChatDrawerOpen(false);
  };

  // Handler for the persistent chat toggle arrow
  const handleToggleChatClick = () => {
    setIsChatDrawerOpen(prev => !prev);
  };

  // Handler to switch view to Creative Space (Coming Soon)
  const handleCreativeSpaceClick = () => {
    setCurrentView('creative');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#0b0f19] via-[#121433] to-[#0b0f19] p-4 relative overflow-hidden flex flex-col justify-center items-center`}>

      <AnimatePresence>
        {/* Keep background effect only in intro, options, and creative */}
        {(currentView === 'intro' || currentView === 'options' || currentView === 'creative') && (
          <motion.div
            key="background-effect"
            className="absolute inset-0 w-full h-full z-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GoogleGeminiEffect className="w-full h-full opacity-70" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentView === 'intro' && (
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
              onClick={handleBeginClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              Let&apos;s Begin
            </motion.button>
          </motion.div>
        )}

        {/* Render Options view only when currentView is 'options' */}
        {currentView === 'options' && (
          <motion.div
            key="options"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="z-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-8 w-full px-4"
          >
            <motion.button
              onClick={handleAboutMeClick}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white w-full max-w-xs md:w-44 md:h-36 text-center transition-all duration-300"
            >
              <UserCircleIcon className="h-8 md:h-10 w-8 md:w-10 mb-2" />
              <span className="font-semibold text-sm md:text-base">About Me</span>
            </motion.button>
            <motion.button
              onClick={handleCreativeSpaceClick}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white w-full max-w-xs md:w-44 md:h-36 text-center transition-all duration-300"
            >
              <SparklesOutlineIcon className="h-8 md:h-10 w-8 md:w-10 mb-2" />
              <span className="font-semibold text-sm md:text-base">Creative Space</span>
            </motion.button>
          </motion.div>
        )}

        {/* Render Profile view */}
        {currentView === 'profile' && (
            <AboutMeProfile onBack={handleBackToOptions} />
        )}

        {/* Render Creative Space Coming Soon view */}
        {currentView === 'creative' && (
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
              onClick={handleBackToOptions}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors duration-300"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

        {/* Initial Ask About Me Button - Positioned at Bottom */}
        <AnimatePresence>
            {!chatHasBeenOpened && currentView === 'options' && (
                <motion.div
                    key="ask-me-wrapper"
                    className="fixed bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.button
                        key="ask-me-btn-bottom"
                        onClick={handleAskAboutMeClick}
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(192, 132, 252, 0.6)" }} // Purple glow on hover
                        whileTap={{ scale: 0.95 }}
                        // Restyled: smaller, rounded, gradient bg, purple shadow/glow
                        className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg shadow-purple-500/40 hover:shadow-purple-400/60 transition-all duration-300 pointer-events-auto"
                    >
                        <ChatBubbleLeftRightIcon className="h-5 w-5" />
                        <span>Ask About Me</span>
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>

      {/* Chat Drawer - Conditionally rendered but kept mounted after first open */}
      {chatHasBeenOpened && (
        <motion.div
          key="chat-drawer"
          className="fixed inset-0 z-30 flex justify-center items-end p-0 pointer-events-none"
          initial={{ y: "100%" }}
          animate={{ y: isChatDrawerOpen ? "0%" : "100%" }}
          transition={{ type: "spring", stiffness: 150, damping: 25 }}
        >
          <div className="relative w-full max-w-4xl h-[80vh] md:h-[85vh] bg-[#121433]/95 backdrop-blur-xl rounded-t-2xl shadow-2xl border-t border-blue-900/50 flex flex-col overflow-hidden pointer-events-auto">
            <button
              onClick={handleCloseChatClick}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full z-40"
              aria-label="Close chat"
            >
              <ChevronDownIcon className="h-6 w-6" />
            </button>
            <div className="flex-1 h-full overflow-hidden pt-12">
              <Chatbot />
            </div>
          </div>
        </motion.div>
      )}

      {/* Persistent Arrow Toggle Button - Rendered when chat opened & drawer closed */}
      <AnimatePresence>
         {chatHasBeenOpened && !isChatDrawerOpen && (
            <motion.div
                   key="chat-arrow-toggle-wrapper"
                   className="fixed bottom-4 inset-x-0 z-40 flex justify-center pointer-events-none"
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: 30 }}
               >
                   <motion.button
                       key="chat-arrow-toggle"
                       className="p-3 rounded-full bg-gradient-to-br from-blue-900/80 via-purple-900/50 to-gray-900/80 backdrop-blur-sm border border-blue-500/50 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-400/50 hover:border-blue-400 transition-all duration-300 pointer-events-auto hover:-translate-y-1"
                       onClick={handleToggleChatClick}
                       whileHover={{ scale: 1.1 }}
                       whileTap={{ scale: 0.9 }}
                       aria-label="Open chat"
                   >
                      <ChevronUpIcon className="h-6 w-6" />
                   </motion.button>
              </motion.div>
           )}
      </AnimatePresence>

    </div>
  );
}

export default Home;
