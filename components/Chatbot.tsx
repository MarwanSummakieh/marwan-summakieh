"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import CopilotInput from "./ui/CopilotInput";
import { Content } from "@google/generative-ai";
import { motion } from "framer-motion";

interface Message {
  id: number;
  role: "user" | "model";
  text: string;
}

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

  const submit = useCallback(() => {
      handleFormSubmit(input);
  }, [input]);

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
        {messages.map((message) => (
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
                <p className="text-sm md:text-base text-left text-neutral-100 whitespace-pre-wrap">
                  {message.text}
                </p>
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
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="sticky bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#121433] to-transparent pointer-events-none z-10">
        {/* This div creates the fade effect */}
      </div>

      <div
        className={`w-full max-w-4xl mx-auto px-3 pb-3 md:px-6 md:pb-6 pt-2 z-20`}
      >
        <CopilotInput 
          value={input} 
          onChange={handleInputChange} 
          onSubmit={submit}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default React.memo(Chatbot); 