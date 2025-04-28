import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import './Page.scss'

function HowToGo () {
  const { t, i18n } = useTranslation()

  // Save language preference to localStorage
  const changeLanguage = (newLang) => {
    i18n.changeLanguage(newLang)
    localStorage.setItem('language', newLang)
  }

  // Load the saved language preference on component mount
  useEffect(() => {
    const savedLang = localStorage.getItem('language')
    if (savedLang) {
      i18n.changeLanguage(savedLang)
    }
  }, [i18n])

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.6
      }
    })
  }

  const texts = [
    { key: 'onto', className: 'w-200 mt-15 text-xl italic' },
    { key: 'from', className: 'w-200 mt-15 text-xl italic relative left-150' },
    { key: 'most', className: 'w-200 mt-15 text-xl italic' }
  ]

  return (
    <div className="page">
      <motion.h2
        className='text-3xl font-medium italic'
        initial="hidden"
        animate="visible"
        custom={0}
        variants={textVariants}
      >
        {t('can')}
      </motion.h2>

      {texts.map((item, index) => (
        <motion.p
          key={item.key}
          className={item.className}
          initial="hidden"
          animate="visible"
          custom={index + 1}
          variants={textVariants}
        >
          {t(item.key)}
        </motion.p>
      ))}

      <div className='w-full' style={{ marginTop: '5rem' }}>
        <iframe
          src='https://yandex.com/map-widget/v1/?ll=71.9364%2C41.8474&z=10&l=map'
          className='w-full'
          height='600'
          frameBorder='0'
          allowFullScreen
          title='Sary-Chelek map'
        ></iframe>
      </div>

      <div className="language-switcher">
        <button onClick={() => changeLanguage('ru')}>RU</button>
        <button onClick={() => changeLanguage('en')}>EN</button>
        <button onClick={() => changeLanguage('kg')}>KG</button>
      </div>
    </div>
  )
}

export default HowToGo
