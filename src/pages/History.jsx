import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import './Page.scss'

function History () {
  const { t, i18n } = useTranslation()

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
  
  const changeLanguage = (newLang) => {
    i18n.changeLanguage(newLang)
    localStorage.setItem('language', newLang)
  }

  useEffect(() => {
    const savedLang = localStorage.getItem('language')
    if (savedLang) {
      i18n.changeLanguage(savedLang)
    }
  }, [i18n])

  return (
    <div className="page">
      <div>
        <motion.h2
          className='text-3xl font-medium italic'
          initial="hidden"
          animate="visible"
          custom={0}
          variants={textVariants}
        >
          {t('the')}
        </motion.h2>

        {[
          'story',
          'first',
          'era',
          'tourism',
          'issues',
          'status',
          'brief'
        ].map((key, index) => (
          <motion.p
            key={key}
            className={`w-200 mt-15 text-xl italic ${index % 2 !== 0 ? 'relative left-150' : ''}`}
            initial="hidden"
            animate="visible"
            custom={index + 1}
            variants={textVariants}
          >
            {t(key)}
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

export default History
