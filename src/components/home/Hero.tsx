import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Видео-фон */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-bg-primary/70 z-10"></div>
        <video 
          className="absolute w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Контент */}
      <div className="container relative z-20 h-full flex flex-col justify-center items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Профессиональный сервис электромобилей в Москве
          </h1>
          
          <p className="text-xl md:text-2xl text-text-secondary mb-8">
            Диагностика, ремонт и обслуживание электромобилей любых марок с гарантией результата
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/services" 
              className="px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold transition-all duration-300 hover:shadow-neon hover:scale-105 text-center"
            >
              Наши услуги
            </Link>
            <Link 
              to="/contacts" 
              className="px-8 py-4 rounded-full bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary font-semibold transition-all duration-300 hover:border-accent-blue/80 hover:shadow-neon text-center"
            >
              Записаться на сервис
            </Link>
          </div>
        </motion.div>
        
        {/* Всплывающие преимущества */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-10 left-0 right-0"
        >
          <div className="container grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="glass-card px-4 py-6 flex flex-col items-center text-center">
              <span className="text-accent-blue text-xl font-bold mb-2">5+</span>
              <span className="text-text-secondary text-sm">лет опыта ремонта</span>
            </div>
            <div className="glass-card px-4 py-6 flex flex-col items-center text-center">
              <span className="text-accent-blue text-xl font-bold mb-2">15+</span>
              <span className="text-text-secondary text-sm">опытных инженеров</span>
            </div>
            <div className="glass-card px-4 py-6 flex flex-col items-center text-center">
              <span className="text-accent-blue text-xl font-bold mb-2">24/7</span>
              <span className="text-text-secondary text-sm">техподдержка</span>
            </div>
            <div className="glass-card px-4 py-6 flex flex-col items-center text-center">
              <span className="text-accent-blue text-xl font-bold mb-2">500+</span>
              <span className="text-text-secondary text-sm">успешных ремонтов</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero 