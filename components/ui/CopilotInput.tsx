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
      className="flex w-full items-center gap-2 rounded-full border border-line-strong bg-wall py-1.5 pl-5 pr-1.5 transition focus-within:border-[rgba(80,227,128,0.5)] focus-within:shadow-[0_0_0_3px_rgba(80,227,128,0.12)]"
      aria-busy={isLoading}
    >
      {/* Input Field */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder="Transmit query..."
        className="min-w-0 flex-1 bg-transparent py-1.5 text-base text-chalk placeholder-white/30 focus:outline-none"
        aria-label="Chat input"
        disabled={isLoading}
      />

      {/* Sparkles suggestion button */}
      <button
        onClick={handleSparkleClick}
        className="flex-shrink-0 rounded-full p-2 text-chalk-mute transition-colors hover:bg-white/[0.06] hover:text-tag"
        aria-label="Suggest a prompt"
        disabled={isLoading}
      >
        <SparklesIcon className="h-5 w-5" />
      </button>

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        disabled={isSendDisabled}
        className="flex shrink-0 items-center justify-center rounded-full bg-tag p-2.5 text-ink transition-all hover:bg-[#6cf094] disabled:bg-concrete-2 disabled:text-chalk-mute disabled:opacity-60"
        aria-label="Send message"
      >
        {isLoading ? (
          <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-black/50 border-t-transparent" />
        ) : (
          <PaperAirplaneIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default React.memo(CopilotInput);
