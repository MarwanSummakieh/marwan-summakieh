"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import CopilotInput from "./ui/CopilotInput";
import { Content } from "@google/generative-ai";
import { motion } from "framer-motion";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';

interface Message {
  id: number;
  role: "user" | "model";
  text: string;
}

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

const Chatbot: React.FC = () => {
  const initialMessages: Message[] = [
    {
      id: Date.now(),
      role: "model",
      text: "Hey! I'm the AI version of Marwan, here to help you get to know him. Got any questions about my projects, skills, or why pizza is the best food? Ask away!"
    }
  ];
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
  }, []);

  const submit = () => {
      handleFormSubmit(input);
  };

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        submit();
    }
  }, [submit]);

  const handleFormSubmit = useCallback(async (passedValue: string) => {
    const trimmedValue = passedValue.trim();
    if (trimmedValue === "" || isLoading) return;

    setIsLoading(true);
    const newUserMessage: Message = {
      id: Date.now() + 1,
      text: trimmedValue,
      role: "user",
    };
    
    // Prepare history, filtering out the initial model greeting if present
    const messagesForHistory = messages.length > 0 && messages[0].role === 'model' 
        ? messages.slice(1) // Exclude the first message if it's the initial greeting
        : messages; // Otherwise, use all messages

    const history: Content[] = messagesForHistory.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
    }));

    // Add user message to local state AFTER preparing history
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

  return (
    <div className={`w-full h-full flex flex-col bg-transparent pt-0 relative`}>
      
      <div
        key="messages"
        className="flex-1 overflow-y-auto px-3 md:px-6 pt-2 md:pt-6 space-y-4 md:space-y-6"
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
              {message.role === 'model' ? (
                <div className="text-left bot-message max-w-full overflow-x-hidden">
                  <p className="text-xs md:text-sm text-purple-300 mb-1 font-medium">AI Assistant</p>
                  {/* --- Render contact card or normal message --- */}
                  {contactInfo ? (
                    <div className="mt-2 p-4 rounded-lg bg-white/10 border border-purple-400/30 space-y-3">
                      <p className="text-sm font-semibold text-purple-200 mb-2">Contact Information:</p>
                      {contactInfo.linkedIn && (
                        <div className="flex items-center gap-3">
                          <FaLinkedin className="h-5 w-5 text-purple-300 flex-shrink-0" />
                          <a href={contactInfo.linkedIn} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:text-blue-300 underline truncate">
                            LinkedIn Profile
                          </a>
                        </div>
                      )}
                      {contactInfo.email && (
                        <div className="flex items-center gap-3">
                          <EnvelopeIcon className="h-5 w-5 text-purple-300 flex-shrink-0" />
                          <a href={`mailto:${contactInfo.email}`} className="text-sm text-blue-400 hover:text-blue-300 underline truncate">
                            {contactInfo.email}
                          </a>
                        </div>
                      )}
                      {contactInfo.gitHub && (
                        <div className="flex items-center gap-3">
                          <FaGithub className="h-5 w-5 text-purple-300 flex-shrink-0" />
                          <a href={contactInfo.gitHub} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:text-blue-300 underline truncate">
                            GitHub Profile
                          </a>
                        </div>
                      )}
                      {contactInfo.phone && (
                        <div className="flex items-center gap-3">
                          <PhoneIcon className="h-5 w-5 text-purple-300 flex-shrink-0" />
                          <a href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} className="text-sm text-blue-400 hover:text-blue-300 underline truncate">
                            {contactInfo.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm md:text-base text-left text-neutral-100 whitespace-pre-wrap">
                      <ReactMarkdown
                        components={{
                          a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline"/>
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>
                  )}
                  {/* --- End Render --- */}
                </div>
              ) : (
                <div className="text-left user-message">
                  <p className="text-xs md:text-sm text-blue-400 mb-1 font-medium">You</p>
                  <p className="text-sm md:text-base text-neutral-100 whitespace-pre-wrap">
                    {message.text}
                  </p>
                </div>
              )}
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="sticky bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#121433] to-transparent pointer-events-none z-10">
        {/* This div creates the fade effect */}
      </div>

      <div className="w-full px-3 pb-3 md:px-6 md:pb-6 pt-2 z-20 flex justify-center">
        <div className="w-full max-w-4xl">
          <CopilotInput 
            value={input} 
            onChange={handleInputChange} 
            onSubmit={submit}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Chatbot); 