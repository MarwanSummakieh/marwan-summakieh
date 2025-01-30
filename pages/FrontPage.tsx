"use client";

import { GoogleGeminiEffect } from "@/components/ui/GLowingLines";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function RenovationNotice() {
  const ref = useRef(null);
  return (
    <div className="min-h-[110vh] bg-black">
      <GoogleGeminiEffect>
        <div className="h-screen flex flex-col items-center justify-center text-center px-4 py-4 ">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400 py-4"
          >
            Evolution in Progress
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-neutral-100 text-2xl md:text-xl max-w-2xl mx-auto h-10 bg-slate-900/50"
          >
            <span>
              We&apos;re rebuilding everything from the ground up with artificial intelligence at its core.
              The future of smart web experiences is coming soon.
            </span>

          </motion.p>
        </div>
      </GoogleGeminiEffect>
    </div>
  );
}