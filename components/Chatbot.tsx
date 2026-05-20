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
    className="inline-flex items-center gap-2 border border-[#00f0ff] bg-black px-4 py-2"
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
  >
    {Array.from({ length: 3 }).map((_, index) => (
      <motion.span
        key={index}
        className="h-2 w-2 bg-[#fcee0a]"
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
      text: "NETRUNNER LINK ACTIVE. Ask about Marwan's software sector, game dev sector, repo contracts, or contact signal."
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
  <div className="relative flex h-full flex-col overflow-hidden bg-[#050505] text-white shadow-lg shadow-black">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 border border-[#ff003c] bg-black p-2 text-[#ff5a7d] transition hover:bg-[#ff003c] hover:text-white"
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
                      message.role === "model" ? "text-[#fcee0a]" : "text-[#00f0ff]"
                    )}
                  >
                    {message.role === "model" ? "NetRunner" : "You"}
                  </p>
                  <div
                    className={cn(
                      "overflow-hidden border-2 px-4 py-3 text-sm leading-relaxed shadow-lg",
                      message.role === "model"
                        ? "border-[#fcee0a]/60 bg-[#101010] text-white shadow-[6px_6px_0_rgba(252,238,10,.15)]"
                        : "border-[#00f0ff]/70 bg-[#001b20] text-white shadow-[6px_6px_0_rgba(0,240,255,.15)]"
                    )}
                  >
                    {/* --- Render contact card or normal message --- */}
                    {message.role === "model" && contactInfo ? (
                      <div className="space-y-3">
                        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#fcee0a]">
                          Contact information
                        </p>
                        {contactInfo.linkedIn && (
                          <div className="flex items-center gap-3">
                            <FaLinkedin className="h-5 w-5 text-[#00f0ff]" />
                            <a
                              href={contactInfo.linkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-[#00f0ff] underline-offset-4 transition hover:text-[#fcee0a] hover:underline"
                            >
                              LinkedIn profile
                            </a>
                          </div>
                        )}
                        {contactInfo.email && (
                          <div className="flex items-center gap-3">
                            <EnvelopeIcon className="h-5 w-5 text-[#00f0ff]" />
                            <a
                              href={`mailto:${contactInfo.email}`}
                              className="text-sm text-[#00f0ff] underline-offset-4 transition hover:text-[#fcee0a] hover:underline"
                            >
                              {contactInfo.email}
                            </a>
                          </div>
                        )}
                        {contactInfo.gitHub && (
                          <div className="flex items-center gap-3">
                            <FaGithub className="h-5 w-5 text-[#00f0ff]" />
                            <a
                              href={contactInfo.gitHub}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-[#00f0ff] underline-offset-4 transition hover:text-[#fcee0a] hover:underline"
                            >
                              GitHub profile
                            </a>
                          </div>
                        )}
                        {contactInfo.phone && (
                          <div className="flex items-center gap-3">
                            <PhoneIcon className="h-5 w-5 text-[#00f0ff]" />
                            <a
                              href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
                              className="text-sm text-[#00f0ff] underline-offset-4 transition hover:text-[#fcee0a] hover:underline"
                            >
                              {contactInfo.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-left text-sm text-white md:text-base">
                        <ReactMarkdown
                          components={{
                            a: ({ ...props }) => (
                              <a
                                {...props}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#00f0ff] underline underline-offset-4 transition hover:text-[#fcee0a]"
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
                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#fcee0a]">
                  NetRunner
                </p>
                <div className="border border-[#fcee0a]/60 bg-[#101010] px-4 py-3">
                  <LoadingIndicator />
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative border-t-2 border-[#fcee0a] bg-[#101010] px-4 py-3 md:px-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-t from-[#101010] to-transparent" />
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
