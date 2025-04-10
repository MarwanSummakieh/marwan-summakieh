"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion"; // Ensure correct import
import { useEffect } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true }); // Trigger animation only once

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.15, // Faster character reveal duration
          delay: stagger(0.025), // Faster stagger delay
          ease: "easeInOut",
        }
      );
    }
    // Added missing dependency
  }, [isInView, animate]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{ width: 0 }} // Start with width 0 for character reveal
                  key={`char-${index}`}
                  // Adjusted color: Use parent color (likely light) by default, remove explicit black
                  className={cn(
                    `opacity-0 hidden`, // Rely on parent for color or word.className
                    word.className
                  )}
                  style={{ lineHeight: 'inherit' }} // Ensure consistent line height
                >
                  {char}
                </motion.span>
              ))}
              {/* Add space only if it's not the last word */}
              {idx < wordsArray.length - 1 && <span>&nbsp;</span>}
            </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    // Adjusted base style
    <div className={cn("font-normal text-base", className)}> 
      {renderWords()}
      {/* Blinking cursor */}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        // Adjusted cursor style to better match theme
        className={cn(
          "inline-block rounded-sm w-[2px] h-[1em] translate-y-0.5 bg-blue-400", 
          cursorClassName
        )}
        style={{ marginBottom: '-0.1em'}} // Fine-tune cursor alignment
      ></motion.span>
    </div>
  );
}; 