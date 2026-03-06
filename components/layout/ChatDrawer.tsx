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
            className="pointer-events-auto fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:-translate-y-1 hover:shadow-emerald-400/40"
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
            className="pointer-events-auto fixed inset-0 z-40 flex justify-end bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.aside
              className="relative flex h-full w-full max-w-xl flex-col overflow-hidden border-l border-slate-200 bg-white shadow-2xl dark:border-white/20 dark:bg-[hsl(210,10%,6%)]"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between bg-slate-50 px-5 py-4 text-slate-900 dark:bg-black/30 dark:text-white">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-200/80">AI portfolio assistant</p>
                  <p className="text-xs text-slate-500 dark:text-slate-200">Ask about experience, repositories, or availability.</p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-slate-400 hover:bg-slate-100 dark:border-white/20 dark:text-white dark:hover:border-white/50 dark:hover:bg-white/10"
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
