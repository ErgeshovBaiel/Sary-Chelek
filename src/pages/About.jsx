import { useTranslation } from 'react-i18next'
import styles from './Page.module.scss'

function About () {
  const { t } = useTranslation()
  return (
    <div className={styles.page}>
      <div>
        <h2 className='text-3xl font-medium'>{t('information')}</h2>
        <p className='w-200 mt-15 text-xl'>{t('full')}</p>
        <p className='w-200 mt-15 text-xl relative left-150'>{t('natural')}</p>
        <p className='w-200 mt-15 text-xl'>{t('research')}</p>
        <p className='w-200 mt-15 text-xl relative left-150'>{t('horseback')}</p>
        <p className='w-200 mt-15 text-xl'>{t('rules')}</p>
        <p className='w-200 mt-15 text-xl relative left-150'>{t('acquainted')}</p>
      </div>
    </div>
  )
}

export default About
