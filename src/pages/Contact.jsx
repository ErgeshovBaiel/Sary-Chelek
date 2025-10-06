import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './Page.scss';

function Contact() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (newLang) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang) i18n.changeLanguage(savedLang);
  }, [i18n]);

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i = 1) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  const texts = [
    { text: 'visiting' },
    { text: 'specialize' },
    { text: 'guides' },
    { text: 'forget' },
    { text: 'tour' }
  ];

  return (
    <div className='page'>
      <div className="px-4">
        {texts.map((item, index) => (
          <motion.p
            key={item.text}
            className={`${
              index === 0 
                ? 'text-2xl sm:text-3xl md:text-4xl font-medium' 
                : 'text-base sm:text-lg md:text-xl'
            } italic mt-8 sm:mt-12 md:mt-15 ${
              index === 2 || index === 4 ? 'md:ml-32 lg:ml-40' : ''
            }`}
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

      <motion.div
        className="language-switcher flex flex-wrap gap-3 sm:gap-4 mt-8 justify-center px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {['ru', 'en', 'kg'].map((lang, index) => (
          <motion.button
            key={lang}
            className="px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-semibold shadow-md bg-[#00695c] text-white hover:bg-[#004d40] transition-colors"
            onClick={() => changeLanguage(lang)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            {lang.toUpperCase()}
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}

export default Contact
