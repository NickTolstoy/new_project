import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-bg-primary/80 backdrop-blur-sm shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-text-primary flex items-center">
          <img src="/images/logo/logo.webp" alt="АвтосервисЛюбань" className="h-10 mr-3" />
          Автосервис<span className="text-accent-blue">Любань</span>
        </Link>
        
        {/* Десктопное меню */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/services" className="text-text-primary hover:text-accent-blue transition-colors">
            Услуги
          </Link>
          <Link to="/pricing" className="text-text-primary hover:text-accent-blue transition-colors">
            Цены
          </Link>
          <Link to="/about" className="text-text-primary hover:text-accent-blue transition-colors">
            О компании
          </Link>
          <Link to="/reviews" className="text-text-primary hover:text-accent-blue transition-colors">
            Отзывы
          </Link>
          <Link to="/contacts" className="text-text-primary hover:text-accent-blue transition-colors">
            Контакты
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <a href="tel:+78001234567" className="hidden md:block text-text-primary hover:text-accent-blue transition-colors">
            8 (800) 123-45-67
          </a>
          <Link 
            to="/contacts#form" 
            className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-semibold transition-all duration-300 hover:shadow-neon hover:scale-[1.03]"
          >
            Записаться
          </Link>
          <button 
            className="block md:hidden p-2"
            onClick={toggleMenu}
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            <span className="sr-only">{mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}</span>
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Мобильное меню */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="absolute top-full left-0 w-full bg-bg-primary/95 backdrop-blur-lg shadow-lg md:hidden py-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="container flex flex-col space-y-3">
              <Link 
                to="/services" 
                className="text-lg text-text-primary hover:text-accent-blue transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Услуги
              </Link>
              <Link 
                to="/pricing" 
                className="text-lg text-text-primary hover:text-accent-blue transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Цены
              </Link>
              <Link 
                to="/about" 
                className="text-lg text-text-primary hover:text-accent-blue transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                О компании
              </Link>
              <Link 
                to="/reviews" 
                className="text-lg text-text-primary hover:text-accent-blue transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Отзывы
              </Link>
              <Link 
                to="/contacts" 
                className="text-lg text-text-primary hover:text-accent-blue transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Контакты
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header 