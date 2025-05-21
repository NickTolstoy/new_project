import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface Service {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  slug: string;
}

const services: Service[] = [
  {
    id: '1',
    title: 'Компьютерная диагностика',
    description: 'Полная диагностика электронных систем электромобиля с выявлением и устранением ошибок',
    imageSrc: '/images/services/Компьютерная диагностика.webp',
    slug: 'diagnostics'
  },
  {
    id: '2',
    title: 'Замена масляного фильтра',
    description: 'Профессиональная замена масляного фильтра и масла с использованием высококачественных материалов',
    imageSrc: '/images/services/Замена масляного фильтра.webp',
    slug: 'oil-filter'
  },
  {
    id: '3',
    title: 'Обслуживание тормозной системы',
    description: 'Замена тормозных колодок, дисков и комплексное обслуживание тормозной системы электромобиля',
    imageSrc: '/images/services/brake-service.webp',
    slug: 'brake-service'
  },
  {
    id: '4',
    title: 'Работа с силовым аккумулятором',
    description: 'Диагностика, ремонт и восстановление высоковольтных батарей с восстановлением емкости',
    imageSrc: '/images/services/Работа с силовым аккумулятором.webp',
    slug: 'battery-service'
  },
  {
    id: '5',
    title: 'Обслуживание трансмиссии',
    description: 'Ремонт и техническое обслуживание трансмиссии электромобиля для максимальной эффективности',
    imageSrc: '/images/services/Обслуживание трансмиссии.webp',
    slug: 'transmission'
  },
  {
    id: '6',
    title: 'Обслуживание кондиционера',
    description: 'Заправка, диагностика и ремонт системы кондиционирования для комфортной эксплуатации',
    imageSrc: '/images/services/air-conditioning.webp',
    slug: 'air-conditioning'
  },
  {
    id: '7',
    title: 'Кузовные работы',
    description: 'Устранение повреждений кузова, восстановление геометрии и покраска с соблюдением заводских стандартов',
    imageSrc: '/images/services/Кузовные работы.webp',
    slug: 'body-repair'
  }
];

// Варианты для анимации
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const ServiceCards = () => {
  return (
    <section className="pt-0 pb-8 md:pb-12">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Наши услуги</h2>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto">
            Полный спектр услуг по обслуживанию электромобилей любых марок. 
            Работаем с Tesla, Nissan, BMW, Audi, Jaguar, Porsche и другими.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
            <motion.div 
              key={service.id}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass-card p-6 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-neon"
            >
              <div className="flex items-center mb-6">
                <div className="bg-bg-secondary/40 rounded-full w-16 h-16 flex items-center justify-center overflow-hidden mr-3 shadow-sm border border-white/5">
                  <img 
                    src={service.imageSrc} 
                    alt={service.title} 
                    style={{ width: '45px', height: '45px' }}
                    className="object-contain"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-bold">{service.title}</h3>
              </div>
              <p className="text-text-secondary mb-6">{service.description}</p>
              
              <Link 
                to={`/services/${service.slug}`} 
                className="text-accent-blue hover:text-accent-green inline-flex items-center font-medium transition-colors"
              >
                Подробнее
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <Link 
            to="/services" 
            className="px-8 py-4 rounded-full bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary font-semibold transition-all duration-300 hover:border-accent-blue/80 hover:shadow-neon inline-flex items-center"
          >
            Все услуги
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ServiceCards 