import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import './Page.scss';

function About() {
  const { t, i18n } = useTranslation();

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, boxShadow: '0px 6px 20px rgba(0,0,0,0.2)' },
    tap: { scale: 0.95 },
  };

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

  const infoKeys = [
    'full',
    'natural',
    'research',
    'horseback',
    'rules',
    'acquainted',
  ];

  return (
    <motion.div
      className="page flex flex-col items-center min-h-screen py-12 bg-gradient-to-b from-[#e0f7fa] to-[#b2dfdb]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div
        className="w-full max-w-3xl bg-white bg-opacity-90 rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 mx-4 backdrop-blur-sm"
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold italic text-[#00695c] mb-6 sm:mb-8 text-center"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={textVariants}
        >
          {t('information')}
        </motion.h2>

        {infoKeys.map((key, index) => (
          <motion.p
            key={key}
            className={`text-base sm:text-lg md:text-xl italic mb-4 sm:mb-5 md:mb-7 px-2 ${
              index % 2 !== 0 ? 'md:pl-12 lg:pl-24 text-left md:text-right' : 'md:pr-12 lg:pr-24 text-left'
            }`}
            initial="hidden"
            animate="visible"
            custom={index + 1}
            variants={textVariants}
          >
            {t(key)}
          </motion.p>
        ))}
      </motion.div>

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
            aria-label={`Switch to ${lang.toUpperCase()}`}
          >
            {lang.toUpperCase()}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default About;