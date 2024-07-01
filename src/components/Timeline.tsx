"use client";

import React from 'react';
import Image from 'next/image';

// Define the type for tech items
interface TechItem {
  src: string;
  name: string;
}

// Define the milestones with associated tech skills
const milestones = [
  {
    date: "2018 - 2019",
    text: "Hack your future was my entry way to the world of programming and just like that I was hooked, I learnt HTML, CSS, and JavaScript.",
    image: "/imojies/amazing.png",
    alt: "HackYourFuture",
    tech: [
      { src: "/icons/HTML5.svg", name: "HTML5" },
      { src: "/icons/CSS3.svg", name: "CSS3" },
      { src: "/icons/JavaScript.svg", name: "JavaScript" }
    ]
  },
  {
    date: "2019 - 2022",
    text: "After Hack your future I enrolled into a full time software engineering programme where I was introduced to many concept such as object-oriented programming and test driven development. I also got to understand software design architectures. Here is where I learnt the most including C#, TypeScript, Tailwind, React, and React Native.",
    image: "/imojies/graduation.png",
    alt: "VIA University College",
    tech: [
      { src: "/icons/Java.svg", name: "Java" },
      { src: "/icons/CSharp.svg", name: "C#" },
      { src: "/icons/TypeScript.svg", name: "TypeScript" },
      { src: "/icons/Tailwind CSS.svg", name: "Tailwind CSS" },
      { src: "/icons/React.svg", name: "React" },
    ]
  },
  {
    date: "2022 - 2023",
    text: "After graduating I wanted to take a short break and I started to learn the know how side of development such as cloud services and micro services, I also worked on multiple e-commerce projects. learning AWS, Kubernetes, Go, and Python.",
    image: "/imojies/busy.png",
    alt: "Freelance",
    tech: [
      { src: "/icons/AWS.svg", name: "AWS" },
      { src: "/icons/Kubernetes.svg", name: "Kubernetes" },
      { src: "/icons/Go.svg", name: "Go" },
      { src: "/icons/Python.svg", name: "Python" }
    ]
  },
  {
    date: "2023 - Present",
    text: "Started my first company job at Joker IT, it was a very interesting and unique experience where I dove deeper into Azure and automation with powershell, focusing on Azure and PowerShell.",
    image: "/imojies/work.png",
    alt: "Joker IT",
    tech: [
      { src: "/icons/Azure.svg", name: "Azure" },
      { src: "/icons/Powershell.svg", name: "PowerShell" }
    ]
  }
];

const Timeline: React.FC = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white">My Journey in Tech</h1>
      </div>
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-blue-800"></div>
        {milestones.map((milestone, index) => (
          <div key={index} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center mb-10 relative`}>
            <div className="w-1/2 p-5">
              <Image src={milestone.image} alt={milestone.alt} width={400} height={300} className="rounded-xl shadow-lg" />
            </div>
            <div className="w-1/2 p-5">
              <div className="bg-blue-800 text-white p-6 rounded-xl shadow-lg mb-4">
                <h2 className="text-2xl font-bold mb-4">{milestone.date}</h2>
                <p className="text-lg">{milestone.text}</p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                {milestone.tech.map((tech, techIndex) => (
                  <div key={techIndex} className="relative flex flex-col items-center group">
                    <Image src={tech.src} alt={tech.name} width={50} height={50} className="shadow-md" />
                    <p className="text-white text-sm absolute bottom-[-1.5rem] opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 px-2 py-1 rounded-lg">
                      {tech.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center text-white text-lg">
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
