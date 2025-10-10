import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, Languages } from 'lucide-react'
import './ExitButton.scss'

function ExitButton ({ onLogout }) {
  const { t, i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState('ru')
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'ru'
    setCurrentLanguage(savedLang)
    if (savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang)
    }
  }, [i18n])

  const handleLanguageSwitch = () => {
    const newLang = currentLanguage === 'kg' ? 'ru' : 'kg'
    setCurrentLanguage(newLang)
    i18n.changeLanguage(newLang)
    localStorage.setItem('language', newLang)
  }

  const handleExit = () => {
    // Clear all registration data
    localStorage.removeItem('isRegistered')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('language')

    // Call the logout function passed from parent
    onLogout()
  }

  return (
    <motion.div
      className='exit-button-container'
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Language Switcher */}
      <motion.button
        className='language-switcher'
        onClick={handleLanguageSwitch}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Languages size={20} />
        <motion.span
          className='lang-text'
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : -10
          }}
          transition={{ duration: 0.2 }}
        >
          {currentLanguage === 'kg' ? 'RU' : 'KG'}
        </motion.span>
      </motion.button>

      {/* Exit Button */}
      <motion.button
        className='exit-button'
        onClick={handleExit}
        whileHover={{
          scale: 1.05,
          y: -2,
          boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)'
        }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className='exit-button-content'
          animate={{
            x: isHovered ? -5 : 0
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className='exit-icon-wrapper'
            animate={{
              rotate: isHovered ? 15 : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.2 }}
          >
            <LogOut size={20} />
          </motion.div>

          <motion.span
            className='exit-text'
            animate={{
              opacity: isHovered ? 1 : 0.8,
              x: isHovered ? 5 : 0
            }}
            transition={{ duration: 0.2 }}
          >
            {t('back_to_registration')}
          </motion.span>
        </motion.div>

        {/* Animated background effect */}
        <motion.div
          className='exit-button-bg'
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </motion.div>
  )
}

export default ExitButton
