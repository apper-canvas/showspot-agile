import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import getIcon from './utils/iconUtils';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check for user preference in localStorage or use system preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Update document class when dark mode changes
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
    toast.info(`${!darkMode ? 'Dark' : 'Light'} mode activated`, {
      icon: !darkMode ? "🌙" : "☀️",
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const MoonIcon = getIcon('Moon');
  const SunIcon = getIcon('Sun');

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-surface-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 text-primary-dark dark:text-primary-light">
            <h1 className="text-xl font-bold">ShowSpot</h1>
          </div>
          <button
            onClick={toggleDarkMode}
            className="btn-icon bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-200 hover:bg-surface-200 dark:hover:bg-surface-600 focus:ring-primary dark:focus:ring-primary-light"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </button>
        </div>
      </header>

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="bg-white dark:bg-surface-800 py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-surface-500 text-sm">
          <p>© {new Date().getFullYear()} ShowSpot. All rights reserved.</p>
        </div>
      </footer>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        className="md:max-w-md"
      />
    </div>
  );
}

export default App;