"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

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

const Timeline: React.FC = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white">My Journey in Tech</h1>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
        className="relative"
      >
        {/* Vertical line */}
        <div className="absolute left-1/3 transform -translate-x-1/2 w-px bg-gray-300 h-full"></div>
        
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            className="flex flex-col md:grid md:grid-cols-3 items-center mb-10 relative"
          >
            {/* Date column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: index * 0.4 }}
              viewport={{ once: true }}
              className="w-full md:col-span-1 p-5 text-right md:pr-8"
            >
              <p className="text-sm font-bold text-white inline-block bg-gray-800 px-2 py-1 rounded">
                {milestone.date}
              </p>
            </motion.div>

            {/* Timeline node */}
            <div className="absolute left-1/3 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full z-10"></div>

            {/* Content column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: index * 0.4 }}
              viewport={{ once: true }}
              className="w-[35vw] md:col-span-1 p-5 md:pl-8"
            >
              <div className="bg-gradient-to-br from-cyan-950 to-transparent text-white font-mono text-xs p-6 rounded-xl shadow-lg">
                <p className="text-sm mb-4">{milestone.text}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {milestone.tech.map((tech, techIndex) => (
                    <motion.div
                      key={techIndex}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: index * 0.4 + techIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="relative flex flex-col items-center group"
                    >
                      <Image src={tech.src} alt={tech.name} width={25} height={25} />
                      <p className="text-white text-sm absolute bottom-[-1.5rem] opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 px-2 py-1 rounded-lg">
                        {tech.name}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Timeline;
