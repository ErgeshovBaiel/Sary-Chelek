import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Page.scss';

function Gallery() {
  const { t, i18n } = useTranslation();

  const images = [
    'https://dwc.kg/wp-content/uploads/2023/10/scale_1200-1-optimized.jpeg',
    'https://www.travelkyrgyzstan.kg/wp-content/uploads/2021/07/sary-chelek_1.jpg',
    'https://mykgstan.com/uploads/images/00/00/14/2015/03/06/7b9fdb.jpg',
    'https://static.wixstatic.com/media/22f040_7b21e626798c4894a353626dd525c830~mv2.jpeg/v1/fill/w_560,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/22f040_7b21e626798c4894a353626dd525c830~mv2.jpeg',
    'https://24.kg/thumbnails/253f7/dc0b1/229915_w_h500_1632990976_r.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjXUwtbVJBfy6nLJN2aRRGTdgFvIhkItbmAg&s',
    'https://wikiway.com/upload/hl-photo/ec3/19a/ozero-sary-chelek_26.jpg',
    'https://map.kg/uploads/posts/2024-01/p1010613.webp',
    'https://www.travelkyrgyzstan.kg/wp-content/uploads/2021/07/sary-chelek_1.jpg',
    'https://tropki.ru/images/excursions/ddb8dba6-ccbb-11ee-a49a-ea809bd85e3a/bishkek-uikend-v-serdtse-kyrgyzstana-otdyh-v-gorah-i-den-na-ozere-sary-chelek.jpg',
    'https://i.ytimg.com/vi/2WuKlpuAPdU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD4Yy99E9jTl6wrPICfEJR3lLv7HQ',
    'https://www.centralasia-travel.com/uploads/gallery/1010/sari-chelek-27.jpg'
  ];

  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
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

  return (
    <motion.div
      className="page flex flex-col items-center min-h-screen py-12 bg-gradient-to-b from-[#e0f7fa] to-[#b2dfdb]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold italic text-[#00695c] mb-4 text-center px-4"
        initial="hidden"
        animate="visible"
        variants={textVariants}
      >
        {t('photos')}
      </motion.h2>
      <motion.p
        className="text-lg sm:text-xl md:text-2xl font-medium italic mt-2 mb-6 sm:mb-8 text-center px-4"
        initial="hidden"
        animate="visible"
        variants={textVariants}
      >
        {t('pictures')}
      </motion.p>

      <motion.div
        className="w-full max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 px-4"
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={30}
          slidesPerView={1}
          className="swiper"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <motion.img
                src={src}
                alt={`Gallery ${index}`}
                className="img rounded-2xl shadow-lg object-cover w-full h-64 sm:h-80 md:h-96"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      <motion.div
        className="language-switcher flex flex-wrap gap-3 sm:gap-4 mt-4 sm:mt-6 md:mt-8 justify-center px-4"
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

export default Gallery;