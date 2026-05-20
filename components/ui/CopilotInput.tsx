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
    "Summarize the software sector.",
    "Show me the game development projects.",
    "Which repo contracts are strongest?",
    "How can I contact Marwan?",
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
      className="flex w-full items-center space-x-2 border-2 border-[#fcee0a]/70 bg-black p-2 shadow-[6px_6px_0_rgba(255,0,60,.35)]"
      aria-busy={isLoading}
    >
      {/* Input Field - Added min-w-0 */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder="Transmit query..."
        className="min-w-0 flex-1 bg-transparent px-2 text-base font-bold text-white placeholder-white/35 focus:outline-none"
        aria-label="Chat input"
        disabled={isLoading}
      />

      {/* Grouping auxiliary action buttons - Added flex-shrink-0 */}
      <div className="flex items-center space-x-1 flex-shrink-0">
        {/* Sparkles Icon Button */}
        <button 
          onClick={handleSparkleClick}
          className="p-2 text-[#fcee0a] transition-colors hover:bg-[#fcee0a] hover:text-black"
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
        className="flex shrink-0 items-center justify-center bg-[#00f0ff] p-2 text-black transition-all hover:bg-[#fcee0a] disabled:bg-neutral-600 disabled:opacity-50"
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
