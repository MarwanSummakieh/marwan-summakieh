"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { StickyScroll } from './ui/StickyRoll';

interface TechItem {
  src: string;
  name: string;
}

const milestones = [
  {
    date: "2023 - Present",
    text: "Started my first company job at Joker IT. It was a very interesting and unique experience where I dove deeper into Azure and automation with PowerShell.",
    alt: "Joker IT",
    tech: [
      { src: "/icons/Azure.svg", name: "Azure" },
      { src: "/icons/Powershell.svg", name: "PowerShell" }
    ]
  },
  {
    date: "2022 - 2023",
    text: "After graduating, I wanted to take a short break and started to learn the know-how side of development, such as cloud services and microservices. I also worked on multiple e-commerce projects, learning AWS, Kubernetes, Go, and Python.",
    alt: "Freelance",
    tech: [
      { src: "/icons/AWS.svg", name: "AWS" },
      { src: "/icons/Kubernetes.svg", name: "Kubernetes" },
      { src: "/icons/Go.svg", name: "Go" },
      { src: "/icons/Python.svg", name: "Python" }
    ]
  },
  {
    date: "2019 - 2022",
    text: "After \"HackYourFuture\", I enrolled in a full-time software engineering program, where I was introduced to many concepts, such as object-oriented programming and test-driven development. I also got to understand software design architectures. This is where I learned the most, including C#, TypeScript, Tailwind, React, and React Native.",
    alt: "VIA University College",
    tech: [
      { src: "/icons/Java.svg", name: "Java" },
      { src: "/icons/Spring.svg", name: "Spring" },
      { src: "/icons/CSharp.svg", name: "C#" },
      { src: "/icons/TypeScript.svg", name: "TypeScript" },
      { src: "/icons/Tailwind CSS.svg", name: "Tailwind CSS" },
      { src: "/icons/React.svg", name: "React" },
    ]
  },
  {
    date: "2018 - 2019",
    text: "\"HackYourFuture\" was my entryway to the world of programming, and just like that, I was hooked. I learnt HTML, CSS, and JavaScript.",
    alt: "HackYourFuture",
    tech: [
      { src: "/icons/HTML5.svg", name: "HTML5" },
      { src: "/icons/CSS3.svg", name: "CSS3" },
      { src: "/icons/JavaScript.svg", name: "JavaScript" }
    ]
  }
];

const StickyScrollContent = milestones.map((milestone, index) => ({
  title: milestone.date,
  description: milestone.text,
  content: (
    <div className="h-full w-full flex items-center justify-center text-white">
      <div className="grid grid-cols-3 gap-4">
        {milestone.tech.map((tech, techIndex) => (
          <div key={techIndex} className="flex flex-col items-center">
            <Image src={tech.src} alt={tech.name} width={50} height={50} />
          </div>
        ))}
      </div>
    </div>
  ),
}));

const Timeline: React.FC = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white">My Journey in Tech</h1>
      </div>
      <StickyScroll content={StickyScrollContent} />
    </div>
  );
};

export default Timeline;
