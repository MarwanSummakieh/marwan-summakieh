"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex justify-around items-center fixed top-4 inset-x-0 mx-auto border border-gray-600 rounded-full bg-black shadow-md z-[5000] p-1 sm:p-2 w-[90%] sm:w-[60%] md:w-[50%]",
          className
        )}
      >
        {navItems.map((navItem, idx: number) => (
          <Link
            key={`link-${idx}`}
            href={navItem.link}
            className="relative text-white flex flex-1 justify-center items-center space-x-1 hover:text-neutral-500"
          >
            <span className="flex justify-center items-center">{navItem.icon}</span>
            <span className="text-xs sm:text-sm">{navItem.name}</span>
          </Link>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
