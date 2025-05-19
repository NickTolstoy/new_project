import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
}

const services: Service[] = [
  {
    id: '1',
    title: 'Ремонт высоковольтной батареи',
    description: 'Восстановление и ремонт батарей любой сложности с гарантией и спецоборудованием',
    icon: 'battery',
    slug: 'battery-repair'
  },
  {
    id: '2',
    title: 'Диагностика электромобиля',
    description: 'Полная компьютерная диагностика всех систем электромобиля с выявлением неисправностей',
    icon: 'diagnostics',
    slug: 'diagnostics'
  },
  {
    id: '3',
    title: 'Обновление программного обеспечения',
    description: 'Установка актуальных версий ПО, прошивка и настройка систем управления',
    icon: 'software',
    slug: 'software'
  },
  {
    id: '4',
    title: 'Ремонт электродвигателя',
    description: 'Диагностика и ремонт тяговых электродвигателей с восстановлением функциональности',
    icon: 'motor',
    slug: 'electric-motor'
  },
  {
    id: '5',
    title: 'Обслуживание подвески',
    description: 'Ремонт и настройка ходовой части с учетом особенностей электромобилей',
    icon: 'chassis',
    slug: 'chassis'
  },
  {
    id: '6',
    title: 'Обслуживание зарядных станций',
    description: 'Установка, настройка и ремонт зарядного оборудования всех типов',
    icon: 'charging',
    slug: 'charging'
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

// Компонент иконки (примерный)
const ServiceIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'battery':
      return (
        <svg className="w-10 h-10 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7h10a2 2 0 012 2v6a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2zm14 0h4a2 2 0 012 2v6a2 2 0 01-2 2h-4m-8-5v2m2-2v2" />
        </svg>
      );
    case 'diagnostics':
      return (
        <svg className="w-10 h-10 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      );
    case 'software':
      return (
        <svg className="w-10 h-10 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 'motor':
      return (
        <svg className="w-10 h-10 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'chassis':
      return (
        <svg className="w-10 h-10 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'charging':
      return (
        <svg className="w-10 h-10 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    default:
      return null;
  }
};

const ServiceCards = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Наши услуги</h2>
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
              <div className="bg-bg-secondary/50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <ServiceIcon type={service.icon} />
              </div>
              
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
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