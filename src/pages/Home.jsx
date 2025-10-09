import { motion } from 'framer-motion';
import './Page.scss';
import About from './About';
import History from './History';
import Nature from './Nature';
import Gallery from './Gallery';
import HowToGo from './HowToGo';
import Contact from './Contact';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();

  return (
    <div className="page pt-6 pb-8">
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-medium italic px-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {t('welcome to sary-chelek')}
      </motion.h2>

      <motion.p
        className="text-lg sm:text-xl md:text-2xl mt-4 sm:mt-5 font-medium italic px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      >
        {t('beautiful')}
      </motion.p>

      <motion.img
        className="image w-full max-w-[90%] sm:max-w-[80%] md:max-w-[900px] h-auto sm:h-[400px] md:h-[600px] mx-auto rounded-xl shadow-lg"
        src="https://concept.kg/media/cache/3b/1c/3b1c199419217bbce8f50f065db361b1.jpg"
        alt="Сары-Челек"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        whileHover={{ scale: 1.02 }}
      />

      <About />
      <History />
      <Nature />
      <Gallery />
      <HowToGo />
      <Contact />
    </div>
  );
}

export default Home;
