import { useTranslation } from 'react-i18next'
import './Footer.scss'

function Footer () {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <p>{t('rights')}</p>
    </footer>
  )
}

export default Footer
