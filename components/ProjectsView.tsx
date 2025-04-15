"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, LinkIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
}

interface ProjectsViewProps {
  onBack: () => void;
}

// Interface for the language breakdown from GitHub API
interface RepoLanguages {
  [language: string]: number; // Language name -> bytes
}

const GITHUB_USERNAME = "MarwanSummakieh";

const ProjectsView: React.FC<ProjectsViewProps> = ({ onBack }) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  
  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const [isReadmeLoading, setIsReadmeLoading] = useState(false);
  const [readmeError, setReadmeError] = useState<string | null>(null);
  const [repoLanguages, setRepoLanguages] = useState<RepoLanguages | null>(null);
  const [isLanguagesLoading, setIsLanguagesLoading] = useState(false);
  const [languagesError, setLanguagesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`);
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }
        const data: GitHubRepo[] = await response.json();
        // Filter out potentially irrelevant forks or archived repos if desired - example filter
        // const filteredData = data.filter(repo => !repo.fork && !repo.archived);
        setRepos(data); 
      } catch (err) {
        console.error("Failed to fetch GitHub repos:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred while fetching projects.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, []); // Empty dependency array means this runs once on mount

  // Combined function to fetch README and Languages for the overlay
  const fetchOverlayData = useCallback(async (repoName: string) => {
    // Reset state for both fetches
    setIsReadmeLoading(true);
    setReadmeContent(null);
    setReadmeError(null);
    setIsLanguagesLoading(true);
    setRepoLanguages(null);
    setLanguagesError(null);
    console.log(`[Overlay] Fetching data for ${repoName}`);

    try {
      // Fetch README (parallel fetch)
      const readmePromise = fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`)
        .then(res => {
            if (res.status === 404) return { notFound: true };
            if (!res.ok) throw new Error(`README meta fetch failed: ${res.status}`);
            return res.json();
        })
        .then(meta => {
            if (meta.notFound) return "No README file found in this repository.";
            if (!meta.download_url) throw new Error('No README download_url');
            return fetch(meta.download_url).then(res => {
                if (!res.ok) throw new Error(`README content download failed: ${res.status}`);
                return res.text();
            });
        });

      // Fetch Languages (parallel fetch)
      const languagesPromise = fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`)
        .then(res => {
            if (!res.ok) throw new Error(`Languages fetch failed: ${res.status}`);
            return res.json();
        });

      // Await both promises
      const [readmeResult, languagesResult] = await Promise.allSettled([
          readmePromise,
          languagesPromise
      ]);

      // Handle README result
      if (readmeResult.status === 'fulfilled') {
          setReadmeContent(readmeResult.value);
      } else {
          console.error(`[Overlay] Failed to fetch README for ${repoName}:`, readmeResult.reason);
          setReadmeError(readmeResult.reason?.message || "Failed to load README");
          setReadmeContent(null);
      }
      setIsReadmeLoading(false);
      
      // Handle Languages result
      if (languagesResult.status === 'fulfilled') {
          setRepoLanguages(languagesResult.value);
      } else {
          console.error(`[Overlay] Failed to fetch languages for ${repoName}:`, languagesResult.reason);
          setLanguagesError(languagesResult.reason?.message || "Failed to load languages");
          setRepoLanguages(null);
      }
      setIsLanguagesLoading(false);

    } catch (err) { // Catch potential errors in Promise setup (unlikely here)
        console.error(`[Overlay] Unexpected error fetching data for ${repoName}:`, err);
        setReadmeError("Unexpected error");
        setLanguagesError("Unexpected error");
        setIsReadmeLoading(false);
        setIsLanguagesLoading(false);
    }
  }, []);

  const handleOpenOverlay = useCallback((repo: GitHubRepo) => {
    setSelectedRepo(repo);
    fetchOverlayData(repo.name);
  }, [fetchOverlayData]);

  const handleCloseOverlay = useCallback(() => {
    setSelectedRepo(null);
    setReadmeContent(null);
    setIsReadmeLoading(false);
    setReadmeError(null);
    setRepoLanguages(null);
    setIsLanguagesLoading(false);
    setLanguagesError(null);
  }, []);

  return (
    <>
      <motion.div
        key="projects-view-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="z-10 w-full max-w-6xl mx-auto px-4 text-white relative flex flex-col items-center"
        style={{ minHeight: '80vh' }}
      >
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-0 left-0 mt-0 ml-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors duration-300 z-20"
          aria-label="Go back to options"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back
        </motion.button>

        <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-8 mt-16 text-center">
          Professional Projects
        </h2>

        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div 
              key="loading" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="text-center text-neutral-300 mt-10"
            >
              Loading projects from GitHub...
            </motion.div>
          )}

          {error && (
            <motion.div 
              key="error" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="text-center text-red-400 mt-10 bg-red-900/30 p-4 rounded-lg border border-red-500/50"
            >
              <p>Error loading projects:</p>
              <p className="text-sm mt-1">{error}</p>
            </motion.div>
          )}

          {!isLoading && !error && repos.length === 0 && (
             <motion.div 
               key="no-repos" 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }} 
               className="text-center text-neutral-400 mt-10"
             >
               No public repositories found for {GITHUB_USERNAME}.
             </motion.div>
          )}

          {!isLoading && !error && repos.length > 0 && (
            <motion.div 
              key="repo-grid"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            >
              {repos.map((repo) => {
                return (
                  <motion.div
                    key={repo.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: repos.indexOf(repo) * 0.05 }}
                    className="p-4 rounded-lg bg-gradient-to-r from-white/5 to-white/10 border border-white/20 backdrop-blur-sm shadow-md flex flex-col justify-between overflow-hidden h-full"
                  >
                    <div>
                      <button
                        onClick={() => handleOpenOverlay(repo)} 
                        className="block w-full text-left mb-2 text-lg font-semibold text-blue-300 hover:text-blue-200 focus:outline-none transition-colors duration-150 break-words"
                      >
                        {repo.name}
                      </button>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-white/10">
                        <div className="flex items-center gap-3 flex-wrap">
                          {repo.language && (
                            <span className={`inline-flex items-center gap-1.5 text-neutral-300`}> 
                              {repo.language}
                            </span>
                          )}
                        </div>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 hover:text-neutral-200 flex-shrink-0"
                          aria-label={`View ${repo.name} on GitHub`}
                        >
                          <LinkIcon className="h-4 w-4" /> View Code
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedRepo && (
          <motion.div
            key="repo-overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex justify-center items-center p-4"
            onClick={handleCloseOverlay}
          >
            <motion.div
              key="repo-overlay-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-[#121433] border border-purple-400/50 rounded-lg shadow-xl p-6 md:p-8 overflow-y-auto max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={handleCloseOverlay}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full z-50"
                aria-label="Close project details"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>

              <h3 className="text-2xl font-bold text-blue-300 mb-4 break-words">
                {selectedRepo.name}
              </h3>
              
              <div className="readme-content mb-6 min-h-[100px] border-t border-b border-white/10 py-4">
                 {isReadmeLoading && (
                    <p className="text-center text-neutral-400">Loading README...</p>
                 )}
                 {readmeError && (
                    <div className="text-center text-red-400 bg-red-900/30 p-3 rounded">
                      <p>Error loading README:</p>
                      <p className="text-sm mt-1">{readmeError}</p>
                    </div>
                 )}
                 {!isReadmeLoading && !readmeError && readmeContent && (
                    <div className="prose prose-invert max-w-none text-neutral-200">
                      <ReactMarkdown>
                        {readmeContent}
                      </ReactMarkdown>
                    </div>
                 )}
                 {!isReadmeLoading && !readmeError && !readmeContent && (
                     <p className="text-center text-neutral-500">README content not available.</p>
                 )}
              </div>

              <div className="languages-section mb-6 pt-3 border-t border-white/10">
                <h4 className="text-sm font-semibold text-neutral-300 mb-2">Languages Used:</h4>
                {isLanguagesLoading && <p className="text-xs text-neutral-400">Loading languages...</p>}
                {languagesError && <p className="text-xs text-red-400">Error: {languagesError}</p>}
                {!isLanguagesLoading && !languagesError && repoLanguages && Object.keys(repoLanguages).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {Object.keys(repoLanguages).map(lang => (
                            <span key={lang} className="px-2 py-0.5 rounded-full bg-blue-900/50 text-blue-200 text-xs font-medium">
                                {lang}
                            </span>
                        ))}
                    </div>
                )}
                {!isLanguagesLoading && !languagesError && (!repoLanguages || Object.keys(repoLanguages).length === 0) && (
                    <p className="text-xs text-neutral-500">Language data not available.</p>
                )}
              </div>

              <a
                 href={selectedRepo.html_url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg transition-shadow duration-300"
              >
                  <LinkIcon className="h-5 w-5" /> View on GitHub
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsView; 