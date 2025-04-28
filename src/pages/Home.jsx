import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import './Page.scss'
import About from './About'
import History from './History'
import Nature from './Nature'
import Gallery from './Gallery'
import HowToGo from './HowToGo'
import Contact from './Contact'

function Home () {
  const { t, i18n } = useTranslation()

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
      <motion.h2
        className='text-3xl font-medium italic'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {t('welcome to sary-chelek')}
      </motion.h2>

      <motion.p
        className='text-2xl mt-5 font-medium italic'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {t('beautiful')}
      </motion.p>

      <img
        className="image"
        src='https://concept.kg/media/cache/3b/1c/3b1c199419217bbce8f50f065db361b1.jpg'
        alt='Сары-Челек'
      />

      <About />
      <History />
      <Nature />
      <Gallery />
      <HowToGo />
      <Contact />

      <div className="language-switcher">
        <button onClick={() => changeLanguage('ru')}>RU</button>
        <button onClick={() => changeLanguage('en')}>EN</button>
        <button onClick={() => changeLanguage('kg')}>KG</button>
      </div>
    </div>
  )
}

export default Home
