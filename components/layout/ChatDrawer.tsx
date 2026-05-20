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
            className="pointer-events-auto fixed bottom-4 right-4 z-40 flex items-center gap-2 border-2 border-black bg-[#fcee0a] px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-black shadow-[8px_8px_0_#ff003c] transition hover:-translate-y-0.5 hover:bg-[#00f0ff] sm:bottom-6 sm:right-6 sm:px-5 sm:py-3 sm:text-sm"
            aria-expanded={isOpen}
            aria-controls="chat-drawer"
          >
            <ChatBubbleLeftRightIcon className="h-5 w-5" aria-hidden />
            {hasOpened ? "Open assistant" : "Launch assistant"}
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
              className="relative flex h-full w-full max-w-xl flex-col overflow-hidden border-l-4 border-[#fcee0a] bg-[#050505] shadow-2xl shadow-black"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b-2 border-[#fcee0a] bg-[#111] px-5 py-4 text-white">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.3em] text-[#fcee0a]">NetRunner assistant</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00f0ff]">Ask about sectors, repos, or availability.</p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="border border-[#ff003c] p-2 text-[#ff5a7d] transition hover:bg-[#ff003c] hover:text-white"
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
