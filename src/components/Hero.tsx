"use"

import React from 'react';
import { Spotlight } from './ui/Spotlight';
import { ThemeProvider } from './ThemeProvider';
import { TextGenerateEffect } from './ui/TextGenerateEffect';
import MagicButton from './ui/MagicButton';
import NormalButton from './ui/NormalButton';
import Link from 'next/link';
import { LampContainer } from './ui/Lamp';

const Hero = () => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <div className="pd-20">
        <div className="h-full w-full dark:bg-black-100 dark:bg-grid-white/[0.03] bg-grid-black/[0.02] relative flex items-center justify-center top-0 left-0 ">
          <div className="relative pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          <div className="flex justify-center relative my-20 z-10">
            <div className="max-w-auto md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
              <LampContainer children={<><TextGenerateEffect
                className="text-center text-[40px] md:text-5xl lg:text-6xl"
                words="Bring your imagination to light" />
                <div className="w-96 flex justify-between mt-10">
                  {Array.from("MARWAN SUMMAKIEH").map((char, index) => (
                    <span key={index} className="font-medium text-slate-800">
                      {char}
                    </span>
                  ))}
                </div></>
              } />

              <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
                Hi, I&apos;m Marwan Summakieh, a passionate software engineer based in Copenhagen.
              </p>
              <div className="w-full relative flex items-center justify-center top-0 left-0 p-1">
                <span className="p-1">
                  <Link href="/learn" legacyBehavior>
                    <NormalButton title="Check out my work" icon={undefined} position="" />
                  </Link>
                </span>
                <span className="p-1">
                  <Link href={'/chat'} >
                    <MagicButton title="Chat with me" icon={undefined} position="" />
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Hero;
