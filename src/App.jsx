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

    if (registered === 'true' && currentUser) {
      setIsRegistered(true)
    }
    if (shouldShowSuccess) {
      setShowSuccess(true)
      // auto-hide success after a delay
      const timer = setTimeout(() => {
        setShowSuccess(false)
        localStorage.removeItem('showSuccess')
      }, 3500)
      return () => clearTimeout(timer)
    }

    setIsLoading(false)
  }, [])

  const handleRegistrationComplete = user => {
    localStorage.setItem('showSuccess', 'true')
    localStorage.setItem('showHeaderSuccess', 'true')
    setIsRegistered(true)
    setShowSuccess(true)
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
            <span className='success-dot' aria-hidden='true'></span>
            <span>{t('registration_success')}</span>
            <button
              className='success-close'
              aria-label='Close notification'
              onClick={() => {
                setShowSuccess(false)
                localStorage.removeItem('showSuccess')
              }}
            >
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
      </div>
    </Router>
  )
}

export default App
