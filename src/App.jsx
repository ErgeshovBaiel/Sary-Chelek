import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import History from './pages/History'
import Nature from './pages/Nature'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import HowToGo from './pages/HowToGo'
import Auth from './components/Auth'
import RegistrationGate from './components/RegistrationGate'
import Music from './components/music/Music'

function App () {
  const [isRegistered, setIsRegistered] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    // Check if user is already registered
    const registered = localStorage.getItem('isRegistered')
    const currentUser = localStorage.getItem('currentUser')
    const shouldShowSuccess = localStorage.getItem('showSuccess') === 'true'

    let timer
    if (registered === 'true' && currentUser) {
      setIsRegistered(true)
      // Always show success message for 2 seconds on entry
      setShowSuccess(true)
      timer = setTimeout(() => {
        setShowSuccess(false)
        localStorage.removeItem('showSuccess')
      }, 2000)
    } else if (shouldShowSuccess) {
      setShowSuccess(true)
      timer = setTimeout(() => {
        setShowSuccess(false)
        localStorage.removeItem('showSuccess')
      }, 2000)
    }

    setIsLoading(false)
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [])

  const handleRegistrationComplete = () => {
    localStorage.setItem('showSuccess', 'true')
    localStorage.setItem('showHeaderSuccess', 'true')
    setIsRegistered(true)
    setShowSuccess(true)
  }

  const handleLogout = () => {
    // Clear all registration data
    localStorage.removeItem('isRegistered')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('showSuccess')
    localStorage.removeItem('showHeaderSuccess')
    localStorage.removeItem('language')

    // Reset state and return to registration
    setIsRegistered(false)
    setShowSuccess(false)
  }

  if (isLoading) {
    return null // Or a loading spinner
  }

  if (!isRegistered) {
    return (
      <RegistrationGate onRegistrationComplete={handleRegistrationComplete} />
    )
  }

  return (
    <Router>
      <Music />
      <div>
        {showSuccess && (
          <div className='success-banner' role='status'>
            <div className='success-content'>
              <span className='success-icon' aria-hidden='true'>
                ✓
              </span>
              <span className='success-text'>{t('registration_success')}</span>
            </div>
            <button
              className='success-close'
              aria-label='Close and logout'
              title={t('logout')}
              onClick={handleLogout}
            >
              ✕
              <span className='success-close-label'>
                {t('back_to_registration')}
              </span>
            </button>
          </div>
        )}
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/history' element={<History />} />
            <Route path='/nature' element={<Nature />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/how-to-go' element={<HowToGo />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/auth' element={<Auth />} />
          </Routes>
        </main>
        <Footer />
        {/* Global Exit Button */}
        <button
          className='exit-button'
          aria-label='Exit site'
          onClick={() => {
            // Attempt to close the window; fall back to navigating away
            const win = window.open('', '_self')
            if (win && typeof win.close === 'function') {
              win.close()
            }
            if (!document.hidden) {
              window.location.href = 'about:blank'
            }
          }}
        >
          <span className='exit-inner'>
            <span className='exit-icon' aria-hidden='true'>
              &#10005;
            </span>
            <span className='exit-label'>Exit</span>
          </span>
        </button>
      </div>
    </Router>
  )
}

export default App
