import React from 'react'
import { motion, Variants } from 'framer-motion'
import { Link } from 'react-router-dom'

// Анимация контейнера
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

// Анимация элементов
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// Анимация буквы на hover
const letterVariants: Variants = {
  hover: { 
    scale: 1.2, 
    rotate: [0, -5, 5, -5, 0],
    transition: { 
      scale: { duration: 0.3 },
      rotate: { duration: 0.5, repeat: Infinity, repeatType: "reverse" } 
    }
  }
};

// Анимация фона карточки
const cardBackgroundVariants: Variants = {
  initial: {
    backgroundPosition: '0% 50%',
  },
  hover: {
    backgroundPosition: '100% 50%',
    transition: { duration: 3, repeat: Infinity, repeatType: "reverse" }
  }
};

const Brands = () => {
  // Массив брендов (в реальном проекте здесь можно использовать изображения)
  const brands = [
    { id: 1, name: 'Tesla', color: '#E82127' },
    { id: 2, name: 'Nissan', color: '#C3002F' },
    { id: 3, name: 'BMW', color: '#0066B1' },
    { id: 4, name: 'Audi', color: '#BB0A30' },
    { id: 5, name: 'Jaguar', color: '#9E1B32' },
    { id: 6, name: 'BYD', color: '#FF0000' },
    { id: 7, name: 'Porsche', color: '#000000' },
    { id: 8, name: 'NIO', color: '#00A0E9' },
  ];
  
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Обслуживаем все марки электромобилей
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto">
            Наши специалисты имеют опыт работы со всеми популярными брендами электромобилей, 
            включая европейские, американские, японские и китайские модели.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.id}
              variants={item}
              initial="initial"
              whileHover="hover"
              className="glass-card p-8 rounded-xl flex flex-col items-center justify-center aspect-square hover:shadow-neon transition-all duration-300 relative overflow-hidden group"
            >
              {/* Градиентный фон с анимацией */}
              <motion.div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-accent-blue via-accent-green to-accent-blue"
                variants={cardBackgroundVariants}
              />
              
              {/* Внутренняя окантовка с мерцанием */}
              <div className="absolute inset-3 rounded-lg border border-white/0 group-hover:border-accent-blue/30 transition-all duration-500" />
              
              {/* Содержимое */}
              <div className="relative z-10 flex flex-col items-center">
                <motion.span 
                  className="text-4xl md:text-5xl font-bold transition-all duration-300 group-hover:text-shadow-glow"
                  style={{ color: brand.color }}
                  variants={letterVariants}
                >
                  {brand.name.charAt(0)}
                </motion.span>
                <span className="text-xl mt-3 font-medium transform transition-all duration-300 group-hover:translate-y-1">{brand.name}</span>
              </div>
              
              {/* Декоративный элемент */}
              <div className="absolute bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <Link 
            to="/brands" 
            className="px-8 py-4 rounded-full bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary font-semibold transition-all duration-300 hover:border-accent-blue/80 hover:shadow-neon inline-flex items-center"
          >
            Посмотреть все марки
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Brands 