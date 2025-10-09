import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './Page.scss';

function HowToGo() {
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
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  const texts = [
    { key: 'onto' },
    { key: 'from' },
    { key: 'most' }
  ];

  return (
    <div className="page">
      <motion.h2
        className='text-2xl sm:text-3xl md:text-4xl font-medium italic px-4'
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
          className={`text-base sm:text-lg md:text-xl italic mt-8 sm:mt-12 md:mt-15 px-4 ${
            index === 1 ? 'md:ml-32 lg:ml-40' : ''
          }`}
          initial="hidden"
          animate="visible"
          custom={index + 1}
          variants={textVariants}
        >
          {t(item.key)}
        </motion.p>
      ))}

      <motion.div
        className='w-full px-4'
        style={{ marginTop: '3rem' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <iframe
          src='https://yandex.com/map-widget/v1/?ll=71.9364%2C41.8474&z=10&l=map'
          className='w-full rounded-lg shadow-2xl'
          height='400'
          style={{ height: '400px', minHeight: '300px' }}
          frameBorder='0'
          allowFullScreen
          title='Sary-Chelek map'
        />
      </motion.div>
    </div>
  );
}

export default HowToGo;
