import { useTranslation } from 'react-i18next'
import styles from './Page.module.scss'

function Nature () {
  const { t } = useTranslation()
  return (
    <div className={styles.page}>
      <h2 className='text-3xl font-medium'>{t('of')}</h2>
      <div className='ml-25'>
        <div className='flex gap-35 mt-10'>
          <p className='w-200 mt-15 text-xl'>{t('located')}</p>
          <img
            className='w-55 h-35  rounded-2xl relative top-10'
            src='https://manas.su/assets/images/see_place/Sary-chelek.jpg'
            alt=''
          />
        </div>
        <div className='flex gap-35 mt-10'>
          <img
            className='w-55 h-35  rounded-2xl relative top-10'
            src='https://www.centralasia-travel.com/upload/tiles/sari-chelek-mice-708.jpg'
            alt=''
          />
          <p className='w-200 mt-15 text-xl'>{t('unique')}</p>
        </div>
        <div className='flex gap-35 mt-10'>
          <p className='w-200 mt-15 text-xl'>{t('abundance')}</p>
          <img
            className='w-55 h-35  rounded-2xl relative top-10'
            src='https://i.ytimg.com/vi/3oMzYNjDguY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBOWhevRiAso2SFeXp2AYdonXLY1A'
            alt=''
          />
        </div>
        <div className='flex gap-35 mt-10'>
          <img
            className='w-55 h-35  rounded-2xl relative top-10'
            src='https://eastroute.com/wp-content/uploads/2019/06/Mt-Cook-Lily-and-Mt-Cook-Fraser-Gunn_croped.jpg'
            alt=''
          />
          <p className='w-200 mt-15 text-xl'>{t('contains')}</p>
        </div>
        <div className='flex gap-35 mt-10'>
          <p className='w-200 mt-15 text-xl'>{t('designated')}</p>
          <img
            className='w-55 h-35  rounded-2xl relative top-10'
            src='https://cdn-1.aki.kg/cdn-st-0/qdN/L/2018998.deeff05c72df71e082faeb9fa6680150.500.jpg'
            alt=''
          />
        </div>
        <div className='flex gap-35 mt-10'>
          <img
            className='w-55 h-35  rounded-2xl relative top-10'
            src='https://akademiya-gornih-turov.ru/wp-content/uploads/free/fons/other/set00/free-fons-other-set00-05.jpg'
            alt=''
          />
          <p className='w-200 mt-15 text-xl'>{t('hiking')}</p>
        </div>
      </div>
    </div>
  )
}

export default Nature
