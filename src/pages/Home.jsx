import { useTranslation } from 'react-i18next'
import styles from './Page.module.scss'
import About from './About'
import History from './History'
import Nature from './Nature'
import Gallery from './Gallery'
import HowToGo from './HowToGo'
import Contact from './Contact'

function Home () {
  const { t } = useTranslation()

  return (
    <div className={styles.page}>
      <h2 className='text-3xl font-medium italic'>{t('welcome to sary-chelek')}</h2>
      <p className='text-2xl mt-5 font-medium italic'>{t('beautiful')}</p>
      <img
        className={styles.image}
        src='https://concept.kg/media/cache/3b/1c/3b1c199419217bbce8f50f065db361b1.jpg'
        alt='Сары-Челек'
      />
      <About />
      <History />
      <Nature />
      <Gallery />
      <HowToGo />
      <Contact />
    </div>
  )
}

export default Home
