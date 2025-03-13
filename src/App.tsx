import React from 'react'
import { motion } from 'framer-motion'

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Ethereal background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-dream-100 rounded-full blur-[100px] opacity-20 animate-glow"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-ethereal-100 rounded-full blur-[100px] opacity-20 animate-glow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-mist-100 rounded-full blur-[100px] opacity-20 animate-glow"></div>
      </div>

      {/* Main content */}
      <div className="relative">
        <header className="pt-20 pb-12 px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="font-display text-6xl font-light text-text-primary mb-6 leading-tight">
              Graphical Design
              <span className="block font-accent italic text-accent">Aesthetics</span>
            </h1>
            <p className="font-sans text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              A curated journey through ethereal design principles, where dreams meet visual poetry
            </p>
          </motion.div>
        </header>
        
        <main className="px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <motion.section 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {/* Design Cards */}
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="group"
                >
                  <div className="relative bg-surface rounded-2xl shadow-ethereal overflow-hidden transition-all duration-300 hover:shadow-glow hover:-translate-y-1">
                    <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-dream-200 to-ethereal-200"></div>
                    <div className="p-6">
                      <h3 className="font-display text-2xl text-text-primary mb-2">Ethereal Design {i}</h3>
                      <p className="text-text-subtle">Exploring the delicate balance between form and emotion</p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>
              ))}
            </motion.section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
