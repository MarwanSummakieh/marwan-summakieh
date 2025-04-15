"use client";

import { useState, useCallback } from "react";
import Chatbot from "@/components/Chatbot";
import { GoogleGeminiEffect } from "@/components/ui/GLowingLines";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";

// Import View Components
import IntroView from "@/components/views/IntroView";
import OptionsView from "@/components/views/OptionsView";
import CreativeSpaceView from "@/components/views/CreativeSpaceView";
import AboutMeProfile from "@/components/AboutMeProfile";
import ProjectsView from "@/components/ProjectsView";

// Define view states as a type for better clarity
type ViewState = 'intro' | 'options' | 'profile' | 'creative' | 'projects';

const Home = () => {
  const [currentView, setCurrentView] = useState<ViewState>('intro');
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
  const [chatHasBeenOpened, setChatHasBeenOpened] = useState(false);

  // --- Event Handlers ---
  // Use useCallback for handlers passed to memoized components
  const handleBeginClick = useCallback(() => setCurrentView('options'), []);
  const handleAboutMeClick = useCallback(() => setCurrentView('profile'), []);
  const handleBackToOptions = useCallback(() => setCurrentView('options'), []);
  const handleCreativeSpaceClick = useCallback(() => setCurrentView('creative'), []);
  const handleProjectsClick = useCallback(() => setCurrentView('projects'), []);
  
  const handleAskAboutMeClick = useCallback(() => {
    setIsChatDrawerOpen(true);
    setChatHasBeenOpened(true);
  }, []);
  
  const handleCloseChatClick = useCallback(() => setIsChatDrawerOpen(false), []);
  const handleToggleChatClick = useCallback(() => setIsChatDrawerOpen(prev => !prev), []);
  // --- End Event Handlers ---

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#0b0f19] via-[#121433] to-[#0b0f19] p-4 relative overflow-hidden flex flex-col justify-center items-center`}>

      {/* Background Effect */}
      <AnimatePresence>
        {currentView === 'intro' && (
          <motion.div
            key="background-effect"
            className="absolute inset-0 w-full h-full z-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} 
            transition={{ duration: 1.0 }}
          >
            <GoogleGeminiEffect className="w-full h-full opacity-70" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content Area - Renders different views */}
      {/* Wrap views in a container for consistent centering/positioning */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center">
         <AnimatePresence mode="wait">
            {currentView === 'intro' && (
              <IntroView onBeginClick={handleBeginClick} />
            )}
            {currentView === 'options' && (
              <OptionsView 
                onAboutMeClick={handleAboutMeClick} 
                onProjectsClick={handleProjectsClick}
                onCreativeSpaceClick={handleCreativeSpaceClick}
              />
            )}
            {currentView === 'profile' && (
                <AboutMeProfile onBack={handleBackToOptions} />
            )}
            {currentView === 'projects' && (
                <ProjectsView onBack={handleBackToOptions} />
            )}
            {currentView === 'creative' && (
              <CreativeSpaceView onBack={handleBackToOptions} />
            )}
          </AnimatePresence>
      </div>

      {/* --- Chat UI Elements --- */}
      {/* Initial Ask About Me Button */}
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
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(192, 132, 252, 0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg shadow-purple-500/40 hover:shadow-purple-400/60 transition-all duration-300 pointer-events-auto"
                    >
                        <ChatBubbleLeftRightIcon className="h-5 w-5" />
                        <span>Ask About Me</span>
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>

      {/* Chat Drawer */}
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

      {/* Persistent Arrow Toggle Button */}
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
