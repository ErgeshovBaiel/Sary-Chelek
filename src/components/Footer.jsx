import { useTranslation } from 'react-i18next'
import styles from './Footer.module.scss'

function Footer () {
  const { t } = useTranslation()

  return (
    <footer className={styles.footer}>
      <p>{t('rights')}</p>
    </footer>
  )
}

export default Footer
