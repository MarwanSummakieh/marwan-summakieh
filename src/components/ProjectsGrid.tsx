"use client";

import React from 'react';
import { BentoGrid } from "./ui/BentoGrid";
import Image from 'next/image';
import { ThemeProvider } from './ThemeProvider';
import { BentoGridItem } from './ui/BentoGridItem';
import { Spotlight } from './ui/Spotlight';

// Define the type for project items
interface ProjectItem {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  tutorialLink: string;
  repoLink: string;
}

// Define the project data
const learn: ProjectItem[] = [
  {
    title: 'AR Portal in Unity/C#',
    description: 'A project to create an augmented reality portal using Unity and C#.',
    image: '/images/portals.webp',
    icon: <Image src={'/icons/CSharp.svg'} alt={'C#'} width={30} height={30} />,
    tutorialLink: '/learn/projects/ar-portal',
    repoLink: 'https://github.com/yourusername/ar-portal'
  },
  {
    title: 'Crypto Currency and Blockchain using Kotlin',
    description: 'Developed a cryptocurrency and blockchain implementation using Kotlin.',
    image: '/images/crypto.webp',
    icon: <Image src={'/icons/Kotlin.svg'} alt={'Kotlin'} width={30} height={30} />,
    tutorialLink: '/learn/projects/crypto-blockchain',
    repoLink: 'https://github.com/yourusername/crypto-blockchain'
  },
  {
    title: 'Game Engine using Java',
    description: 'Built a custom game engine from scratch using Java.',
    image: '/images/gameengine.webp',
    icon: <Image src={'/icons/Java.svg'} alt={'Java'} width={30} height={30} />,
    tutorialLink: '/learn/projects/game-engine',
    repoLink: 'https://github.com/yourusername/game-engine'
  },
  {
    title: 'Neural Network using Python',
    description: 'Implemented a neural network for image recognition using Python.',
    image: '/images/neuralnetwork.webp',
    icon: <Image src={'/icons/Python.svg'} alt={'Python'} width={30} height={30} />,
    tutorialLink: '/learn/projects/neural-networks',
    repoLink: 'https://github.com/yourusername/neural-network'
  },
  {
    title: 'Terminal using GO',
    description: 'Created a terminal emulator application using the Go programming language.',
    image: '/images/terminal.webp',
    icon: <Image src={'/icons/Go.svg'} alt={'GO'} width={30} height={30} />,
    tutorialLink: '/learn/projects/terminal-go',
    repoLink: 'https://github.com/yourusername/terminal-go'
  },
  {
    title: 'WebAssembly Compiler using TypeScript',
    description: 'Developed a compiler targeting WebAssembly using TypeScript.',
    image: '/images/assembly.webp',
    icon: <Image src={'/icons/TypeScript.svg'} alt={'ts'} width={30} height={30} />,
    tutorialLink: '/learn/projects/webassembly-compiler',
    repoLink: 'https://github.com/yourusername/webassembly-compiler'
  }
];

const ProjectGrid: React.FC = () => {
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
      <div className="p-10 mt-32">
        <div className="flex flex-col md:flex-row items-center justify-center mb-12">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-5xl font-bold mb-8 text-white">Welcome to My Learning Journey</h1>
            <p className="text-lg text-white">
              Follow along as I explore new concepts and technologies through various projects. Each project comes with a detailed tutorial to help you learn and build the same projects.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/imojies/learn.png"
              alt="Learning Journey"
              width={500}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>
        <BentoGrid className="p-3 w-auto mx-auto h-auto gap-4">
          {learn.map((project, i) => (
            <BentoGridItem
              key={i}
              className="p-3 rounded-2xl shadow transition-all duration-300 ease-in-out transform bg-gray-900 text-white"
              title={project.title}
              description={project.description}
              header={
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover mb-2"
                />
              }
              icon={project.icon}
              footer={
                <div className="flex justify-center mt-4">
                  <a href={project.tutorialLink} className="text-blue-400 underline mr-4"><Image className='rounded-3xl bg-green-500' src={'/icons/read.svg'} alt={'read'} width={25} height={25} /></a>
                  <a href={project.repoLink} className="text-blue-400 underline"><Image className='rounded-3xl bg-white' src={'/icons/Github.svg'} alt={'read'} width={25} height={25} /></a>
                </div>
              }
            />
          ))}
        </BentoGrid>
      </div>
    </ThemeProvider>
  );
};

export default ProjectGrid;
