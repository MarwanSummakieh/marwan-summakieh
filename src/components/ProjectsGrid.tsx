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
}

// Define the project data
const projects: ProjectItem[] = [
  {
    title: 'AR Portal in Unity/C#',
    description: 'A project to create an augmented reality portal using Unity and C#.',
    image: '/images/portals.webp',
    icon: <Image src={'/icons/CSharp.svg'} alt={'C#'} width={30} height={30} />
  },
  {
    title: 'Crypto Currency and Blockchain using Kotlin',
    description: 'Developed a cryptocurrency and blockchain implementation using Kotlin.',
    image: '/images/crypto.webp',
    icon: <Image src={'/icons/Kotlin.svg'} alt={'Kotlin'} width={30} height={30} />
  },
  {
    title: 'Game Engine using Java',
    description: 'Built a custom game engine from scratch using Java.',
    image: '/images/gameengine.webp',
    icon: <Image src={'/icons/Java.svg'} alt={'Java'} width={30} height={30} />
  },
  {
    title: 'Neural Network using Python',
    description: 'Implemented a neural network for image recognition using Python.',
    image: '/images/neuralnetwork.webp',
    icon: <Image src={'/icons/Python.svg'} alt={'Python'} width={30} height={30} />
  },
  {
    title: 'Terminal using GO',
    description: 'Created a terminal emulator application using the Go programming language.',
    image: '/images/terminal.webp',
    icon: <Image src={'/icons/Go.svg'} alt={'GO'} width={30} height={30} />
  },
  {
    title: 'WebAssembly Compiler using TypeScript',
    description: 'Developed a compiler targeting WebAssembly using TypeScript.',
    image: '/images/assembly.webp',
    icon: <Image src={'/icons/TypeScript.svg'} alt={'ts'} width={30} height={30} />
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
        <h2 className="text-4xl font-bold text-center mb-8 text-white">My Projects</h2>
        <BentoGrid className="p-3 w-auto mx-auto h-auto gap-2 gap-y-5">
          {projects.map((project, i) => (
            <BentoGridItem
              key={i}
              className={`p-3 rounded-2xl shadow transition-all duration-300 ease-in-out transform ${i === 3 || i === 6 ? "md:col-span-2" : ""
                } bg-gray-900 text-white max-h-max`}
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
            />
          ))}
        </BentoGrid>
      </div>
    </ThemeProvider>
  );
};

export default ProjectGrid;
