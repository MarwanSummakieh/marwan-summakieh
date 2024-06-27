"use client";

import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { ThemeProvider } from './ThemeProvider';

const Footer: React.FC = () => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
        >
            <footer className="text-white py-4 bg-black-100">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h4 className="text-lg font-bold">Marwan Summakieh</h4>
                        <p>© {new Date().getFullYear()} All rights reserved.</p>
                    </div>
                    <div className="flex space-x-4">
                        <a href="https://x.com/MSummakieh" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="text-2xl" />
                        </a>
                        <a href="https://www.linkedin.com/in/marwan-summakieh-36aab4290/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="text-2xl" />
                        </a>
                        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                            <FaGithub className="text-2xl" />
                        </a>
                    </div>
                </div>
            </footer>
        </ThemeProvider>
    );
};

export default Footer;
