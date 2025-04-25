import { useTranslation } from 'react-i18next'
import styles from './Page.module.scss'

function HowToGo () {
  const { t } = useTranslation()
  return (
    <div className={styles.page}>
      <h2 className='text-3xl font-medium'>{t('can')}</h2>
      <p className='w-200 mt-15 text-xl'>{t('onto')}</p>
      <p className='w-200 mt-15 text-xl relative left-150'>{t('from')}</p>
      <p className='w-200 mt-15 text-xl'>{t('most')}</p>
      <div className='w-full' style={{ marginTop: '5rem' }}>
        <iframe
          src='https://yandex.com/map-widget/v1/?ll=71.9364%2C41.8474&z=10&l=map'
          className='w-full'
          height='600'
          frameBorder='0'
          allowFullScreen
          title='Sary-Chelek map'
        ></iframe>
      </div>
    </div>
  )
}

export default HowToGo
