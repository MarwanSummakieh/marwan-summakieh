"use client";

import React from 'react';
import { BentoGrid } from "./ui/BentoGrid";
import Image from 'next/image';
import { ThemeProvider } from './ThemeProvider';
import { BentoGridItem } from './ui/BentoGridItem';
import { Spotlight } from './ui/Spotlight';
import { FaBook, FaGithub } from 'react-icons/fa';

// Define the type for project items
interface ProjectItem {
  title: string;
  image: string;
  icon: React.ReactNode;
  tutorialLink: string;
  repoLink: string;
  status: 'complete' | 'in-progress';
}

// Define the project data
const learn: ProjectItem[] = [
  {
    title: 'Neural Network using Python',
    image: '/images/neuralnetwork.webp',
    icon: <Image src={'/icons/Python.svg'} alt={'Python'} width={30} height={30} />,
    tutorialLink: '/learn/projects/neural-networks',
    repoLink: 'https://github.com/MarwanSummakieh/neural-network',
    status: 'complete'
  },
  {
    title: 'AR Portal in Unity/C#',
    image: '/images/portals.webp',
    icon: <Image src={'/icons/CSharp.svg'} alt={'C#'} width={30} height={30} />,
    tutorialLink: '/learn/projects/ar-portal',
    repoLink: 'https://github.com/yourusername/ar-portal',
    status: 'in-progress'
  },
  {
    title: 'Crypto Currency and Blockchain using Kotlin',
    image: '/images/crypto.webp',
    icon: <Image src={'/icons/Kotlin.svg'} alt={'Kotlin'} width={30} height={30} />,
    tutorialLink: '/learn/projects/crypto-blockchain',
    repoLink: 'https://github.com/yourusername/crypto-blockchain',
    status: 'in-progress'
  },
  {
    title: 'Game Engine using Java',
    image: '/images/gameengine.webp',
    icon: <Image src={'/icons/Java.svg'} alt={'Java'} width={30} height={30} />,
    tutorialLink: '/learn/projects/game-engine',
    repoLink: 'https://github.com/yourusername/game-engine',
    status: 'in-progress'
  },
  {
    title: 'Terminal using GO',
    image: '/images/terminal.webp',
    icon: <Image src={'/icons/Go.svg'} alt={'GO'} width={30} height={30} />,
    tutorialLink: '/learn/projects/terminal-go',
    repoLink: 'https://github.com/yourusername/terminal-go',
    status: 'in-progress'
  },
  {
    title: 'WebAssembly Compiler using TypeScript',
    image: '/images/assembly.webp',
    icon: <Image src={'/icons/TypeScript.svg'} alt={'ts'} width={30} height={30} />,
    tutorialLink: '/learn/projects/webassembly-compiler',
    repoLink: 'https://github.com/yourusername/webassembly-compiler',
    status: 'in-progress'
  }
];

const ProjectGrid: React.FC = () => {
  const completeProjects = learn.filter(project => project.status === 'complete');
  const inProgressProjects = learn.filter(project => project.status === 'in-progress');

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

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">available Projects</h2>
          <BentoGrid className="p-3 w-auto mx-auto h-auto gap-4">
            {completeProjects.map((project, i) => (
              <BentoGridItem
                key={i}
                className="relative p-3 rounded-2xl transition-all duration-300 ease-in-out transform bg-gray-900 text-white before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-2xl before:border-4 before:border-transparent before:transition-all before:duration-300 before:ease-in-out hover:before:border-gradient-to-r hover:before:from-purple-500 hover:before:via-pink-500 hover:before:to-red-500 hover:shadow-lg hover:shadow-green-500/50 group"
                title={project.title}
                header={<Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover mb-2" />}
                icon={project.icon}
                footer={
                  <div className="flex justify-between mt-4">
                    <a
                      title="Documentation"
                      href={project.tutorialLink}
                      className="absolute bottom-4 left-4"
                    >
                      <FaBook size="25" />
                    </a>
                    <a
                      title="GitHub"
                      href={project.repoLink}
                      className="absolute bottom-4 right-4"
                    >
                      <FaGithub size="25" />
                    </a>
                  </div>
                }
                description={''}
              />
            ))}
          </BentoGrid>
        </div>

        <div className="w-full h-1 rounded bg-purple-500 my-12"></div>

        <div>
          <h2 className="text-3xl font-bold mb-4 text-white">Coming soon</h2>
          <BentoGrid className="p-3 w-auto mx-auto h-auto gap-4">
            {inProgressProjects.map((project, i) => (
              <BentoGridItem
                key={i}
                className="relative p-3 rounded-2xl transition-all duration-300 ease-in-out transform bg-gray-900 text-white before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-2xl before:border-4 before:border-transparent before:transition-all before:duration-300 before:ease-in-out hover:before:border-gradient-to-r hover:before:from-purple-500 hover:before:via-pink-500 hover:before:to-red-500 hover:shadow-lg hover:shadow-red-500/50 group"
                title={project.title}
                header={<Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover mb-2" />}
                icon={project.icon}
                description={''}
              />
            ))}
          </BentoGrid>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ProjectGrid;
