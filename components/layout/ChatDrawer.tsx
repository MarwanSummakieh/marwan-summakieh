"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChatBubbleLeftRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Chatbot from "@/components/Chatbot";

const ChatDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setHasOpened(true);
      }
      return next;
    });
  }, []);

  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <div className="pointer-events-none">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-launcher"
            type="button"
            onClick={handleToggle}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto fixed bottom-4 right-4 z-40 flex items-center gap-2 btn-tag px-4 py-2.5 text-xs sm:bottom-6 sm:right-6 sm:px-5 sm:py-3 sm:text-sm"
            aria-expanded={isOpen}
            aria-controls="chat-drawer"
          >
            <ChatBubbleLeftRightIcon className="h-5 w-5" aria-hidden />
            Ask me anything
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-drawer"
            key="chat-drawer"
            className="pointer-events-auto fixed inset-0 z-40 flex justify-end bg-black/75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.aside
              className="relative flex h-full w-full max-w-xl flex-col overflow-hidden border-l-2 border-halo bg-wall shadow-[-4px_0_0_#000] shadow-2xl shadow-black"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b-2 border-halo bg-concrete px-5 py-4 text-chalk">
                <div>
                  <p className="font-display text-2xl tracking-wide text-tag">Ask me anything</p>
                  <p className="font-marker text-xs text-chalk/60">ask about projects, stack, or availability</p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="border-2 border-halo p-2 text-chalk shadow-[2px_2px_0_#000] transition hover:bg-pink hover:text-halo"
                  aria-label="Close chat"
                >
                  <XMarkIcon className="h-5 w-5" aria-hidden />
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <Chatbot onClose={handleClose} />
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatDrawer;
