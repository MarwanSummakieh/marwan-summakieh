"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import CopilotInput from "./ui/CopilotInput";
import { motion } from "framer-motion";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Message {
  id: number;
  role: "user" | "model";
  text: string;
}

interface HistoryEntry {
  role: "user" | "model";
  parts: { text: string }[];
}

const LoadingIndicator: React.FC = () => (
  <motion.div
    className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2 dark:border-emerald-400/40 dark:bg-white/10"
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
  >
    {Array.from({ length: 3 }).map((_, index) => (
      <motion.span
        key={index}
        className="h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-300"
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.85, 1.05, 0.85] }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "easeInOut",
          delay: index * 0.2,
        }}
      />
    ))}
  </motion.div>
);

// Helper function to parse contact info block
const parseContactInfo = (text: string) => {
  const startMarker = 'CONTACT_INFO_START';
  const endMarker = 'CONTACT_INFO_END';
  const startIndex = text.indexOf(startMarker);
  const endIndex = text.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    return null; // Markers not found or in wrong order
  }

  const content = text.substring(startIndex + startMarker.length, endIndex).trim();
  const lines = content.split('\n');
  const contactLinks = { linkedIn: '', email: '', gitHub: '', phone: '' };

  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('LinkedIn:')) {
      contactLinks.linkedIn = trimmedLine.substring('LinkedIn:'.length).trim();
    } else if (trimmedLine.startsWith('Email:')) {
      contactLinks.email = trimmedLine.substring('Email:'.length).trim();
    } else if (trimmedLine.startsWith('GitHub:')) {
      contactLinks.gitHub = trimmedLine.substring('GitHub:'.length).trim();
    } else if (trimmedLine.startsWith('Phone:')) {
      contactLinks.phone = trimmedLine.substring('Phone:'.length).trim();
    }
  });

  // Only return if at least one link was found
  if (contactLinks.linkedIn || contactLinks.email || contactLinks.gitHub || contactLinks.phone) {
    return contactLinks;
  }
  return null;
};

interface ChatbotProps {
  onClose?: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const initialMessages: Message[] = [
    {
      id: Date.now(),
      role: "model",
      text: "This assistant provides details about Marwan Summakieh's experience, projects, and skills. Ask for summaries, specific responsibilities, or contact information."
    }
  ];
  const STORAGE_KEY = "marwan-chat-session";
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const hasRestoredRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.sessionStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed: Message[] = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setMessages(parsed);
      }
    } catch (error) {
      console.error("Failed to restore chat history:", error);
    } finally {
      hasRestoredRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!hasRestoredRef.current) return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to persist chat history:", error);
    }
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
  }, []);

  const handleFormSubmit = useCallback(async (passedValue: string) => {
    const trimmedValue = passedValue.trim();
    if (trimmedValue === "" || isLoading) return;

    setIsLoading(true);
    const newUserMessage: Message = {
      id: Date.now() + 1,
      text: trimmedValue,
      role: "user",
    };
    
    const messagesForHistory = messages.length > 0 && messages[0].role === 'model' 
        ? messages.slice(1) 
        : messages;

  const history: HistoryEntry[] = messagesForHistory.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
    }));

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");

    try {
      console.log("Sending History:", JSON.stringify(history, null, 2));
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmedValue, history: history }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API error: ${response.statusText} - ${errorData?.error || 'Unknown error'}`);
      }

      const data = await response.json();
      const botReply = data.reply || "Sorry, I couldn't get a response.";
      
      console.log("Raw bot reply:", botReply);

      const newBotMessage: Message = {
        id: Date.now() + 3,
        text: botReply,
        role: "model",
      };

      setMessages((prev) => [...prev, newBotMessage]);

    } catch (error) {
      console.error("Failed to fetch chat response:", error);
      const errorMessage: Message = {
          id: Date.now() + 4,
          text: `Sorry, an error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`,
          role: "model"
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }

  }, [isLoading, messages]);

  const submit = useCallback(() => {
      handleFormSubmit(input);
  }, [input, handleFormSubmit]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        submit();
    }
  }, [submit]);

  return (
  <div className="relative flex h-full flex-col overflow-hidden bg-white/90 shadow-lg shadow-emerald-900/10 backdrop-blur-xl dark:bg-[#090c0f]/90 dark:shadow-emerald-900/30">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full border border-slate-200 bg-white/40 p-2 text-slate-500 transition hover:border-slate-400 hover:bg-slate-100 dark:border-white/20 dark:bg-black/40 dark:text-white dark:hover:border-white/50 dark:hover:bg-white/10"
          aria-label="Close chat"
        >
          <XMarkIcon className="h-5 w-5" aria-hidden />
        </button>
      )}
      <div
        key="messages"
        className={cn(
          "flex-1 space-y-4 overflow-y-auto px-4 md:space-y-6 md:px-6",
          onClose ? "pt-12" : ""
        )}
      >
        {messages.map((message) => {
          // --- Check if it's a contact info message --- > MODIFIED SECTION START
          let contactInfo = null;
          if (message.role === 'model') {
            contactInfo = parseContactInfo(message.text);
          }
          // --- END CHECK --- 

          return (
            <motion.div 
              key={message.id} 
              className="message-item w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div
                className={cn(
                  "flex w-full",
                  message.role === "model" ? "justify-start" : "justify-end"
                )}
              >
                <div className="max-w-full space-y-1 text-left">
                  <p
                    className={cn(
                      "text-[11px] font-medium uppercase tracking-[0.25em]",
                      message.role === "model" ? "text-emerald-700 dark:text-emerald-200/80" : "text-emerald-600 dark:text-emerald-300/70"
                    )}
                  >
                    {message.role === "model" ? "AI Assistant" : "You"}
                  </p>
                  <div
                    className={cn(
                      "overflow-hidden border px-4 py-3 text-sm leading-relaxed shadow-lg",
                      message.role === "model"
                        ? "border-slate-200 bg-slate-50 text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-100"
                        : "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-500/30 dark:bg-gradient-to-r dark:from-emerald-500/60 dark:to-emerald-500/60 dark:text-white"
                    )}
                  >
                    {/* --- Render contact card or normal message --- */}
                    {message.role === "model" && contactInfo ? (
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-200">
                          Contact information
                        </p>
                        {contactInfo.linkedIn && (
                          <div className="flex items-center gap-3">
                            <FaLinkedin className="h-5 w-5 text-emerald-700 dark:text-emerald-200" />
                            <a
                              href={contactInfo.linkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-emerald-700 underline-offset-4 transition hover:text-emerald-900 hover:underline dark:text-emerald-200 dark:hover:text-white"
                            >
                              LinkedIn profile
                            </a>
                          </div>
                        )}
                        {contactInfo.email && (
                          <div className="flex items-center gap-3">
                            <EnvelopeIcon className="h-5 w-5 text-emerald-700 dark:text-emerald-200" />
                            <a
                              href={`mailto:${contactInfo.email}`}
                              className="text-sm text-emerald-700 underline-offset-4 transition hover:text-emerald-900 hover:underline dark:text-emerald-200 dark:hover:text-white"
                            >
                              {contactInfo.email}
                            </a>
                          </div>
                        )}
                        {contactInfo.gitHub && (
                          <div className="flex items-center gap-3">
                            <FaGithub className="h-5 w-5 text-emerald-700 dark:text-emerald-200" />
                            <a
                              href={contactInfo.gitHub}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-emerald-700 underline-offset-4 transition hover:text-emerald-900 hover:underline dark:text-emerald-200 dark:hover:text-white"
                            >
                              GitHub profile
                            </a>
                          </div>
                        )}
                        {contactInfo.phone && (
                          <div className="flex items-center gap-3">
                            <PhoneIcon className="h-5 w-5 text-emerald-700 dark:text-emerald-200" />
                            <a
                              href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
                              className="text-sm text-emerald-700 underline-offset-4 transition hover:text-emerald-900 hover:underline dark:text-emerald-200 dark:hover:text-white"
                            >
                              {contactInfo.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-left text-slate-700 md:text-base dark:text-slate-100">
                        <ReactMarkdown
                          components={{
                            a: ({ ...props }) => (
                              <a
                                {...props}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-700 underline underline-offset-4 transition hover:text-emerald-900 dark:text-emerald-200 dark:hover:text-white"
                              />
                            ),
                          }}
                        >
                          {message.text}
                        </ReactMarkdown>
                      </div>
                    )}
                    {/* --- End Render --- */}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
        {isLoading && (
          <motion.div
            className="message-item w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex w-full justify-start">
              <div className="space-y-1">
                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-700 dark:text-emerald-200/80">
                  AI Assistant
                </p>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/10">
                  <LoadingIndicator />
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative border-t border-slate-200 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-[#070a0c]/80 md:px-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-t from-white to-transparent dark:from-[#070a0c]" />
        <div className="relative z-10 w-full">
          <CopilotInput
            value={input}
            onChange={handleInputChange}
            onSubmit={submit}
            onKeyPress={handleKeyPress}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Chatbot); 