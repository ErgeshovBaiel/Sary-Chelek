import { useState, useEffect } from 'react'
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
import ExitButton from './components/ExitButton'
import Music from './components/music/Music'

function App () {
  const [isRegistered, setIsRegistered] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already registered
    const registered = localStorage.getItem('isRegistered')
    const currentUser = localStorage.getItem('currentUser')

    if (registered === 'true' && currentUser) {
      setIsRegistered(true)
    }

    setIsLoading(false)
  }, [])

  const handleRegistrationComplete = () => {
    setIsRegistered(true)
  }

  const handleLogout = () => {
    // Clear all registration data
    localStorage.removeItem('isRegistered')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('language')

    // Reset state and return to registration
    setIsRegistered(false)
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
        <ExitButton onLogout={handleLogout} />
      </div>
    </Router>
  )
}

export default App
