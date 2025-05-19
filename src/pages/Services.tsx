import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
  price: string;
  features: string[];
}

const services: Service[] = [
  {
    id: '1',
    title: 'Ремонт высоковольтной батареи',
    description: 'Восстановление и ремонт батарей любой сложности с гарантией и специализированным оборудованием',
    icon: 'battery',
    slug: 'battery-repair',
    price: 'от 15 000 ₽',
    features: [
      'Диагностика состояния батареи',
      'Восстановление емкости',
      'Замена отдельных ячеек',
      'Ремонт BMS (системы управления батареей)',
      'Термостабилизация элементов'
    ]
  },
  {
    id: '2',
    title: 'Диагностика электромобиля',
    description: 'Полная компьютерная диагностика всех систем электромобиля с выявлением неисправностей',
    icon: 'diagnostics',
    slug: 'diagnostics',
    price: 'от 3 500 ₽',
    features: [
      'Проверка высоковольтной системы',
      'Диагностика силовой электроники',
      'Проверка систем безопасности',
      'Анализ программного обеспечения',
      'Подробный отчет о состоянии систем'
    ]
  },
  {
    id: '3',
    title: 'Обновление программного обеспечения',
    description: 'Установка актуальных версий ПО, прошивка и настройка систем управления',
    icon: 'software',
    slug: 'software',
    price: 'от 5 000 ₽',
    features: [
      'Обновление ПО основного компьютера',
      'Настройка систем помощи водителю',
      'Оптимизация энергопотребления',
      'Разблокировка скрытых функций',
      'Установка кастомных прошивок'
    ]
  },
  {
    id: '4',
    title: 'Ремонт электродвигателя',
    description: 'Диагностика и ремонт тяговых электродвигателей с восстановлением функциональности',
    icon: 'motor',
    slug: 'electric-motor',
    price: 'от 20 000 ₽',
    features: [
      'Диагностика мотора',
      'Замена подшипников',
      'Ремонт обмоток',
      'Восстановление инвертора',
      'Балансировка ротора'
    ]
  },
  {
    id: '5',
    title: 'Обслуживание подвески',
    description: 'Ремонт и настройка ходовой части с учетом особенностей электромобилей',
    icon: 'chassis',
    slug: 'chassis',
    price: 'от 8 000 ₽',
    features: [
      'Диагностика подвески',
      'Замена амортизаторов',
      'Регулировка углов установки',
      'Ремонт пневмоподвески',
      'Балансировка колес'
    ]
  },
  {
    id: '6',
    title: 'Обслуживание зарядных станций',
    description: 'Установка, настройка и ремонт зарядного оборудования всех типов',
    icon: 'charging',
    slug: 'charging',
    price: 'от 4 500 ₽',
    features: [
      'Монтаж зарядных станций',
      'Настройка и интеграция',
      'Диагностика неисправностей',
      'Ремонт зарядных портов',
      'Обновление ПО зарядных устройств'
    ]
  },
  {
    id: '7',
    title: 'Профилактические работы',
    description: 'Комплексное техническое обслуживание электромобиля для поддержания его в идеальном состоянии',
    icon: 'maintenance',
    slug: 'maintenance',
    price: 'от 7 000 ₽',
    features: [
      'Замена фильтров',
      'Проверка тормозной системы',
      'Диагностика электронных компонентов',
      'Замена технических жидкостей',
      'Проверка высоковольтных систем'
    ]
  },
  {
    id: '8',
    title: 'Кузовной ремонт',
    description: 'Восстановление кузова электромобиля с учетом особенностей конструкции и безопасности',
    icon: 'body',
    slug: 'body-repair',
    price: 'от 10 000 ₽',
    features: [
      'Восстановление геометрии кузова',
      'Покраска с подбором цвета',
      'Ремонт алюминиевых элементов',
      'Полировка и детейлинг',
      'Антикоррозийная обработка'
    ]
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
        <svg className="w-12 h-12 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7h10a2 2 0 012 2v6a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2zm14 0h4a2 2 0 012 2v6a2 2 0 01-2 2h-4m-8-5v2m2-2v2" />
        </svg>
      );
    case 'diagnostics':
      return (
        <svg className="w-12 h-12 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      );
    case 'software':
      return (
        <svg className="w-12 h-12 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 'motor':
      return (
        <svg className="w-12 h-12 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'chassis':
      return (
        <svg className="w-12 h-12 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'charging':
      return (
        <svg className="w-12 h-12 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'maintenance':
      return (
        <svg className="w-12 h-12 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      );
    case 'body':
      return (
        <svg className="w-12 h-12 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      );
    default:
      return null;
  }
};

const Services = () => {
  useEffect(() => {
    document.title = 'Услуги - ЭлектроСервис'
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <>
      {/* Шапка страницы */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-bg-secondary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Услуги по обслуживанию электромобилей
            </h1>
            <p className="text-text-secondary text-lg md:text-xl">
              Полный спектр услуг по диагностике, ремонту и обслуживанию электромобилей любых марок 
              с использованием современного оборудования и оригинальных запчастей.
            </p>
          </div>
        </div>
      </section>
      
      {/* Описание преимуществ */}
      <section className="py-12 bg-gradient-to-b from-bg-secondary to-bg-primary">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-xl flex flex-col items-center text-center">
              <svg className="w-12 h-12 text-accent-blue mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="text-xl font-bold mb-2">Гарантия качества</h3>
              <p className="text-text-secondary">
                Все работы выполняются сертифицированными специалистами с гарантией на обслуживание до 2 лет
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl flex flex-col items-center text-center">
              <svg className="w-12 h-12 text-accent-blue mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold mb-2">Оперативность</h3>
              <p className="text-text-secondary">
                Большинство работ выполняется в день обращения, а сложный ремонт занимает не более 3-5 дней
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl flex flex-col items-center text-center">
              <svg className="w-12 h-12 text-accent-blue mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-xl font-bold mb-2">Оригинальные запчасти</h3>
              <p className="text-text-secondary">
                Используем только оригинальные или сертифицированные компоненты с проверенным качеством
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Список услуг */}
      <section className="py-16">
        <div className="container">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={item}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-neon"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-bg-secondary/50 rounded-full w-16 h-16 flex items-center justify-center">
                      <ServiceIcon type={service.icon} />
                    </div>
                    <div className="glass-card px-4 py-2 rounded-full">
                      <span className="text-accent-blue font-bold">{service.price}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-text-secondary mb-6">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-text-primary/80">Включает:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-accent-green mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-text-secondary">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link 
                    to={`/services/${service.slug}`} 
                    className="px-6 py-3 rounded-full bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary font-semibold transition-all duration-300 hover:border-accent-blue/80 hover:shadow-neon w-full block text-center"
                  >
                    Подробнее
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Блок с призывом к действию */}
      <section className="py-16 bg-bg-secondary">
        <div className="container">
          <div className="glass-card p-8 md:p-12 rounded-xl bg-gradient-to-r from-accent-blue/10 to-accent-green/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Нужна консультация?</h2>
                <p className="text-text-secondary mb-6">
                  Если у вас возникли вопросы по обслуживанию вашего электромобиля или вы не нашли нужную услугу, 
                  свяжитесь с нами для получения бесплатной консультации.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="tel:+78001234567" 
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold transition-all duration-300 hover:shadow-neon hover:scale-105 text-center"
                  >
                    Позвонить
                  </a>
                  <Link 
                    to="/contacts" 
                    className="px-6 py-3 rounded-full bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary font-semibold transition-all duration-300 hover:border-accent-blue/80 hover:shadow-neon text-center"
                  >
                    Написать нам
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <img 
                  src="/images/support-team.webp" 
                  alt="Команда специалистов" 
                  className="rounded-xl shadow-neon max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Services 