import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={`app-container ${isLoaded ? 'loaded' : ''}`}>
      <nav className="navbar">
        <div className="nav-brand">aesthetic.</div>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main className="main-content">
        <section className="hero-section">
          <h1 className="glitch-text">
            <span aria-hidden="true">Create Something Beautiful</span>
            Create Something Beautiful
            <span aria-hidden="true">Create Something Beautiful</span>
          </h1>
          <p className="subtitle">Where design meets innovation</p>
          <div className="cta-container">
            <button className="cta-button primary">Get Started</button>
            <button className="cta-button secondary">Learn More</button>
          </div>
        </section>

        <section className="features-grid">
          {['Design', 'Develop', 'Deploy', 'Discover'].map((text, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon"></div>
              <h3>{text}</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          ))}
        </section>
      </main>

      <div className="floating-shapes">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`shape shape-${i + 1}`}></div>
        ))}
      </div>
    </div>
  )
}

export default App
