import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFound = () => {
  return (
    <div className="container min-h-[70vh] flex items-center justify-center py-20">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-8xl font-bold mb-6 bg-gradient-to-r from-accent-blue to-accent-green bg-clip-text text-transparent">404</h1>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Страница не найдена
          </h2>
          
          <p className="text-text-secondary text-lg mb-10 max-w-2xl mx-auto">
            Возможно, страница была удалена, перемещена или её никогда не существовало.
            Вернитесь на главную страницу или воспользуйтесь навигацией.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold transition-all duration-300 hover:shadow-neon hover:scale-105 text-center"
            >
              Вернуться на главную
            </Link>
            <Link 
              to="/services" 
              className="px-8 py-4 rounded-full bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary font-semibold transition-all duration-300 hover:border-accent-blue/80 hover:shadow-neon text-center"
            >
              Наши услуги
            </Link>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16"
        >
          <div className="glass-card p-6 inline-block rounded-xl">
            <h3 className="text-xl font-bold mb-2">Нужна помощь?</h3>
            <p className="text-text-secondary mb-4">
              Если вы не нашли нужную информацию, свяжитесь с нами
            </p>
            <a 
              href="tel:+78001234567" 
              className="text-accent-blue inline-flex items-center hover:text-accent-green transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              8 (800) 123-45-67
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound 