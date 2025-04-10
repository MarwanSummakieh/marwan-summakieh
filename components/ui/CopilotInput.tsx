"use client";

import React from "react";
import { SparklesIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

interface CopilotInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

// Sample relevant prompts about Marwan
const samplePrompts = [
    "Tell me about Marwan's experience with React.",
    "What are Marwan's career goals?",
    "What kind of games does Marwan like to develop?",
    "What technologies did Marwan use in the Azure Provisioning Tool project?",
    "What are Marwan's hobbies besides coding?",
    "Ask Marwan about his views on pizza.",
    "What's Marwan's approach to problem-solving?",
    "Where did Marwan study?",
];

const CopilotInput: React.FC<CopilotInputProps> = ({ 
    value, 
    onChange, 
    onSubmit, 
    onKeyPress 
}) => {
  const inputIsEmpty = value.trim() === "";

  const handleSparkleClick = () => {
    // Select a random prompt
    const randomIndex = Math.floor(Math.random() * samplePrompts.length);
    const randomPrompt = samplePrompts[randomIndex];

    // Create a synthetic event to pass to the onChange handler
    // This mimics a user typing into the input field
    const syntheticEvent = { 
      target: { 
        value: randomPrompt 
      } 
    } as React.ChangeEvent<HTMLInputElement>; // Type assertion

    onChange(syntheticEvent); // Update the input field in the parent component
  };

  return (
    <div className="w-full bg-[#1a1f36]/70 backdrop-blur-md rounded-full p-2 flex items-center space-x-2 shadow-lg border border-blue-900/50">
      {/* Input Field */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder="Ask me anything... or click the ✨ for a suggestion"
        className="flex-1 bg-transparent text-neutral-100 placeholder-neutral-400 focus:outline-none text-lg px-2"
        aria-label="Chat input"
      />

      {/* Grouping auxiliary action buttons */}
      <div className="flex items-center space-x-1">
        {/* Sparkles Icon Button - Now functional */}
        <button 
          onClick={handleSparkleClick}
          className="p-2 text-neutral-300 hover:text-yellow-300 transition-colors rounded-full hover:bg-blue-800/50"
          aria-label="Suggest a prompt"
        >
          <SparklesIcon className="h-6 w-6" />
        </button>

        {/* Mic Icon Button Removed */}
      </div>

      {/* Submit Button: Apply Gemini gradient */}
      <button
        onClick={onSubmit}
        disabled={inputIsEmpty}
        className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white disabled:bg-neutral-600 disabled:opacity-50 hover:shadow-lg transition-all flex items-center justify-center"
        aria-label="Send message"
      >
        <PaperAirplaneIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default React.memo(CopilotInput); 