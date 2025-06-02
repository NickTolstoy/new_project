import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface Service {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  slug: string;
  price: string;
  features: string[];
}

const services: Service[] = [
  {
    id: '1',
    title: 'Компьютерная диагностика',
    description: 'Полная компьютерная диагностика всех систем электромобиля с определением неисправностей',
    imageSrc: '/images/services/Компьютерная диагностика.webp',
    slug: 'diagnostics',
    price: '4 000 ₽',
    features: [
      'Проверка всех электронных систем',
      'Диагностика двигателя и трансмиссии',
      'Проверка систем безопасности',
      'Анализ кодов ошибок',
      'Подробный отчет о состоянии автомобиля'
    ]
  },
  {
    id: '2',
    title: 'Замена масляного фильтра',
    description: 'Диагностика и замена масляного фильтра с использованием качественных материалов',
    imageSrc: '/images/services/Замена масляного фильтра.webp',
    slug: 'oil-filter',
    price: '8 000 ₽',
    features: [
      'Диагностика состояния фильтра',
      'Использование качественных материалов',
      'Проверка уровня масла',
      'Утилизация старого фильтра',
      'Проверка системы после замены'
    ]
  },
  {
    id: '3',
    title: 'Обслуживание тормозной системы',
    description: 'Диагностика, замена колодок и тормозной жидкости для обеспечения безопасности',
    imageSrc: '/images/services/brake-service.webp',
    slug: 'brake-service',
    price: 'от 4 000 ₽',
    features: [
      'Замена передних тормозных колодок (4 000 ₽)',
      'Замена задних тормозных колодок (6 000 ₽)',
      'Замена тормозной жидкости (8 000 ₽)',
      'Диагностика тормозной системы',
      'Проверка эффективности торможения'
    ]
  },
  {
    id: '4',
    title: 'Работа с силовым аккумулятором',
    description: 'Профессиональное обслуживание и ремонт высоковольтной батареи электромобиля',
    imageSrc: '/images/services/Работа с силовым аккумулятором.webp',
    slug: 'battery-service',
    price: 'от 5 000 ₽',
    features: [
      'Замена аккумулятора низкого напряжения (5 000 ₽)',
      'Диагностика состояния высоковольтной батареи',
      'Разборка и сборка силового аккумуляторного блока (30 000 ₽)',
      'Восстановление ёмкости',
      'Ремонт системы охлаждения батареи'
    ]
  },
  {
    id: '5',
    title: 'Обслуживание трансмиссии',
    description: 'Замена масла и обслуживание узлов трансмиссии электромобиля',
    imageSrc: '/images/services/Обслуживание трансмиссии.webp',
    slug: 'transmission',
    price: 'от 4 000 ₽',
    features: [
      'Замена масла в заднем мосту (4 000 ₽)',
      'Замена масла в редукторе переднего моста (10 000 ₽)',
      'Замена трансмиссионного масла (10 000 ₽)',
      'Диагностика трансмиссии',
      'Проверка работы электродвигателя'
    ]
  },
  {
    id: '6',
    title: 'Обслуживание кондиционера',
    description: 'Диагностика, заправка и ремонт системы кондиционирования',
    imageSrc: '/images/services/air-conditioning.webp',
    slug: 'air-conditioning',
    price: '10 000 ₽',
    features: [
      'Удаление и добавление хладагента',
      'Диагностика системы кондиционирования',
      'Очистка системы вентиляции',
      'Замена салонного фильтра',
      'Проверка работы после обслуживания'
    ]
  },
  {
    id: '7',
    title: 'Кузовные работы',
    description: 'Ремонт и обслуживание кузовных элементов электромобиля',
    imageSrc: '/images/services/Кузовные работы.webp',
    slug: 'coolant',
    price: '8 000 ₽',
    features: [
      'Слив старой охлаждающей жидкости',
      'Промывка системы охлаждения',
      'Заправка новым антифризом',
      'Проверка на утечки',
      'Контроль работы системы охлаждения'
    ]
  },
  {
    id: '8',
    title: 'Замена антифриза',
    description: 'Полная замена охлаждающей жидкости в системе термоменеджмента',
    imageSrc: '/images/services/Кузовные работы.webp', // Временно используем доступное изображение
    slug: 'body-repair',
    price: '8 000 ₽',
    features: [
      'Снятие и сборка переднего бампера',
      'Диагностика кузова на повреждения',
      'Ремонт небольших повреждений',
      'Восстановление геометрии кузова',
      'Защита от коррозии'
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



const Services = () => {
  useEffect(() => {
    document.title = 'Услуги - АвтосервисЛюбань'
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
                    <div className="bg-bg-secondary/40 rounded-full w-16 h-16 flex items-center justify-center overflow-hidden border border-white/5 shadow-sm">
                      <img 
                        src={service.imageSrc}
                        alt={service.title}
                        style={{ width: '45px', height: '45px' }}
                        className="object-contain"
                        loading="lazy"
                      />
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
                  
                  <div className="flex gap-3">
                    <Link 
                      to={`/services/${service.slug}`} 
                      className="px-6 py-3 rounded-full bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary font-semibold transition-all duration-300 hover:border-accent-blue/80 hover:shadow-neon flex-1 text-center"
                    >
                      Подробнее
                    </Link>
                    <Link 
                      to={`/contacts?service=${service.slug}#form`}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold transition-all duration-300 hover:shadow-neon hover:scale-[1.03] flex-1 text-center"
                    >
                      Записаться
                    </Link>
                  </div>
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