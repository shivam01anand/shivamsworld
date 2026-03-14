import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
    } else if (storedTheme === 'light') {
      setIsDarkMode(false);
    } else {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
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

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 [data-theme='dark']:bg-stone-950">
      <header className="py-6">
        <div className="max-w-2xl mx-auto px-6 flex justify-between items-center">
          <Link
            to="/"
            className="text-lg font-medium text-stone-900 dark:text-stone-100 hover:opacity-70 transition-opacity"
          >
            Shivam Anand
          </Link>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors p-1"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <main className="flex-grow max-w-2xl w-full mx-auto px-6 py-4">
        {children}
      </main>

      <footer className="py-12 mt-auto">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex items-center gap-6 text-sm text-stone-400 dark:text-stone-500">
            <a href="https://instagram.com/shivam01anand" target="_blank" rel="noopener noreferrer" className="hover:text-stone-700 dark:hover:text-stone-300 transition-colors">
              Instagram
            </a>
            <a href="https://linkedin.com/in/shivam01anand" target="_blank" rel="noopener noreferrer" className="hover:text-stone-700 dark:hover:text-stone-300 transition-colors">
              LinkedIn
            </a>
            <a href="mailto:shivam01anand@gmail.com" className="hover:text-stone-700 dark:hover:text-stone-300 transition-colors">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
