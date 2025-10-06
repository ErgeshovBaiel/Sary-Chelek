import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './Footer.scss';

function Footer() {
  const { t } = useTranslation();

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {t('rights')}
      </motion.p>
    </motion.footer>
  );
}

export default Footer;
