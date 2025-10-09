import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import './Page.scss';

function History() {
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

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  const infoKeys = [
    'story',
    'first',
    'era',
    'tourism',
    'issues',
    'status',
    'brief',
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
          {t('the')}
        </motion.h2>

        {infoKeys.map((key, index) => (
          <motion.p
            key={key}
            className={`text-base sm:text-lg md:text-xl italic mb-4 sm:mb-5 md:mb-7 px-2 ${
              index % 2 !== 0
                ? 'md:pl-12 lg:pl-24 text-left md:text-right'
                : 'md:pr-12 lg:pr-24 text-left'
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
    </motion.div>
  );
}

export default History;
