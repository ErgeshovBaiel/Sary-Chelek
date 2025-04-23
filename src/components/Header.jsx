import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.scss'

function Header () {
  const { t, i18n } = useTranslation()

  const changeLanguage = () => {
    const currentLang = i18n.language
    const nextLang =
      currentLang === 'ru' ? 'en' : currentLang === 'en' ? 'kg' : 'ru'
    i18n.changeLanguage(nextLang)
  }

  const getActiveClass = ({ isActive }) =>
    isActive ? styles.activeLink : ''

  return (
    <div className='w-full fixed top-0 left-0 z-50 bg-[#00695c] shadow-md text-white'>
      <div className='w-[1700px] m-auto h-25 flex items-center justify-between px-4'>
      <div className='flex gap-20'>
        <h1 className='text-3xl relative top-3.5 left-15'>{t('sary-chelek')}</h1>
        <img 
        className='w-8.75 h-8.75 rounded-full relative top-5 left-15'
        src="https://img.freepik.com/free-vector/flat-design-mountain-range-silhouette_23-2150491868.jpg?semt=ais_hybrid&w=740" alt="" />
        <p
          className='font-medium text-[19px] cursor-pointer relative top-5 left-270'
          onClick={changeLanguage}
        >
          {t('language')}
        </p>
      </div>
      <nav className='flex gap-11.25 mt-10 text-[17px] font-normal relative right-75'>
        <NavLink to='/' className={getActiveClass}>{t('chief')}</NavLink>
        <NavLink to='/about' className={getActiveClass}>{t('about')}</NavLink>
        <NavLink to='/history' className={getActiveClass}>{t('history')}</NavLink>
        <NavLink to='/nature' className={getActiveClass}>{t('nature')}</NavLink>
        <NavLink to='/gallery' className={getActiveClass}>{t('gallery')}</NavLink>
        <NavLink to='/how-to-go' className={getActiveClass}>{t('how to go')}</NavLink>
        <NavLink to='/contact' className={getActiveClass}>{t('contact')}</NavLink>
      </nav>
    </div>
    </div>

  )
}

export default Header
