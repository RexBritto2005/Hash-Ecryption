import React, { useState, useEffect } from 'react';
import { HashGenerator } from './components/HashGenerator';
import { HashAnalyzer } from './components/HashAnalyzer';
import { LandingPage } from './components/LandingPage';
import { ThemeToggle } from './components/ThemeToggle';
import { Shield, ArrowLeft } from 'lucide-react';

type AppView = 'landing' | 'generator' | 'analyzer';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>('landing');

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleServiceSelect = (service: 'generator' | 'analyzer') => {
    setCurrentView(service);
  };

  const handleBackToHome = () => {
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            {currentView !== 'landing' && (
              <button
                onClick={handleBackToHome}
                className="p-2 mr-2 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                aria-label="Back to home"
              >
                <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-300" />
              </button>
            )}
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CryptoHash
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Professional cryptographic hashing toolkit
              </p>
            </div>
          </div>
          <ThemeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
        </div>

        {/* Main Content */}
        {currentView === 'landing' && (
          <LandingPage onServiceSelect={handleServiceSelect} />
        )}

        {currentView === 'generator' && (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
                Hash Generator
              </h2>
            </div>
            <HashGenerator />
          </div>
        )}

        {currentView === 'analyzer' && (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
                Hash Analyzer
              </h2>
            </div>
            <HashAnalyzer />
          </div>
        )}

        {/* Educational Section - Only show on service pages */}
        {currentView !== 'landing' && (
          <div className="mt-12 max-w-4xl mx-auto bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
              Understanding Cryptographic Hashing
            </h3>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Cryptographic hash functions are one-way mathematical algorithms that transform input data 
                into fixed-size strings. They are designed to be irreversible - meaning you cannot recover 
                the original input from the hash output. This makes them perfect for password storage, 
                data integrity verification, and digital signatures.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;