import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Auth from './Auth'
import './Header.scss'

function Header () {
  const { t, i18n } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  useEffect(() => {
    const savedLang = localStorage.getItem('language')
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang)
    }

    // Check if user is registered
    const registered = localStorage.getItem('isRegistered')

    if (registered === 'true') {
      setIsRegistered(true)
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 10)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [i18n])

  const changeLanguage = () => {
    const currentLang = i18n.language
    const nextLang = currentLang === 'kg' ? 'ru' : 'kg'
    i18n.changeLanguage(nextLang)
    localStorage.setItem('language', nextLang)
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const toggleAuth = () => setIsAuthOpen(!isAuthOpen)
  const closeAuth = () => setIsAuthOpen(false)

  const getActiveClass = ({ isActive }) =>
    isActive ? 'activeLink nav-link' : 'nav-link'

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className='header-container'>
          <div className='logo-section'>
            <button
              className='menu-toggle'
              onClick={toggleMenu}
              aria-label='Toggle menu'
            >
              <svg
                className='icon'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16m-7 6h7'
                  />
                )}
              </svg>
            </button>
            <div className='logo-text'>
              <motion.div
                className='logo-wrapper'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <h1 className='logo-title'>
                  {Array.from(t('sary_chelek')).map((char, index) => (
                    <motion.span
                      key={index}
                      className='animate-char'
                      initial={{ opacity: 0, y: 20, rotateX: -90 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        rotateX: 0
                      }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.5,
                        ease: 'easeOut'
                      }}
                      whileHover={{
                        scale: 1.2,
                        color: '#f59e0b',
                        rotate: [0, -10, 10, -10, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </h1>
                <motion.div
                  className='logo-underline'
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.8, duration: 0.8, ease: 'easeInOut' }}
                />
              </motion.div>
              <motion.img
                className='logo-img'
                src='https://sputnik.kg/images//104502/71/1045027171.jpg'
                alt={t('sary_chelek')}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  type: 'spring',
                  stiffness: 200,
                  damping: 15
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  transition: { duration: 0.6 }
                }}
              />
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                className='mobile-menu'
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {[
                  { to: '/', text: t('main') },
                  { to: '/about', text: t('about') },
                  { to: '/history', text: t('history') },
                  { to: '/nature', text: t('nature') },
                  { to: '/gallery', text: t('gallery') },
                  { to: '/how-to-go', text: t('how to go') },
                  { to: '/contact', text: t('contact') }
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
                        `mobile-nav-link ${isActive ? 'active' : ''}`
                      }
                      onClick={closeMenu}
                    >
                      {item.text}
                    </NavLink>
                  </motion.div>
                ))}
                {!isRegistered && (
                  <motion.button
                    className='auth-btn'
                    onClick={() => {
                      toggleAuth()
                      closeMenu()
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35, duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign In / Sign Up
                  </motion.button>
                )}
              </motion.nav>
            )}
          </AnimatePresence>

          {/* Desktop Menu */}
          <nav className='desktop-menu'>
            <NavLink to='/' className={getActiveClass} end>
              {t('main')}
            </NavLink>
            <NavLink to='/about' className={getActiveClass}>
              {t('about')}
            </NavLink>
            <NavLink to='/history' className={getActiveClass}>
              {t('history')}
            </NavLink>
            <NavLink to='/nature' className={getActiveClass}>
              {t('nature')}
            </NavLink>
            <NavLink to='/gallery' className={getActiveClass}>
              {t('gallery')}
            </NavLink>
            <NavLink to='/how-to-go' className={getActiveClass}>
              {t('how to go')}
            </NavLink>
            <NavLink to='/contact' className={getActiveClass}>
              {t('contact')}
            </NavLink>

            {!isRegistered && (
              <motion.button
                className='auth-btn'
                onClick={toggleAuth}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In / Sign Up
              </motion.button>
            )}

            <motion.button
              className='lang-btn'
              onClick={changeLanguage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('language')}
            </motion.button>
          </nav>
          {/* Language toggle inside mobile menu when open */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className='mobile-lang-wrapper'
            >
              <button
                className='lang-btn mobile'
                onClick={() => {
                  changeLanguage()
                }}
              >
                {t('language')}
              </button>
            </motion.div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      <AnimatePresence>
        {isAuthOpen && <Auth closeAuth={closeAuth} />}
      </AnimatePresence>
    </>
  )
}

export default Header
