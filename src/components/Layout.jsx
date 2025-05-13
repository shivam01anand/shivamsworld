import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
    } else if (storedTheme === 'light') {
      setIsDarkMode(false);
    } else {
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <header className="py-6 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-serif font-bold hover:text-primary dark:hover:text-accent">
            Shivam Anand
          </Link>
        </div>
      </header>
      <main className="flex-grow container max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="py-8 border-t border-gray-200 dark:border-gray-700 text-center">
        <div className="mb-4">
          <a href="https://instagram.com/shivam01anand" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-accent mx-2">Instagram</a>
          <span className="text-gray-400 dark:text-gray-600">|</span>
          <a href="https://linkedin.com/in/shivam01anand" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-accent mx-2">LinkedIn</a>
          <span className="text-gray-400 dark:text-gray-600">|</span>
          <a href="mailto:shivam01anand@gmail.com" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-accent mx-2">Email</a>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} Shivam Anand. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout; 