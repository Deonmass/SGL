import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, ChevronDown, Bell, LogOut, Settings, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from './LanguageSelector';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
    setShowProfileMenu(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Get first two letters of email
  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  const profileMenuItems = user ? [
    { label: user.username, isEmail: true },
    { to: '/profil', label: 'Mon profil', icon: User },
    { to: '/notifications', label: 'Notifications', icon: Bell },
    { to: '/parametres', label: 'Paramètres', icon: Settings },
    { label: 'Déconnexion', icon: LogOut, onClick: handleSignOut }
  ] : [];

  return (
    <header 
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between h-[34px]">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="https://shippinggreatlakes.com/wp-content/uploads/2018/11/logo_90.png" 
            alt="SHIPPING GL" 
            className="h-[50px] w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 ">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary-600 ${
              location.pathname === '/' ? 'bg-primary-600 text-white px-4 py-2 rounded-lg' : 'text-gray-800'
            }`}
          >
            {t('navigation.home')}
          </Link>
          <Link 
            to="/services" 
            className={`text-sm font-medium transition-colors hover:text-primary-600 ${
              location.pathname === '/services' ? 'bg-primary-600 text-white px-4 py-2 rounded-lg' : 'text-gray-800'
            }`}
          >
            {t('navigation.services')}
          </Link>
          <Link 
            to="/partenaires" 
            className={`text-sm font-medium transition-colors hover:text-primary-600 ${
              location.pathname === '/partenaires' ? 'bg-primary-600 text-white px-4 py-2 rounded-lg' : 'text-gray-800'
            }`}
          >
            Partenaires
          </Link>

          {/* Gallery Link */}
          <Link 
            to="/galerie" 
            className={`text-sm font-medium transition-colors hover:text-primary-600 ${
              location.pathname === '/galerie' ? 'bg-primary-600 text-white px-4 py-2 rounded-lg' : 'text-gray-800'
            }`}
          >
            Galerie
          </Link>

          <Link 
            to="/a-propos" 
            className={`text-sm font-medium transition-colors hover:text-primary-600 ${
              location.pathname === '/a-propos' ? 'bg-primary-600 text-white px-4 py-2 rounded-lg' : 'text-gray-800'
            }`}
          >
            {t('navigation.about')}
          </Link>
        </nav>

        {/* Right side actions */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSelector />
          
          {user ? (
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="text-gray-600 hover:text-primary-600 relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-600">
                      {user.email ? getInitials(user.email) : 'U'}
                    </span>
                  </div>
                </button>

                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2"
                    >
                      {profileMenuItems.map((item, index) => (
                        item.isEmail ? (
                          <div
                            key={index}
                            className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100"
                          >
                            {item.label}
                          </div>
                        ) : item.to ? (
                          <Link
                            key={index}
                            to={item.to}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <item.icon className="w-4 h-4 mr-2" />
                            {item.label}
                          </Link>
                        ) : (
                          <button
                            key={index}
                            onClick={item.onClick}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <item.icon className="w-4 h-4 mr-2" />
                            {item.label}
                          </button>
                        )
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn btn-outline btn-sm">
              {t('navigation.login')}
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <LanguageSelector />
          <button onClick={toggleMenu} className="text-gray-700">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen py-4 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="container-custom flex flex-col space-y-4">
          <Link 
            to="/" 
            className={`text-base font-medium py-2 transition-colors hover:text-primary-600 ${
              location.pathname === '/' ? 'bg-primary-600 text-white px-4 rounded-lg' : 'text-gray-800'
            }`}
          >
            {t('navigation.home')}
          </Link>
          <Link 
            to="/services" 
            className={`text-base font-medium py-2 transition-colors hover:text-primary-600 ${
              location.pathname === '/services' ? 'bg-primary-600 text-white px-4 rounded-lg' : 'text-gray-800'
            }`}
          >
            {t('navigation.services')}
          </Link>
          <Link 
            to="/partenaires" 
            className={`text-base font-medium py-2 transition-colors hover:text-primary-600 ${
              location.pathname === '/partenaires' ? 'bg-primary-600 text-white px-4 rounded-lg' : 'text-gray-800'
            }`}
          >
            Partenaires
          </Link>

          {/* Mobile Gallery Link */}
          <Link 
            to="/galerie" 
            className={`text-base font-medium py-2 transition-colors hover:text-primary-600 ${
              location.pathname === '/galerie' ? 'bg-primary-600 text-white px-4 rounded-lg' : 'text-gray-800'
            }`}
          >
            Galerie
          </Link>

          <Link 
            to="/a-propos" 
            className={`text-base font-medium py-2 transition-colors hover:text-primary-600 ${
              location.pathname === '/a-propos' ? 'bg-primary-600 text-white px-4 rounded-lg' : 'text-gray-800'
            }`}
          >
            {t('navigation.about')}
          </Link>

          {user ? (
            <div className="border-t border-gray-200 pt-4 space-y-2">
              {/* Show email first */}
              <div className="px-4 py-2 text-sm text-gray-500">
                {user.email}
              </div>
              {profileMenuItems.filter(item => !item.isEmail).map((item, index) => (
                item.to ? (
                  <Link
                    key={index}
                    to={item.to}
                    className="flex items-center py-2 text-gray-700 hover:text-primary-600"
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className="flex items-center w-full py-2 text-gray-700 hover:text-primary-600"
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </button>
                )
              ))}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary w-full">
              {t('navigation.login')}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;