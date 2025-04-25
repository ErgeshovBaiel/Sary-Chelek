import { useTranslation } from 'react-i18next'
import styles from './Page.module.scss'

function Contact () {
  const { t } = useTranslation()
  return (
    <div className={styles.page}>
      <div>
        <h2 className='text-3xl font-medium italic'>{t('visiting')}</h2>
        <p className='w-200 mt-15 text-xl italic'>{t('specialize')}</p>
        <p className='w-200 mt-15 text-xl italic relative left-150'>{t('guides')}</p>
        <p className='w-200 mt-15 text-xl italic'>{t('forget')}</p>
        <p className='w-200 mt-15 text-xl italic relative left-150'>{t('tour')}</p>
      </div>
    </div>
  )
}

export default Contact
