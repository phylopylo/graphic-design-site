import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Collection' },
  { path: '/cart', label: 'Cart' },
  { path: '/contact', label: 'Contact' }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const headerControls = useAnimation();

  // Track mouse position for hover effects
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  };

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate header on scroll
  useEffect(() => {
    if (scrollY > 50) {
      headerControls.start({
        backdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
        padding: '0.5rem 0',
      });
    } else {
      headerControls.start({
        backdropFilter: 'blur(0px)',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
        padding: '1rem 0',
      });
    }
  }, [scrollY, headerControls]);

  return (
    <div className="min-h-screen bg-background overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Cursor glow effect */}
      <motion.div
        className="fixed w-[300px] h-[300px] pointer-events-none z-0"
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        <div className="w-full h-full bg-accent/5 rounded-full blur-[100px] animate-pulse"></div>
      </motion.div>

      {/* Ethereal Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-dream-100/30 via-ethereal-200/20 to-mist-100/30 rotate-12"
          style={{ y: scrollY * 0.2 }}
        />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <div className="w-1 h-1 bg-accent/20 rounded-full" />
              <div className="absolute inset-0 animate-ping bg-accent/10 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        animate={headerControls}
        initial={{ backdropFilter: 'blur(0px)', backgroundColor: 'rgba(255, 255, 255, 0)' }}
      >
        <nav className="max-w-7xl mx-auto px-8 py-6">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Link to="/" className="inline-block group">
              <motion.div className="relative">
                <motion.div
                  className="absolute -inset-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  animate={{
                    background: [
                      'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)',
                      'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                      'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)',
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.h1 
                  className="font-display text-6xl text-text-primary mb-2 bg-gradient-to-r from-dream-300 via-ethereal-300 to-mist-300 bg-clip-text text-transparent"
                  animate={{ 
                    textShadow: [
                      "0 0 20px rgba(255,255,255,0.2)",
                      "0 0 40px rgba(255,255,255,0.4)",
                      "0 0 20px rgba(255,255,255,0.2)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Ethereal Designs
                </motion.h1>
                <motion.div
                  className="absolute -inset-1 border border-accent/10 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{ scale: [0.8, 1.1, 0.8], rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
              <motion.p 
                className="text-text-subtle text-lg italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.5 }}
                whileHover={{ opacity: 1, y: -2 }}
              >
                Where dreams take form
              </motion.p>
            </Link>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`relative px-4 py-2 text-lg transition-colors duration-300 ${
                    location.pathname === item.path
                      ? 'text-accent'
                      : 'text-text-primary hover:text-accent'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-accent/10 rounded-full"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-px bg-accent/30"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </nav>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear" 
            }}
            className="absolute -top-[40%] -left-[40%] w-[80%] h-[80%] bg-gradient-to-br from-dream-200/10 to-ethereal-200/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              rotate: [360, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear" 
            }}
            className="absolute -top-[40%] -right-[40%] w-[80%] h-[80%] bg-gradient-to-bl from-mist-200/10 to-dream-200/10 rounded-full blur-3xl"
          />
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 pt-48">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-32 pb-8 text-center text-text-subtle">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>© 2024 Ethereal Designs. All rights reserved.</p>
        </motion.div>
      </footer>
    </div>
  );
} 