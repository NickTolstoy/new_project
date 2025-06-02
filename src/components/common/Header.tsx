import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { usePopupForm } from '../PopupForm'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showAboutMenu, setShowAboutMenu] = useState(false)
  const [showServicesMenu, setShowServicesMenu] = useState(false)
  const { showPopupForm } = usePopupForm()
  
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
  
  // Запрещаем прокрутку страницы, когда открыто мобильное меню
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [mobileMenuOpen])

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }
  
  const handleMouseEnter = (menu: string) => {
    if (menu === 'about') {
      setShowAboutMenu(true)
    } else if (menu === 'services') {
      setShowServicesMenu(true)
    }
  }
  
  const handleMouseLeave = (menu: string) => {
    if (menu === 'about') {
      setShowAboutMenu(false)
    } else if (menu === 'services') {
      setShowServicesMenu(false)
    }
  }
  
  const handleCallbackClick = (e: React.MouseEvent) => {
    e.preventDefault()
    showPopupForm()
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
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link to="/" className="text-2xl md:text-2xl font-bold text-text-primary flex items-center">
            <img src="/images/logo/logo.webp" alt="АвтосервисЛубань" className="h-8 md:h-10 mr-2 md:mr-3" />
            <span className="hidden sm:inline">Автосервис<span className="text-accent-blue">Лубань</span></span>
          </Link>
        </motion.div>
        
        {/* Десктопное меню */}
        <nav className="hidden md:flex items-center space-x-6">
          {/* Услуги с выпадающим меню */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onMouseEnter={() => handleMouseEnter('services')}
            onMouseLeave={() => handleMouseLeave('services')}
          >
            <div className="flex items-center cursor-pointer text-text-primary hover:text-accent-blue transition-colors">
              <Link to="/services" className="mr-1">Услуги</Link>
              <svg className={`w-4 h-4 transition-transform duration-300 ${showServicesMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <AnimatePresence>
              {showServicesMenu && (
                <motion.div
                  className="absolute left-0 mt-2 w-48 rounded-lg overflow-hidden shadow-lg z-20"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-bg-primary/90 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden">
                    <Link 
                      to="/pricing" 
                      className="block px-4 py-3 text-text-primary hover:bg-bg-secondary/50 hover:text-accent-blue transition-colors"
                    >
                      Цены
                    </Link>
                    <Link 
                      to="/faq" 
                      className="block px-4 py-3 text-text-primary hover:bg-bg-secondary/50 hover:text-accent-blue transition-colors"
                    >
                      Часто задаваемые вопросы
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* О компании с выпадающим меню */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            onMouseEnter={() => handleMouseEnter('about')}
            onMouseLeave={() => handleMouseLeave('about')}
          >
            <div className="flex items-center cursor-pointer text-text-primary hover:text-accent-blue transition-colors">
              <Link to="/about" className="mr-1">О компании</Link>
              <svg className={`w-4 h-4 transition-transform duration-300 ${showAboutMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <AnimatePresence>
              {showAboutMenu && (
                <motion.div
                  className="absolute left-0 mt-2 w-48 rounded-lg overflow-hidden shadow-lg z-20"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-bg-primary/90 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden">
                    <Link 
                      to="/reviews" 
                      className="block px-4 py-3 text-text-primary hover:bg-bg-secondary/50 hover:text-accent-blue transition-colors"
                    >
                      Отзывы
                    </Link>
                    <Link 
                      to="/news" 
                      className="block px-4 py-3 text-text-primary hover:bg-bg-secondary/50 hover:text-accent-blue transition-colors"
                    >
                      Новости
                    </Link>
                    <Link 
                      to="/blog" 
                      className="block px-4 py-3 text-text-primary hover:bg-bg-secondary/50 hover:text-accent-blue transition-colors"
                    >
                      Блог
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Остальные пункты меню */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ y: -3 }}
          >
            <Link to="/contacts" className="text-text-primary hover:text-accent-blue transition-colors">
              Контакты
            </Link>
          </motion.div>
        </nav>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <motion.a 
            href="tel:+79267980666" 
            className="hidden md:block text-text-primary hover:text-accent-blue transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            +7 (926) 798-06-66
          </motion.a>
          
          {/* Кнопка "Позвоните мне" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block"
          >
            <button 
              onClick={handleCallbackClick}
              className="px-4 sm:px-5 py-2 sm:py-3 rounded-full text-sm sm:text-base border border-accent-blue/50 text-accent-blue font-semibold transition-all duration-300 hover:bg-accent-blue/10 hover:shadow-neon hover:scale-[1.03]"
            >
              Позвоните мне
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/contacts#form" 
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-semibold transition-all duration-300 hover:shadow-neon hover:scale-[1.03]"
            >
              Записаться
            </Link>
          </motion.div>
          
          <motion.button 
            className="block md:hidden p-2 bg-gradient-to-r from-accent-blue/20 to-accent-green/20 rounded-full transition-all duration-300 hover:shadow-neon"
            onClick={toggleMenu}
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            whileHover={{ rotate: mobileMenuOpen ? -90 : 0, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={mobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="sr-only">{mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}</span>
            {mobileMenuOpen ? (
              <svg className="w-5 h-5 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </motion.button>
        </div>
      </div>
      
      {/* Мобильное меню - обновим его для поддержки подменю */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 top-[60px] bg-bg-primary/95 backdrop-blur-lg md:hidden z-40 overflow-hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-accent-green/10 z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            
            <motion.div
              className="absolute inset-0 z-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  x: [0, 20, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 w-64 h-64 bg-accent-green/10 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  x: [0, -20, 0],
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 8,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
              
              {/* Анимированные частицы в фоне */}
              {Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                  key={index}
                  className={`absolute rounded-full ${
                    index % 2 === 0 ? 'bg-accent-blue/20' : 'bg-accent-green/20'
                  }`}
                  style={{
                    width: `${Math.random() * 20 + 5}px`,
                    height: `${Math.random() * 20 + 5}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, Math.random() * 200 - 100],
                    x: [0, Math.random() * 200 - 100],
                    opacity: [0, 0.7, 0],
                    scale: [0, 1.5, 0.5],
                  }}
                  transition={{
                    duration: Math.random() * 8 + 4,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </motion.div>
            
            <motion.div 
              className="relative z-10 h-full flex flex-col justify-between py-8 px-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2
                  }
                }
              }}
            >
              <nav className="flex flex-col space-y-4">
                {/* Обновленное мобильное меню с группировкой */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                  }}
                >
                  <motion.div 
                    className="block"
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link 
                      to="/services" 
                      className="flex items-center p-4 glass-card rounded-xl bg-bg-secondary/20 hover:bg-bg-secondary/40 transition-all duration-300 hover:shadow-neon"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <motion.span 
                        className="rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-green/20 p-2 mr-4"
                        whileHover={{ rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </motion.span>
                      <span className="text-xl text-text-primary">Услуги</span>
                    </Link>
                  </motion.div>
                  
                  <div className="pl-12 mt-2 space-y-2">
                    <Link 
                      to="/pricing" 
                      className="block p-3 rounded-lg bg-bg-secondary/10 hover:bg-bg-secondary/30 transition-all text-text-secondary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Цены
                    </Link>
                    <Link 
                      to="/faq" 
                      className="block p-3 rounded-lg bg-bg-secondary/10 hover:bg-bg-secondary/30 transition-all text-text-secondary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Часто задаваемые вопросы
                    </Link>
                  </div>
                </motion.div>
                
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                  }}
                >
                  <motion.div 
                    className="block"
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link 
                      to="/about" 
                      className="flex items-center p-4 glass-card rounded-xl bg-bg-secondary/20 hover:bg-bg-secondary/40 transition-all duration-300 hover:shadow-neon"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <motion.span 
                        className="rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-green/20 p-2 mr-4"
                        whileHover={{ rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </motion.span>
                      <span className="text-xl text-text-primary">О компании</span>
                    </Link>
                  </motion.div>
                  
                  <div className="pl-12 mt-2 space-y-2">
                    <Link 
                      to="/reviews" 
                      className="block p-3 rounded-lg bg-bg-secondary/10 hover:bg-bg-secondary/30 transition-all text-text-secondary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Отзывы
                    </Link>
                    <Link 
                      to="/news" 
                      className="block p-3 rounded-lg bg-bg-secondary/10 hover:bg-bg-secondary/30 transition-all text-text-secondary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Новости
                    </Link>
                    <Link 
                      to="/blog" 
                      className="block p-3 rounded-lg bg-bg-secondary/10 hover:bg-bg-secondary/30 transition-all text-text-secondary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Блог
                    </Link>
                  </div>
                </motion.div>
                
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                  }}
                >
                  <motion.div 
                    className="block"
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link 
                      to="/contacts" 
                      className="flex items-center p-4 glass-card rounded-xl bg-bg-secondary/20 hover:bg-bg-secondary/40 transition-all duration-300 hover:shadow-neon"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <motion.span 
                        className="rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-green/20 p-2 mr-4"
                        whileHover={{ rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </motion.span>
                      <span className="text-xl text-text-primary">Контакты</span>
                    </Link>
                  </motion.div>
                </motion.div>
              </nav>
              
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="mt-6"
              >
                <div className="glass-card p-6 rounded-xl bg-bg-secondary/30">
                  <h3 className="font-bold mb-3 flex items-center">
                    <span className="rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-green/20 p-2 mr-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    Свяжитесь с нами
                  </h3>
                  <a 
                    href="tel:+79267980666" 
                    className="text-lg text-accent-blue font-semibold block mb-2"
                  >
                    +7 (926) 798-06-66
                  </a>
                  <div className="flex flex-col space-y-2 mt-3">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <button 
                        onClick={(e) => {
                          setMobileMenuOpen(false)
                          handleCallbackClick(e)
                        }}
                        className="block w-full text-center px-6 py-3 rounded-full border border-accent-blue/50 text-accent-blue font-semibold transition-all duration-300 hover:bg-accent-blue/10"
                      >
                        Позвоните мне
                      </button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Link 
                        to="/contacts#form" 
                        className="block w-full text-center px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-semibold transition-all duration-300 hover:shadow-neon"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Записаться на сервис
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header