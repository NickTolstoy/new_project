import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Интерфейс для подробной информации об услуге
interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  fullDescription: string[];
  icon: string;
  price: string;
  features: string[];
  benefits: string[];
  faq: {question: string; answer: string}[];
  process: {step: number; title: string; description: string}[];
  image: string;
}

// База данных услуг (в реальном проекте будет API запрос)
const servicesData: Record<string, ServiceDetail> = {
  'battery-repair': {
    id: '1',
    title: 'Ремонт высоковольтной батареи',
    description: 'Восстановление и ремонт батарей любой сложности с гарантией и специализированным оборудованием',
    fullDescription: [
      'Высоковольтная батарея — сердце электромобиля, от которого зависит запас хода и общая производительность автомобиля. С течением времени батареи теряют емкость или могут выходить из строя из-за различных причин.',
      'Наш сервис предлагает полный спектр услуг по диагностике, обслуживанию и ремонту высоковольтных батарей любых моделей электромобилей. Мы используем профессиональное оборудование и инновационные технологии для восстановления емкости и продления срока службы батарей.',
      'Все работы выполняются сертифицированными специалистами с соблюдением всех протоколов безопасности и технических регламентов производителей.'
    ],
    icon: 'battery',
    price: 'от 15 000 ₽',
    features: [
      'Диагностика состояния батареи',
      'Восстановление емкости батареи',
      'Замена отдельных ячеек и модулей',
      'Ремонт BMS (системы управления батареей)',
      'Устранение утечек тока',
      'Балансировка ячеек',
      'Термостабилизация элементов'
    ],
    benefits: [
      'Увеличение запаса хода',
      'Продление срока службы батареи',
      'Экономия на покупке новой батареи',
      'Улучшение производительности',
      'Гарантия на выполненные работы'
    ],
    faq: [
      {
        question: 'Возможно ли восстановить емкость батареи до 100%?',
        answer: 'В большинстве случаев полное восстановление до заводской емкости невозможно, но мы можем значительно увеличить текущую емкость и продлить срок службы батареи. В среднем наши клиенты получают прирост в 15-30% от текущего состояния.'
      },
      {
        question: 'Сколько времени занимает ремонт батареи?',
        answer: 'Время ремонта зависит от сложности проблемы и модели электромобиля. Базовая диагностика занимает около 2-4 часов. Полный ремонт может занять от 1 до 5 дней в зависимости от необходимых работ и наличия запчастей.'
      },
      {
        question: 'Даете ли вы гарантию на ремонт батарей?',
        answer: 'Да, мы предоставляем гарантию на все виды работ с высоковольтными батареями. На восстановление емкости — 6 месяцев, на замену модулей — 1 год, на ремонт BMS — 1 год.'
      },
      {
        question: 'Безопасен ли ремонт высоковольтной батареи?',
        answer: 'Все работы с высоковольтными компонентами выполняются сертифицированными специалистами с соблюдением всех протоколов безопасности. Наш сервис оборудован специальными постами для работы с батареями, имеющими усиленную защиту и изоляцию.'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Диагностика',
        description: 'Проводим полную компьютерную диагностику состояния батареи, проверяем напряжение ячеек, внутреннее сопротивление и баланс.'
      },
      {
        step: 2,
        title: 'Анализ результатов',
        description: 'Определяем проблемные модули или ячейки, составляем план ремонта и согласовываем его с клиентом.'
      },
      {
        step: 3,
        title: 'Ремонтные работы',
        description: 'Выполняем необходимые работы: замену модулей, балансировку, ремонт BMS или восстановление емкости в зависимости от выявленных проблем.'
      },
      {
        step: 4,
        title: 'Тестирование',
        description: 'Проводим тестирование батареи после ремонта, проверяем все параметры и емкость.'
      },
      {
        step: 5,
        title: 'Контрольная проверка',
        description: 'Устанавливаем батарею в автомобиль и проводим контрольную проверку в реальных условиях.'
      }
    ],
    image: '/images/battery-repair.jpg'
  },
  'diagnostics': {
    id: '2',
    title: 'Диагностика электромобиля',
    description: 'Полная компьютерная диагностика всех систем электромобиля с выявлением неисправностей',
    fullDescription: [
      'Современные электромобили — это сложные технические устройства, оснащенные множеством электронных систем и датчиков. Своевременная диагностика позволяет выявить проблемы на ранней стадии и предотвратить дорогостоящий ремонт.',
      'Наш сервис предлагает комплексную диагностику всех систем электромобиля с использованием фирменного и специализированного оборудования. Мы работаем со всеми популярными марками электромобилей и гибридов.',
      'По результатам диагностики вы получите подробный отчет о состоянии автомобиля и рекомендации по устранению выявленных проблем.'
    ],
    icon: 'diagnostics',
    price: 'от 3 500 ₽',
    features: [
      'Компьютерная диагностика всех систем',
      'Проверка высоковольтной батареи',
      'Диагностика тягового электродвигателя',
      'Проверка инвертора и силовой электроники',
      'Диагностика систем охлаждения',
      'Проверка систем безопасности',
      'Анализ данных бортового компьютера'
    ],
    benefits: [
      'Раннее выявление проблем',
      'Предотвращение дорогостоящего ремонта',
      'Оптимизация работы систем',
      'Увеличение ресурса компонентов',
      'Подробный отчет о состоянии автомобиля'
    ],
    faq: [
      {
        question: 'Как часто нужно проводить диагностику электромобиля?',
        answer: 'Рекомендуется проводить полную диагностику раз в 6-12 месяцев в зависимости от пробега и условий эксплуатации. При появлении любых нехарактерных симптомов — незамедлительно.'
      },
      {
        question: 'Сколько времени занимает диагностика?',
        answer: 'Базовая диагностика занимает около 1-2 часов. Полная комплексная проверка может занять до 4 часов в зависимости от модели электромобиля и количества систем.'
      },
      {
        question: 'Нужно ли мне присутствовать при диагностике?',
        answer: 'Это необязательно, но желательно. По окончании диагностики наши специалисты подробно расскажут о выявленных проблемах и ответят на все вопросы. Вы также можете оставить автомобиль и забрать его позже.'
      },
      {
        question: 'Выполняете ли вы ремонт после диагностики?',
        answer: 'Да, мы предлагаем полный спектр услуг по ремонту и обслуживанию электромобилей. После диагностики вы получите детальное предложение по устранению выявленных проблем с указанием стоимости и сроков.'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Первичный осмотр',
        description: 'Визуальный осмотр автомобиля, сбор информации о проблемах и жалобах клиента.'
      },
      {
        step: 2,
        title: 'Компьютерная диагностика',
        description: 'Подключение диагностического оборудования и проверка всех электронных систем.'
      },
      {
        step: 3,
        title: 'Проверка высоковольтных компонентов',
        description: 'Диагностика батареи, электродвигателя, инвертора и других высоковольтных систем.'
      },
      {
        step: 4,
        title: 'Анализ результатов',
        description: 'Обработка полученных данных и формирование заключения о состоянии автомобиля.'
      },
      {
        step: 5,
        title: 'Предоставление отчета',
        description: 'Подготовка подробного отчета с рекомендациями по устранению выявленных проблем.'
      }
    ],
    image: '/images/diagnostics.jpg'
  }
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<ServiceDetail | null>(null);
  
  useEffect(() => {
    // В реальном приложении здесь был бы API запрос
    if (slug && servicesData[slug]) {
      setService(servicesData[slug]);
      document.title = `${servicesData[slug].title} - ЭлектроСервис`;
    }
    
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (!service) {
    return (
      <div className="container py-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Услуга не найдена</h2>
          <p className="text-text-secondary mb-6">
            Запрашиваемая услуга не найдена или была удалена.
          </p>
          <Link 
            to="/services" 
            className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold transition-all duration-300 hover:shadow-neon inline-block"
          >
            Вернуться к списку услуг
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <>
      {/* Шапка страницы */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-bg-secondary">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <Link 
                to="/services" 
                className="inline-flex items-center text-text-secondary hover:text-accent-blue mb-4 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Все услуги
              </Link>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {service.title}
              </h1>
              
              <p className="text-text-secondary text-lg md:text-xl">
                {service.description}
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-xl bg-gradient-to-r from-accent-blue/10 to-accent-green/10 min-w-[280px]">
              <div className="text-center">
                <div className="bg-bg-secondary/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {/* Здесь будет иконка услуги */}
                  <svg className="w-10 h-10 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                
                <div className="text-2xl font-bold text-accent-blue mb-2">
                  {service.price}
                </div>
                
                <Link 
                  to="/contacts#form" 
                  className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold transition-all duration-300 hover:shadow-neon hover:scale-105 inline-block mt-4"
                >
                  Записаться
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Основное содержимое */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Описание услуги */}
                <div className="glass-card p-8 rounded-xl mb-10">
                  <h2 className="text-2xl font-bold mb-6">Описание услуги</h2>
                  
                  <div className="space-y-4">
                    {service.fullDescription.map((paragraph, index) => (
                      <p key={index} className="text-text-secondary">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  {/* Изображение услуги */}
                  <div className="mt-8 rounded-xl overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                
                {/* Процесс выполнения */}
                <div className="glass-card p-8 rounded-xl mb-10">
                  <h2 className="text-2xl font-bold mb-6">Как мы работаем</h2>
                  
                  <div className="space-y-6">
                    {service.process.map((step) => (
                      <div key={step.step} className="flex">
                        <div className="mr-6">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-blue to-accent-green flex items-center justify-center font-bold text-white">
                            {step.step}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                          <p className="text-text-secondary">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Часто задаваемые вопросы */}
                <div className="glass-card p-8 rounded-xl">
                  <h2 className="text-2xl font-bold mb-6">Часто задаваемые вопросы</h2>
                  
                  <div className="space-y-6">
                    {service.faq.map((item, index) => (
                      <div key={index} className="border-b border-white/10 pb-6 last:border-0">
                        <h3 className="text-xl font-bold mb-3">{item.question}</h3>
                        <p className="text-text-secondary">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Что входит в услугу */}
                <div className="glass-card p-8 rounded-xl mb-10 sticky top-24">
                  <h3 className="text-xl font-bold mb-4">Что входит в услугу</h3>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-accent-green mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <h3 className="text-xl font-bold mb-4">Преимущества</h3>
                  
                  <ul className="space-y-3 mb-8">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-accent-blue mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-text-secondary">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Контактная информация */}
                  <div className="bg-bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Остались вопросы?</h4>
                    <p className="text-text-secondary text-sm mb-4">
                      Позвоните нам или оставьте заявку, и мы проконсультируем вас по всем вопросам.
                    </p>
                    <a 
                      href="tel:+78001234567"
                      className="flex items-center text-accent-blue hover:text-accent-green transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      8 (800) 123-45-67
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Призыв к действию */}
      <section className="py-16 bg-bg-secondary">
        <div className="container">
          <div className="glass-card p-8 md:p-12 rounded-xl bg-gradient-to-r from-accent-blue/10 to-accent-green/10 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Готовы записаться на {service.title.toLowerCase()}?
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-3xl mx-auto">
              Доверьте свой электромобиль профессионалам. Мы гарантируем качественное обслуживание, 
              честные цены и отличный результат.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contacts#form" 
                className="px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold transition-all duration-300 hover:shadow-neon hover:scale-105 text-center"
              >
                Записаться сейчас
              </Link>
              <a 
                href="tel:+78001234567" 
                className="px-8 py-4 rounded-full bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary font-semibold transition-all duration-300 hover:border-accent-blue/80 hover:shadow-neon text-center"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Позвонить нам
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ServiceDetail 