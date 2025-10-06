import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.scss';

function Header() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [i18n]);

  const changeLanguage = () => {
    const currentLang = i18n.language;
    const nextLang =
      currentLang === 'en' ? 'kg' : currentLang === 'kg' ? 'ru' : 'en';
    i18n.changeLanguage(nextLang);
    localStorage.setItem('language', nextLang);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const getActiveClass = ({ isActive }) =>
    isActive ? 'activeLink nav-link' : 'nav-link';

  return (
    <header className={`w-full fixed top-0 left-0 z-50 bg-[#00695c] shadow-md text-white transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'
      }`}>
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
          <h1 className="text-xl sm:text-2xl md:text-3xl italic flex gap-1">
            {Array.from(t('sary_chelek')).map((char, index) => (
              <span
                key={index}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
                className="animate-bounce-char"
              >
                {char}
              </span>
            ))}
          </h1>
          <img
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
            src="https://sputnik.kg/images//104502/71/1045027171.jpg"
            alt={t('sary_chelek')}
          />
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="w-full md:hidden mt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <nav className="flex flex-col gap-3 text-base font-normal italic">
                {[
                  { to: '/', text: t('main') },
                  { to: '/about', text: t('about') },
                  { to: '/history', text: t('history') },
                  { to: '/nature', text: t('nature') },
                  { to: '/gallery', text: t('gallery') },
                  { to: '/how-to-go', text: t('how to go') },
                  { to: '/contact', text: t('contact') },
                ].map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `block py-2 px-4 rounded-md transition-all duration-200 ${
                          isActive ? 'bg-[#004d40]' : 'hover:bg-[#00796b]'
                        }`
                      }
                      onClick={closeMenu}
                    >
                      {item.text}
                    </NavLink>
                  </motion.div>
                ))}
                <motion.button
                  className="font-medium text-base cursor-pointer italic bg-[#004d40] hover:bg-[#00796b] py-2 px-4 rounded-md transition-all duration-200 mt-2"
                  onClick={changeLanguage}
                  aria-label={t('change_language')}
                  type="button"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('language')}
                </motion.button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-base lg:text-lg font-normal italic">
          <NavLink to="/" className={getActiveClass} end>
            {t('main')}
          </NavLink>
          <NavLink to="/about" className={getActiveClass}>
            {t('about')}
          </NavLink>
          <NavLink to="/history" className={getActiveClass}>
            {t('history')}
          </NavLink>
          <NavLink to="/nature" className={getActiveClass}>
            {t('nature')}
          </NavLink>
          <NavLink to="/gallery" className={getActiveClass}>
            {t('gallery')}
          </NavLink>
          <NavLink to="/how-to-go" className={getActiveClass}>
            {t('how to go')}
          </NavLink>
          <NavLink to="/contact" className={getActiveClass}>
            {t('contact')}
          </NavLink>
          <motion.button
            className="font-medium text-base lg:text-lg cursor-pointer italic bg-transparent border-none outline-none hover:opacity-80 transition-opacity"
            onClick={changeLanguage}
            aria-label={t('change_language')}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('language')}
          </motion.button>
        </nav>
      </div>
    </header>
  );
}

export default Header;