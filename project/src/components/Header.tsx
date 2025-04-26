import { usePortfolioStore } from '../store/portfolioStore';
import { motion } from 'framer-motion';
import { Menu, User, Briefcase, Lock, Unlock } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const { isAdmin, toggleAdmin } = usePortfolioStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { label: 'Home', href: '/', icon: <User size={18} /> },
    { label: 'Admin', href: '/admin', icon: <Briefcase size={18} /> },
  ];

  return (
    <header className="bg-gradient-to-r from-primary-900 to-primary-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link to="/" className="text-2xl font-bold flex items-center">
              <span className="mr-2 text-accent-400">K</span>Portfolio
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav>
              <ul className="flex space-x-6">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className={`flex items-center py-2 hover:text-accent-300 transition-colors ${
                        location.pathname === item.href ? 'border-b-2 border-accent-400' : ''
                      }`}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <button
              onClick={toggleAdmin}
              className="flex items-center space-x-2 px-4 py-2 rounded-md bg-primary-700 hover:bg-primary-800 transition-colors"
            >
              {isAdmin ? (
                <>
                  <Unlock size={18} />
                  <span>Admin Mode</span>
                </>
              ) : (
                <>
                  <Lock size={18} />
                  <span>View Mode</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-white p-2"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4"
          >
            <nav className="flex flex-col space-y-3 py-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center py-2 px-3 rounded hover:bg-primary-800 ${
                    location.pathname === item.href ? 'bg-primary-800' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  toggleAdmin();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 py-2 px-3 rounded text-left hover:bg-primary-800"
              >
                {isAdmin ? (
                  <>
                    <Unlock size={18} />
                    <span>Admin Mode</span>
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    <span>View Mode</span>
                  </>
                )}
              </button>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};