import { useTranslation } from 'react-i18next'
import styles from './Page.module.scss'

function History () {
  const { t } = useTranslation()
  return (
    <div className={styles.page}>
      <div>
        <h2 className='text-3xl font-medium'>{t('the')}</h2>
        <p className='w-200 mt-15 text-xl'>{t('story')}</p>
        <p className='w-200 mt-15 text-xl relative left-150'>{t('first')}</p>
        <p className='w-200 mt-15 text-xl'>{t('era')}</p>
        <p className='w-200 mt-15 text-xl relative left-150'>{t('tourism')}</p>
        <p className='w-200 mt-15 text-xl'>{t('issues')}</p>
        <p className='w-200 mt-15 text-xl relative left-150'>{t('status')}</p>
        <p className='w-200 mt-15 text-xl'>{t('brief')}</p>
      </div>
    </div>
  )
}

export default History
