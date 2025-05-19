import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Фоновый градиент с анимацией */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-accent-green/20 backdrop-blur-lg"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Запишитесь на сервис прямо сейчас
            </h2>
            <p className="text-text-secondary text-lg mb-8">
              Доверьте свой электромобиль команде профессионалов. 
              Мы гарантируем качественное обслуживание, быструю диагностику 
              и прозрачные цены.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                'Бесплатная диагностика при записи через сайт',
                'Гарантия на все виды работ от 6 месяцев',
                'Оригинальные или проверенные аналоги запчастей',
                'Возможность присутствовать при ремонте',
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-6 h-6 text-accent-green mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/contacts#form" 
                className="px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold transition-all duration-300 hover:shadow-neon hover:scale-105 text-center"
              >
                Записаться на обслуживание
              </Link>
              <a
                href="tel:+78001234567"
                className="px-8 py-4 rounded-full bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary font-semibold transition-all duration-300 hover:border-accent-blue/80 hover:shadow-neon text-center"
              >
                Позвонить нам
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Здесь будет изображение или 3D-модель электромобиля */}
            <div className="bg-bg-secondary/30 rounded-2xl overflow-hidden aspect-video shadow-neon glass-card">
              <img 
                src="/images/tesla-service.jpg" 
                alt="Сервис электромобилей" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Декоративные элементы */}
            <div className="absolute top-4 right-4 glass-card p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-accent-green animate-pulse"></div>
                <span className="text-sm font-medium">Сервис открыт</span>
              </div>
            </div>
            
            <div className="absolute -bottom-5 -left-5 glass-card p-4 rounded-xl transform rotate-3 shadow-neon-green">
              <div className="text-center">
                <span className="text-3xl font-bold text-accent-green">97%</span>
                <p className="text-xs text-text-secondary">довольных клиентов</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction 