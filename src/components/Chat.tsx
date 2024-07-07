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

  const placeholders = [
    "What's your experience in software engineering?",
    "Can you tell me more about your learn?",
    "What technologies do you specialize in?",
    "How can I contact you?",
  ];

  useEffect(() => {
    const createNewThread = async () => {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: '', threadId: null }),
        });

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
    if (message.trim() && threadId) {
      setMessages((prevMessages) => [...prevMessages, { text: message, type: 'sent' }]);
      setImageSrc('/imojies/hmmm.png');
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
      startTypingEffect(data.messages);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [...prevMessages, { text: "Sorry, I couldn't process your request.", type: 'received' }]);
      setImageSrc('/imojies/oops.png');
    }
  };

  const startTypingEffect = (newMessages: Message[]) => {
    const receivedMessages = newMessages.filter(msg => msg.type === 'received');
    if (receivedMessages.length > 0) {
      const fullText = receivedMessages.map(msg => msg.text).join(' ');
      typeMessage(fullText, 0);
    }
  };

  const typeMessage = (text: string, index: number) => {
    if (index < text.length) {
      setCurrentTypingMessage((prev) => prev + text[index]);
      setTimeout(() => typeMessage(text, index + 1), 50); // Adjust the speed as needed
    } else {
      setMessages((prevMessages) => [...prevMessages, { text, type: 'received' }]);
      setCurrentTypingMessage('');
      setImageSrc('/imojies/smiling.png');
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
      <div>
        <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
        <Spotlight className="-top-10 -left-full h-[80vh] w-[50vw]" fill="purple" />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>
      <div className="relative flex mb-32 mt-16 justify-center items-center h-[90vh]">
        <div className="flex flex-col md:flex-row w-full max-w-6xl h-full items-center justify-between space-x-0 md:space-x-4 p-4">
          <div className="flex-1 mb-10 md:mb-0 flex items-end justify-center">
            <Image
              src={imageSrc}
              alt="Chat Illustration"
              objectFit="cover"
              width={500}
              height={500}
              className="rounded-2xl"
            />
          </div>
          <div className="flex-1 h-full flex flex-col justify-between shadow-lg p-4">
            <div
              id="chat-container"
              ref={chatContainerRef}
              className="relative flex-grow overflow-y-auto p-4 rounded-2xl mb-4 w-full h-full scrollbar-hide"
            >
              <div
                id="top-fade"
                className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-100 dark:from-gray-800 to-transparent pointer-events-none z-10 opacity-0 transition-opacity duration-300"
              ></div>
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
              <div
                id="bottom-fade"
                className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-100 dark:from-gray-800 to-transparent pointer-events-none z-10 opacity-0 transition-opacity duration-300"
              ></div>
            </div>
            <div className="w-[50vw]">
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </ThemeProvider>
  );
};

export default Chat;
