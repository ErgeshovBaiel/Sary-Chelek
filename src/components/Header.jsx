import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom'
import './Header.scss'

function Header () {
  const { t, i18n } = useTranslation()
  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, []);
  const changeLanguage = () => {
    const currentLang = i18n.language
    const nextLang =
      currentLang === 'en' ? 'kg' : currentLang === 'kg' ? 'ru' : 'en'
    i18n.changeLanguage(nextLang);
    localStorage.setItem('language', nextLang); 
  }
  const getActiveClass = ({ isActive }) => (isActive ? 'activeLink' : '')

  return (
    <div className='w-full fixed top-0 left-0 z-50 bg-[#00695c] shadow-md text-white'>
      <div className='w-[1700px] m-auto h-25 flex items-center justify-between px-4 pb-5'>
        <div className='flex gap-20'>
          <h1 className='text-3xl relative top-3.5 left-15 italic flex gap-[2px]'>
            {Array.from(t('sary_chelek')).map((char, index) => (
              <span
                key={index}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
                className='animate-bounce-char'
              >
                {char}
              </span>
            ))}
          </h1>
          <img
            className='w-10 h-10 rounded-full relative top-5.25 left-15'
            src='https://sputnik.kg/images//104502/71/1045027171.jpg'
            alt=''
          />
          <p
            className='font-medium text-[19px] cursor-pointer 
            relative top-6.5 left-260 italic'
            onClick={changeLanguage}
          >
            {t('language')}
          </p>
        </div>
        <nav
          className='flex gap-11.25 mt-10 text-[18px] 
        font-normal relative right-75 italic'
        >
          <NavLink to='/' className={getActiveClass}>
            {t('main')}
          </NavLink>
          <NavLink to='/about' className={getActiveClass}>
            {t('about')}
          </NavLink>
          <NavLink to='/history' className={getActiveClass}>
            {t('history')}
          </NavLink>
          <NavLink to='/nature' className={getActiveClass}>
            {t('nature')}
          </NavLink>
          <NavLink to='/gallery' className={getActiveClass}>
            {t('gallery')}
          </NavLink>
          <NavLink to='/how-to-go' className={getActiveClass}>
            {t('how to go')}
          </NavLink>
          <NavLink to='/contact' className={getActiveClass}>
            {t('contact')}
          </NavLink>
        </nav>
      </div>
    </div>
  )
}

export default Header
