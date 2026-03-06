"use client";

import React from "react";
import { SparklesIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

interface CopilotInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
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
    onKeyPress,
    isLoading = false,
}) => {
  const inputIsEmpty = value.trim() === "";
  const isSendDisabled = inputIsEmpty || isLoading;

  const handleSparkleClick = () => {
    if (isLoading) {
      return;
    }
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
    <div
      className="w-full rounded-full border border-slate-200 bg-white/70 p-2 shadow-lg backdrop-blur-md dark:border-emerald-900/50 dark:bg-[#131718]/70 flex items-center space-x-2"
      aria-busy={isLoading}
    >
      {/* Input Field - Added min-w-0 */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder="Ask me anything... or click the ✨ for a suggestion"
        className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none text-lg px-2 min-w-0 dark:text-neutral-100 dark:placeholder-neutral-400"
        aria-label="Chat input"
        disabled={isLoading}
      />

      {/* Grouping auxiliary action buttons - Added flex-shrink-0 */}
      <div className="flex items-center space-x-1 flex-shrink-0">
        {/* Sparkles Icon Button */}
        <button 
          onClick={handleSparkleClick}
          className="p-2 text-slate-400 hover:text-yellow-500 transition-colors rounded-full hover:bg-slate-100 dark:text-neutral-300 dark:hover:text-yellow-300 dark:hover:bg-emerald-800/50"
          aria-label="Suggest a prompt"
          disabled={isLoading}
        >
          <SparklesIcon className="h-6 w-6" />
        </button>

        {/* Mic Icon Button Removed */}
      </div>

      {/* Submit Button - Added flex-shrink-0 */}
      <button
        onClick={onSubmit}
        disabled={isSendDisabled}
        className="p-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white disabled:bg-neutral-600 disabled:opacity-50 hover:shadow-lg transition-all flex items-center justify-center flex-shrink-0"
        aria-label="Send message"
      >
        {isLoading ? (
          <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
        ) : (
          <PaperAirplaneIcon className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

export default React.memo(CopilotInput); 