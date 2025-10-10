import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import './Contact.scss'

function Contact () {
  const { t, i18n } = useTranslation()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedLang = localStorage.getItem('language')
    if (savedLang) i18n.changeLanguage(savedLang)

    // Simulate loading for better animation timing
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [i18n])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
      rotateX: -15
    },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  }

  const heroVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.8,
      rotateY: -20
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.5
      }
    }
  }

  const texts = [
    { text: 'visiting', type: 'hero' },
    { text: 'specialize', type: 'regular' },
    { text: 'guides', type: 'indented' },
    { text: 'forget', type: 'regular' },
    { text: 'tour', type: 'indented' }
  ]

  if (!isLoaded) {
    return (
      <div className='contact-page'>
        <div className='contact-loading'>
          <div className='loading-spinner'></div>
        </div>
      </div>
    )
  }

  return (
    <div className='contact-page'>
      {/* Decorative Elements */}
      <div className='contact-decoration decoration-1'></div>
      <div className='contact-decoration decoration-2'></div>
      <div className='contact-decoration decoration-3'></div>
      <div className='contact-decoration decoration-4'></div>

      <div className='contact-content'>
        <motion.div
          className='contact-text'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          <AnimatePresence mode='wait'>
            {texts.map((item, index) => (
              <motion.p
                key={item.text}
                className={`contact-text-item ${
                  item.type === 'hero'
                    ? 'contact-hero'
                    : item.type === 'indented'
                    ? 'contact-indented'
                    : 'contact-regular'
                }`}
                variants={item.type === 'hero' ? heroVariants : textVariants}
                custom={index}
                whileHover={{
                  scale: item.type === 'hero' ? 1.02 : 1.05,
                  y: item.type === 'hero' ? 0 : -5
                }}
                whileTap={{ scale: 0.98 }}
              >
                {t(item.text)}
              </motion.p>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact
