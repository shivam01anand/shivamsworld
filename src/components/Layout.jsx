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
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ borderBottom: '1px solid var(--border)', padding: '24px 0' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link
            to="/"
            style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', textDecoration: 'none', letterSpacing: '-0.01em' }}
          >
            Shivam Anand
          </Link>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <main style={{ flexGrow: 1, maxWidth: '640px', width: '100%', margin: '0 auto', padding: '0 24px' }}>
        {children}
      </main>

      <footer style={{ padding: '48px 0', marginTop: 'auto' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 24px', display: 'flex', gap: '24px', fontSize: '13px' }}>
          <a href="https://instagram.com/shivam01anand" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >Instagram</a>
          <a href="https://linkedin.com/in/shivam01anand" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >LinkedIn</a>
          <a href="mailto:shivam01anand@gmail.com"
            style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >Email</a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
