import React from 'react'
import { motion } from 'framer-motion'

interface Brand {
  id: number;
  name: string;
  logo: string;
  color: string;
  models: string[];
}

const brands: Brand[] = [
  {
    id: 1,
    name: 'Tesla',
    logo: '/images/brands/tesla.webp',
    color: '#E82127',
    models: ['Model S', 'Model 3', 'Model X', 'Model Y', 'Cybertruck']
  },
  {
    id: 2,
    name: 'Nissan',
    logo: '/images/brands/nissan.svg',
    color: '#C3002F',
    models: ['Leaf', 'Ariya', 'e-NV200']
  },
  {
    id: 3,
    name: 'BMW',
    logo: '/images/brands/bmw.svg',
    color: '#0066B1',
    models: ['i3', 'i4', 'i7', 'iX', 'iX3']
  },
  {
    id: 4,
    name: 'Audi',
    logo: '/images/brands/audi.svg',
    color: '#BB0A30',
    models: ['e-tron', 'e-tron GT', 'Q4 e-tron', 'Q8 e-tron']
  },
  {
    id: 5,
    name: 'Jaguar',
    logo: '/images/brands/jaguar.svg',
    color: '#9E1B32',
    models: ['I-Pace']
  },
  {
    id: 6,
    name: 'BYD',
    logo: '/images/brands/byd.svg',
    color: '#FF0000',
    models: ['Han', 'Tang', 'Yuan Plus', 'Dolphin', 'Seal']
  },
  {
    id: 7,
    name: 'Porsche',
    logo: '/images/brands/porsche.svg',
    color: '#000000',
    models: ['Taycan', 'Taycan Cross Turismo']
  },
  {
    id: 8,
    name: 'NIO',
    logo: '/images/brands/nio.svg',
    color: '#00A0E9',
    models: ['ES8', 'ES6', 'EC6', 'ET7', 'ET5']
  },
  {
    id: 9,
    name: 'Mercedes-Benz',
    logo: '/images/brands/mercedes.svg',
    color: '#00A19B',
    models: ['EQA', 'EQB', 'EQC', 'EQE', 'EQS']
  },
  {
    id: 10,
    name: 'Volkswagen',
    logo: '/images/brands/volkswagen.svg',
    color: '#001E50',
    models: ['ID.3', 'ID.4', 'ID.5', 'ID.7', 'ID. Buzz']
  },
  {
    id: 11,
    name: 'Hyundai',
    logo: '/images/brands/hyundai.svg',
    color: '#002C5F',
    models: ['Ioniq 5', 'Ioniq 6', 'Kona Electric']
  },
  {
    id: 12,
    name: 'Kia',
    logo: '/images/brands/kia.svg',
    color: '#05141F',
    models: ['EV6', 'EV9', 'Niro EV', 'Soul EV']
  }
];

// Анимация контейнера
const container = {
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
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const BrandCards = () => {
  return (
    <motion.div 
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
    >
      {brands.map((brand) => (
        <motion.div
          key={brand.id}
          variants={item}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          className="glass-card p-6 rounded-xl flex flex-col items-center text-center hover:shadow-neon transition-all duration-300"
        >
          <div className="w-16 h-16 flex items-center justify-center mb-4">
            {/* Если логотип доступен, отображаем его, иначе отображаем первую букву названия бренда */}
            {brand.logo ? (
              <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full" />
            ) : (
              <span 
                className="text-4xl font-bold"
                style={{ color: brand.color }}
              >
                {brand.name.charAt(0)}
              </span>
            )}
          </div>
          
          <h3 className="text-xl font-bold mb-2">{brand.name}</h3>
          
          <p className="text-text-secondary text-sm">
            {brand.models.slice(0, 3).join(', ')}
            {brand.models.length > 3 && ' и др.'}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default BrandCards 