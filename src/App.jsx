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
import Music from './components/music/Music'

function App () {
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
