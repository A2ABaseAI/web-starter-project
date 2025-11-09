import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useState, useEffect } from "react";

export default function SiteLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('header')) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [open]);

  const navItem = (props: { isActive: boolean; isPending: boolean }) => {
    const { isActive } = props;
    return `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        : "hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
    }`;
  };

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 supports-[backdrop-filter]:dark:bg-gray-950/70 shadow-sm">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4">
          <Link 
            to="/" 
            className="font-bold text-lg sm:text-xl tracking-tight hover:opacity-80 transition-opacity text-gray-900 dark:text-gray-100"
          >
            Agent UI
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden relative inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 dark:focus:ring-white dark:focus:ring-offset-gray-950"
            onClick={() => setOpen(o => !o)} 
            aria-label="Toggle menu"
            aria-expanded={open}
            type="button"
          >
            <div className="relative w-6 h-6">
              {/* Hamburger icon */}
              <span
                className={`absolute top-0 left-0 w-6 h-0.5 bg-gray-900 dark:bg-gray-100 transition-all duration-300 ${
                  open ? "rotate-45 top-2.5" : ""
                }`}
              />
              <span
                className={`absolute top-2.5 left-0 w-6 h-0.5 bg-gray-900 dark:bg-gray-100 transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute top-5 left-0 w-6 h-0.5 bg-gray-900 dark:bg-gray-100 transition-all duration-300 ${
                  open ? "-rotate-45 top-2.5" : ""
                }`}
              />
            </div>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink className={navItem} to="/features">Features</NavLink>
            <NavLink className={navItem} to="/docs">Docs</NavLink>
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            open ? 'max-h-96 opacity-100 visible' : 'max-h-0 opacity-0 invisible'
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-4 pt-3 flex flex-col gap-1 border-t border-gray-200/50 dark:border-gray-800/50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl">
            <NavLink 
              className={navItem} 
              to="/features" 
              onClick={() => setOpen(false)}
            >
              Features
            </NavLink>
            <NavLink 
              className={navItem} 
              to="/docs" 
              onClick={() => setOpen(false)}
            >
              Docs
            </NavLink>
            <div className="pt-3 mt-2 border-t border-gray-200/50 dark:border-gray-800/50 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-gray-200/50 dark:border-gray-800/50 py-8 sm:py-12 mt-auto bg-gray-50/50 dark:bg-gray-950/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Agent UI — Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
