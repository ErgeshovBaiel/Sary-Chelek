import { useTranslation } from 'react-i18next'
import styles from './Page.module.scss'

function History () {
  const { t } = useTranslation()
  return (
    <div className={styles.page}>
      <div>
        <h2 className='text-3xl font-medium italic'>{t('the')}</h2>
        <p className='w-200 mt-15 text-xl italic'>{t('story')}</p>
        <p className='w-200 mt-15 text-xl italic relative left-150'>{t('first')}</p>
        <p className='w-200 mt-15 text-xl italic'>{t('era')}</p>
        <p className='w-200 mt-15 text-xl italic relative left-150'>{t('tourism')}</p>
        <p className='w-200 mt-15 text-xl italic'>{t('issues')}</p>
        <p className='w-200 mt-15 text-xl italic relative left-150'>{t('status')}</p>
        <p className='w-200 mt-15 text-xl italic'>{t('brief')}</p>
      </div>
    </div>
  )
}

export default History
