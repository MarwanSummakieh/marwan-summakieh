"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { PlaceholdersAndVanishInput } from './ui/PlaceholdersAndVanishInput';
import { Spotlight } from './ui/Spotlight';
import Image from 'next/image';

interface Message {
  text: string;
  type: 'sent' | 'received';
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [threadId, setThreadId] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('/imojies/hey.png');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [currentTypingMessage, setCurrentTypingMessage] = useState<string>('');
  const [chatStarted, setChatStarted] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Use a ref to manage the typing message state
  const typingMessageRef = useRef<string>('');

  const placeholders = [
    "What's your experience in software engineering?",
    "What technologies do you specialize in?",
    "How can I contact you?",
  ];

  useEffect(() => {
    const createNewThread = async () => {
      try {
        const response = await fetch('/api/chat/new'); // Adjusted endpoint
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to create new thread');
        }
        const data = await response.json();
        setThreadId(data.threadId);
      } catch (error) {
        console.error("Error creating new thread:", error);
        setImageSrc('/imojies/oops.png');
      }
    };
    createNewThread();
  }, []);

  const handleSend = async (message: string) => {
    if (message.trim() && threadId && !isTyping) {
      setMessages((prevMessages) => [...prevMessages, { text: message, type: 'sent' }]);
      setImageSrc('/imojies/hmmm.png');
      setChatStarted(true);
      setIsTyping(true);
      await sendMessageToOpenAI(message);
    }
  };

  const sendMessageToOpenAI = async (message: string) => {
    if (!threadId) return;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, threadId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      const data = await response.json();

      // Assuming the API returns a 'reply' field with the assistant's response
      if (data.reply) {
        startTypingEffect(data.reply);
      } else {
        console.error("Unexpected API response:", data);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Sorry, I couldn't process your request.", type: 'received' },
        ]);
        setImageSrc('/imojies/oops.png');
        setIsTyping(false);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, I couldn't process your request.", type: 'received' },
      ]);
      setImageSrc('/imojies/oops.png');
      setIsTyping(false);
    }
  };

  const startTypingEffect = (text: string) => {
    typingMessageRef.current = '';
    typeMessage(text, 0);
  };

  const typeMessage = (text: string, index: number) => {
    if (index < text.length) {
      typingMessageRef.current += text[index];
      setCurrentTypingMessage(typingMessageRef.current);
      setTimeout(() => typeMessage(text, index + 1), 50);
    } else {
      setMessages((prevMessages) => [...prevMessages, { text, type: 'received' }]);
      typingMessageRef.current = '';
      setCurrentTypingMessage('');
      setImageSrc('/imojies/smiling.png');
      setIsTyping(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSend(inputValue);
    setInputValue('');
  };

  const handleOptionClick = (option: string) => {
    handleSend(option);
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages, currentTypingMessage]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      {/* Spotlights for background decoration */}
      <div>
        <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
        <Spotlight className="-top-10 -left-full h-[80vh] w-[50vw]" fill="purple" />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/* Main chat container */}
      <div className="relative flex justify-center items-center h-screen pt-10">
        <div className="flex flex-col md:flex-row w-full max-w-6xl items-center justify-between space-x-0 md:space-x-4 p-4">
          {/* Image section */}
          <div className="hidden md:flex flex-1 mb-10 md:mb-0 items-end justify-center">
            <div className="relative w-80 h-80">
              <Image
                src={imageSrc}
                alt="Chat Illustration"
                style={{ objectFit: 'cover' }}
                fill
                className="rounded-2xl"
              />
            </div>
          </div>

          {/* Chat interface */}
          <div className="flex-1 flex flex-col justify-between shadow-lg p-4 h-auto bg-white dark:bg-gray-900 rounded-2xl">
            {/* Chat messages container */}
            <div
              id="chat-container"
              ref={chatContainerRef}
              className="relative flex-grow overflow-y-auto p-4 w-full h-full scrollbar-hide"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex mb-2 ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-2xl ${
                      msg.type === 'sent' ? 'bg-blue-500 text-white' : 'bg-cyan-800 text-white'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {currentTypingMessage && (
                <div className="flex mb-2 justify-start">
                  <div className="max-w-xs p-3 rounded-2xl bg-cyan-800 text-white">
                    {currentTypingMessage}
                  </div>
                </div>
              )}
            </div>

            {/* Placeholder options */}
            {!chatStarted && (
              <div className="flex flex-wrap justify-center mb-4">
                {placeholders.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className="w-full md:w-1/3 m-2 p-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-left"
                    disabled={isTyping}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* Input field */}
            <div className="mb-4">
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={handleSubmit}
                isDisabled={isTyping}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </ThemeProvider>
  );
};

export default Chat;
