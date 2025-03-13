import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function App() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Enhanced ethereal background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div style={{ y: backgroundY }} className="absolute inset-0">
          <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-dream-100 rounded-full blur-[120px] opacity-20 animate-glow"></div>
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-ethereal-100 rounded-full blur-[120px] opacity-20 animate-glow animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-mist-100 rounded-full blur-[120px] opacity-20 animate-glow animation-delay-4000"></div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 border border-accent/10 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 border border-dream-200/20 rounded-full"></div>
        <div className="absolute top-1/3 left-1/4 w-24 h-24 border border-ethereal-200/20 rounded-full"></div>
      </div>

      {/* Main content */}
      <div className="relative">
        <header className="min-h-screen flex items-center justify-center pt-20 pb-32 px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ opacity }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="mb-8"
            >
              <h1 className="font-display text-7xl font-light text-text-primary mb-6 leading-tight">
                Graphical Design
                <span className="block font-accent italic text-accent mt-2">Aesthetics</span>
              </h1>
              <p className="font-sans text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                A curated journey through ethereal design principles, where dreams meet visual poetry
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-12"
            >
              <button className="btn-primary mx-2">Explore Designs</button>
              <button className="btn-secondary mx-2">Learn More</button>
            </motion.div>
          </motion.div>
        </header>
        
        <main className="px-8 pb-32">
          <div className="max-w-7xl mx-auto">
            <motion.section 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {/* Enhanced Design Cards */}
              {[
                {
                  title: "Ethereal Harmony",
                  description: "Where light and shadow dance in perfect balance",
                  gradient: "from-dream-200 to-ethereal-200"
                },
                {
                  title: "Mystic Flow",
                  description: "Fluid forms that transcend conventional boundaries",
                  gradient: "from-mist-200 to-dream-200"
                },
                {
                  title: "Divine Proportions",
                  description: "Sacred geometry meets modern aesthetics",
                  gradient: "from-ethereal-200 to-mist-200"
                }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.2 }}
                  className="group"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-surface rounded-2xl shadow-ethereal overflow-hidden"
                  >
                    <div className={`aspect-w-16 aspect-h-9 bg-gradient-to-br ${card.gradient}`}>
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-8">
                      <h3 className="font-display text-2xl text-text-primary mb-3">{card.title}</h3>
                      <p className="text-text-subtle">{card.description}</p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
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
