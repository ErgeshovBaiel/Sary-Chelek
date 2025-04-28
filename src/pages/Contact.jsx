import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import './Page.scss'

function Contact () {
  const { t, i18n } = useTranslation()

  // Language change handler
  const changeLanguage = (newLang) => {
    i18n.changeLanguage(newLang)
    localStorage.setItem('language', newLang) // Save to localStorage
  }

  useEffect(() => {
    const savedLang = localStorage.getItem('language')
    if (savedLang) {
      i18n.changeLanguage(savedLang) // Set saved language
    }
  }, [i18n])

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i = 1) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.6
      }
    })
  }

  const texts = [
    { text: 'visiting', extraClass: '' },
    { text: 'specialize', extraClass: '' },
    { text: 'guides', extraClass: 'relative left-150' },
    { text: 'forget', extraClass: '' },
    { text: 'tour', extraClass: 'relative left-150' }
  ]

  return (
    <div className='page'>
      <div>
        {texts.map((item, index) => (
          <motion.p
            key={item.text}
            className={`text-3xl ${index === 0 ? 'font-medium' : 'w-200 text-xl'} italic mt-15 ${item.extraClass}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
            variants={textVariants}
          >
            {t(item.text)}
          </motion.p>
        ))}
      </div>

      <div className="language-switcher">
        <button onClick={() => changeLanguage('ru')}>RU</button>
        <button onClick={() => changeLanguage('en')}>EN</button>
        <button onClick={() => changeLanguage('kg')}>KG</button>
      </div>
    </div>
  )
}

export default Contact
