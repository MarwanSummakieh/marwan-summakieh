"use client";

import React from 'react';
import Image from 'next/image';

// Define the type for tech items
interface TechItem {
  src: string;
  name: string;
}

// Define the tech data categorized
const techData: { [key: string]: TechItem[] } = {
  "Front-End": [
    { src: "/icons/HTML5.svg", name: "HTML5" },
    { src: "/icons/CSS3.svg", name: "CSS3" },
    { src: "/icons/React.svg", name: "React" },
    { src: "/icons/Next.js.svg", name: "Next.js" },
    { src: "/icons/Tailwind CSS.svg", name: "Tailwind CSS" },
    { src: "/icons/TypeScript.svg", name: "TypeScript" },
    { src: "/icons/JavaScript.svg", name: "JavaScript" },
    { src: "/icons/Xamarin.svg", name: "Xamarin" },
    { src: "/icons/Android.svg", name: "Android" },
  ],
  "Back-End": [
    { src: "/icons/Node.js.svg", name: "Node.js" },
    { src: "/icons/Express.svg", name: "Express" },
    { src: "/icons/Spring.svg", name: "Spring" },
    { src: "/icons/NET.svg", name: ".NET" },
    { src: "/icons/CSharp.svg", name: "C#" },
    { src: "/icons/Go.svg", name: "Go" },
    { src: "/icons/Python.svg", name: "Python" },
    { src: "/icons/Java.svg", name: "Java" }
  ],
  "DevOps": [
    { src: "/icons/Docker.svg", name: "Docker" },
    { src: "/icons/Kubernetes.svg", name: "Kubernetes" },
    { src: "/icons/AWS.svg", name: "AWS" },
    { src: "/icons/Azure.svg", name: "Azure" },
    { src: "/icons/Powershell.svg", name: "PowerShell" }
  ],
  "Databases": [
    { src: "/icons/MongoDB.svg", name: "MongoDB" },
    { src: "/icons/PostgresSQL.svg", name: "PostgreSQL" },
    { src: "/icons/Microsoft SQL Server.svg", name: "MS SQL Server" }
  ],
  "Game Development": [
    { src: "/icons/Unity.svg", name: "Unity" },
    { src: "/icons/Unreal Engine.svg", name: "Unreal Engine" }
  ]
};

const TechGrid: React.FC = () => {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white">My Technical Skills</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {["Front-End", "Back-End", "DevOps", "Databases"].map((category) => (
          <div key={category} className="aspect-w-1 aspect-h-1 border-2 border-blue-800 rounded-2xl p-5 bg-transparent flex flex-col">
            <div className="text-2xl font-bold mb-5 text-center">{category}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {techData[category].map((tech, index) => (
                <div key={index} className="group relative flex flex-col items-center p-5 rounded-2xl shadow transition transform hover:scale-110 hover:z-10 hover:bg-gradient-to-r hover:from-cyan-700 hover:to-blue-700 border border-blue-800 bg-transparent">
                  <Image src={tech.src} alt={tech.name} width={80} height={80} className="rounded-2xl" style={{ filter: 'drop-shadow(0 0 5px white)' }} />
                  <div className="absolute bottom-[-2rem] left-1/2 transform -translate-x-1/2 bg-white text-black text-xs rounded-2xl py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 whitespace-nowrap">
                    {tech.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="aspect-w-1 aspect-h-1 border-2 border-blue-800 rounded-2xl p-5 bg-transparent mt-5">
        <div className="text-2xl font-bold mb-5 text-center">Game Development</div>
        <div className="flex justify-center">
          <div className="flex justify-center items-center gap-5">
            {techData["Game Development"].map((tech, index) => (
              <div key={index} className="group relative flex flex-col items-center p-5 rounded-2xl shadow transition transform hover:scale-110 hover:z-10 hover:bg-gradient-to-r hover:from-cyan-700 hover:to-blue-700 border border-blue-800 bg-transparent">
                <Image src={tech.src} alt={tech.name} width={80} height={80} className="rounded-2xl" style={{ filter: 'drop-shadow(0 0 5px white)' }} />
                <div className="absolute bottom-[-2rem] left-1/2 transform -translate-x-1/2 bg-white text-black text-xs rounded-2xl py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 whitespace-nowrap">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechGrid;
