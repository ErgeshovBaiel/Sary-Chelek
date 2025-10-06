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
        className='text-2xl sm:text-3xl md:text-4xl font-medium italic px-4'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {t('welcome to sary-chelek')}
      </motion.h2>

      <motion.p
        className='text-lg sm:text-xl md:text-2xl mt-4 sm:mt-5 font-medium italic px-4'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {t('beautiful')}
      </motion.p>

      <img
        className="image w-full max-w-[90%] sm:max-w-[80%] md:max-w-[900px] h-auto sm:h-[400px] md:h-[600px]"
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
