import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import './Page.scss'

function Nature () {
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

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i = 1) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.6
      }
    })
  }

  return (
    <div className="page">
      <motion.h2
        className='text-3xl font-medium italic'
        initial="hidden"
        animate="visible"
        custom={0}
        variants={textVariants}
      >
        {t('of')}
      </motion.h2>

      <div className='ml-25'>
        {[
          { text: 'located', img: 'https://manas.su/assets/images/see_place/Sary-chelek.jpg', textFirst: true },
          { text: 'unique', img: 'https://www.centralasia-travel.com/upload/tiles/sari-chelek-mice-708.jpg', textFirst: false },
          { text: 'abundance', img: 'https://i.ytimg.com/vi/3oMzYNjDguY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBOWhevRiAso2SFeXp2AYdonXLY1A', textFirst: true },
          { text: 'contains', img: 'https://eastroute.com/wp-content/uploads/2019/06/Mt-Cook-Lily-and-Mt-Cook-Fraser-Gunn_croped.jpg', textFirst: false },
          { text: 'designated', img: 'https://cdn-1.aki.kg/cdn-st-0/qdN/L/2018998.deeff05c72df71e082faeb9fa6680150.500.jpg', textFirst: true },
          { text: 'hiking', img: 'https://akademiya-gornih-turov.ru/wp-content/uploads/free/fons/other/set00/free-fons-other-set00-05.jpg', textFirst: false }
        ].map((item, index) => (
          <div key={item.text} className='flex gap-35 mt-10'>
            {item.textFirst && (
              <motion.p
                className='w-200 mt-15 text-xl italic'
                initial="hidden"
                animate="visible"
                custom={index + 1}
                variants={textVariants}
              >
                {t(item.text)}
              </motion.p>
            )}

            <motion.img
              className='w-55 h-35 rounded-2xl relative top-10'
              src={item.img}
              alt=''
              initial="hidden"
              animate="visible"
              custom={index + 1}
              variants={imageVariants}
            />

            {!item.textFirst && (
              <motion.p
                className='w-200 mt-15 text-xl italic'
                initial="hidden"
                animate="visible"
                custom={index + 1}
                variants={textVariants}
              >
                {t(item.text)}
              </motion.p>
            )}
          </div>
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

export default Nature
