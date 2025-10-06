import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import './Page.scss';

function Nature() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (newLang) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i = 1) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        type: 'spring',
        stiffness: 60,
      },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i = 1) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        type: 'spring',
        stiffness: 60,
      },
    }),
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, boxShadow: '0px 4px 16px rgba(0,0,0,0.15)' },
    tap: { scale: 0.95 },
  };

  const items = [
    { text: 'located', img: 'https://manas.su/assets/images/see_place/Sary-chelek.jpg', textFirst: true },
    { text: 'unique', img: 'https://www.centralasia-travel.com/upload/tiles/sari-chelek-mice-708.jpg', textFirst: false },
    { text: 'abundance', img: 'https://i.ytimg.com/vi/3oMzYNjDguY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBOWhevRiAso2SFeXp2AYdonXLY1A', textFirst: true },
    { text: 'contains', img: 'https://eastroute.com/wp-content/uploads/2019/06/Mt-Cook-Lily-and-Mt-Cook-Fraser-Gunn_croped.jpg', textFirst: false },
    { text: 'designated', img: 'https://cdn-1.aki.kg/cdn-st-0/qdN/L/2018998.deeff05c72df71e082faeb9fa6680150.500.jpg', textFirst: true },
    { text: 'hiking', img: 'https://akademiya-gornih-turov.ru/wp-content/uploads/free/fons/other/set00/free-fons-other-set00-05.jpg', textFirst: false }
  ];

  return (
    <motion.div
      className="page flex flex-col items-center min-h-screen py-12 bg-gradient-to-b from-[#e0f7fa] to-[#b2dfdb]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold italic text-[#00695c] mb-6 sm:mb-8 text-center px-4"
        initial="hidden"
        animate="visible"
        custom={0}
        variants={textVariants}
      >
        {t('of')}
      </motion.h2>

      <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 sm:gap-8 md:gap-10 px-4">
        {items.map((item, index) => (
          <div
            key={item.text}
            className={`flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12 lg:gap-20 ${
              index % 2 === 0 ? '' : 'md:flex-row-reverse'
            }`}
          >
            {item.textFirst && (
              <motion.p
                className="text-base sm:text-lg md:text-xl italic mb-4 md:mb-0 md:w-1/2 text-center md:text-left"
                initial="hidden"
                animate="visible"
                custom={index + 1}
                variants={textVariants}
              >
                {t(item.text)}
              </motion.p>
            )}

            <motion.img
              className="w-full sm:w-4/5 md:w-96 h-48 sm:h-56 object-cover rounded-2xl shadow-lg"
              src={item.img}
              alt={t(item.text)}
              initial="hidden"
              animate="visible"
              custom={index + 1}
              variants={imageVariants}
            />

            {!item.textFirst && (
              <motion.p
                className="text-base sm:text-lg md:text-xl italic mb-4 md:mb-0 md:w-1/2 text-center md:text-left"
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

      <motion.div
        className="language-switcher flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-10 justify-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        {['ru', 'en', 'kg'].map((lang) => (
          <motion.button
            key={lang}
            onClick={() => changeLanguage(lang)}
            className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-semibold shadow-md transition-colors duration-200 ${
              i18n.language === lang
                ? 'bg-[#00695c] text-white'
                : 'bg-white text-[#00695c] hover:bg-[#b2dfdb]'
            }`}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            {lang.toUpperCase()}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Nature;