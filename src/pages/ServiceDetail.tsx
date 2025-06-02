import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ServiceReviews from '../components/services/ServiceReviews'

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
  'diagnostics': {
    id: '1',
    title: 'Компьютерная диагностика',
    description: 'Полная компьютерная диагностика всех систем электромобиля с определением неисправностей',
    fullDescription: [
      'Современные электромобили — это сложные технические устройства, оснащенные множеством электронных систем и датчиков. Своевременная диагностика позволяет выявить проблемы на ранней стадии и предотвратить дорогостоящий ремонт.',
      'Наш сервис предлагает комплексную диагностику всех систем электромобиля с использованием фирменного и специализированного оборудования. Мы работаем со всеми популярными марками электромобилей и гибридов.',
      'По результатам диагностики вы получите подробный отчет о состоянии автомобиля и рекомендации по устранению выявленных проблем.'
    ],
    icon: 'diagnostics',
    price: '4 000 ₽',
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
        answer: 'Полная диагностика занимает около 1-2 часов. В зависимости от модели электромобиля и количества систем время может увеличиться.'
      },
      {
        question: 'Нужно ли мне присутствовать при диагностике?',
        answer: 'Это необязательно, но желательно. По окончании диагностики наши специалисты подробно расскажут о выявленных проблемах и ответят на все вопросы.'
      },
      {
        question: 'Выполняете ли вы ремонт после диагностики?',
        answer: 'Да, мы предлагаем полный спектр услуг по ремонту и обслуживанию электромобилей. После диагностики вы получите детальное предложение по устранению выявленных проблем.'
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
    image: '/images/services/diagnostics.jpg'
  },
  'oil-filter': {
    id: '2',
    title: 'Замена масляного фильтра',
    description: 'Диагностика и замена масляного фильтра с использованием качественных материалов',
    fullDescription: [
      'Масляный фильтр играет важную роль в работе электромобиля, обеспечивая фильтрацию масла и защиту механических компонентов от износа. Регулярная замена фильтра необходима для поддержания оптимальной работы двигателя и трансмиссии.',
      'Наш сервис предлагает профессиональную замену масляного фильтра с использованием только качественных материалов и соблюдением всех технологических требований производителя.',
      'После замены фильтра мы проводим полную проверку системы, чтобы убедиться в отсутствии утечек и правильной работе всех компонентов.'
    ],
    icon: 'maintenance',
    price: '8 000 ₽',
    features: [
      'Диагностика состояния фильтра',
      'Использование оригинальных или качественных аналоговых запчастей',
      'Замена масла при необходимости',
      'Проверка на утечки после замены',
      'Утилизация старого фильтра и масла',
      'Сброс сервисных интервалов',
      'Рекомендации по дальнейшей эксплуатации'
    ],
    benefits: [
      'Увеличение срока службы двигателя',
      'Снижение риска поломок',
      'Экономия на капитальном ремонте',
      'Улучшение эффективности работы системы',
      'Экологически безопасная утилизация'
    ],
    faq: [
      {
        question: 'Как часто нужно менять масляный фильтр?',
        answer: 'Замену масляного фильтра рекомендуется проводить каждые 10-15 тысяч километров пробега или раз в год, в зависимости от рекомендаций производителя и условий эксплуатации.'
      },
      {
        question: 'Сколько времени занимает замена фильтра?',
        answer: 'Стандартная процедура замены масляного фильтра занимает около 30-60 минут, в зависимости от модели электромобиля и доступности компонентов.'
      },
      {
        question: 'Используете ли вы оригинальные запчасти?',
        answer: 'Мы предлагаем как оригинальные запчасти, так и качественные аналоги от проверенных производителей. Выбор остается за клиентом, и мы всегда предоставляем информацию о всех доступных вариантах.'
      },
      {
        question: 'Что входит в стоимость замены фильтра?',
        answer: 'В стоимость входит диагностика, сам фильтр, работа по замене, проверка системы после замены и утилизация старого фильтра. Дополнительно может потребоваться замена масла, что оговаривается отдельно.'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Диагностика',
        description: 'Проверка текущего состояния фильтра и необходимость его замены.'
      },
      {
        step: 2,
        title: 'Подготовка',
        description: 'Подготовка автомобиля к замене, подбор необходимых запчастей и материалов.'
      },
      {
        step: 3,
        title: 'Демонтаж старого фильтра',
        description: 'Аккуратное снятие старого фильтра с соблюдением всех технологических требований.'
      },
      {
        step: 4,
        title: 'Установка нового фильтра',
        description: 'Монтаж нового фильтра с правильной затяжкой и проверкой фиксации.'
      },
      {
        step: 5,
        title: 'Проверка и контроль',
        description: 'Проверка системы на утечки, контроль уровня масла и работы системы в целом.'
      }
    ],
    image: '/images/services/oil-filter.jpg'
  },
  'brake-service': {
    id: '3',
    title: 'Обслуживание тормозной системы',
    description: 'Диагностика, замена колодок и тормозной жидкости для обеспечения безопасности',
    fullDescription: [
      'Тормозная система является одной из самых важных систем безопасности в электромобиле. Регулярное обслуживание и своевременная замена компонентов критически важны для вашей безопасности на дороге.',
      'Наш сервис предлагает полный комплекс услуг по обслуживанию тормозной системы, включая диагностику, замену колодок, дисков и тормозной жидкости. Мы используем только качественные материалы и комплектующие.',
      'После завершения работ мы проводим тщательную проверку эффективности тормозной системы, чтобы убедиться в её полной исправности и безопасности.'
    ],
    icon: 'brakes',
    price: 'от 4 000 ₽',
    features: [
      'Замена передних тормозных колодок (4 000 ₽)',
      'Замена задних тормозных колодок (6 000 ₽)',
      'Замена тормозной жидкости (8 000 ₽)',
      'Диагностика тормозной системы',
      'Проверка толщины тормозных дисков',
      'Регулировка стояночного тормоза',
      'Проверка эффективности торможения'
    ],
    benefits: [
      'Повышение безопасности движения',
      'Увеличение срока службы тормозной системы',
      'Экономия на капитальном ремонте',
      'Улучшение отклика тормозной системы',
      'Устранение скрипов и шумов при торможении'
    ],
    faq: [
      {
        question: 'Как понять, что пора менять тормозные колодки?',
        answer: 'Основные признаки: скрип при торможении, увеличение тормозного пути, вибрация или пульсация педали тормоза, индикатор износа на приборной панели (если предусмотрен). Также рекомендуется визуальный осмотр при каждом ТО.'
      },
      {
        question: 'Как часто нужно менять тормозную жидкость?',
        answer: 'Рекомендуется менять тормозную жидкость каждые 2 года или 40 000 км пробега, в зависимости от того, что наступит раньше. Тормозная жидкость гигроскопична и со временем накапливает влагу, что снижает эффективность торможения.'
      },
      {
        question: 'Можно ли заменить только передние или только задние колодки?',
        answer: 'Да, замена производится по мере износа. Обычно передние колодки изнашиваются быстрее задних из-за большей нагрузки при торможении. Однако, мы рекомендуем проверять состояние всей тормозной системы для обеспечения равномерного торможения.'
      },
      {
        question: 'Сколько времени занимает обслуживание тормозной системы?',
        answer: 'Стандартная замена колодок занимает около 1-2 часов. Полное обслуживание, включая замену жидкости и проверку всей системы, может занять 2-3 часа в зависимости от модели электромобиля.'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Диагностика',
        description: 'Проверка состояния тормозной системы, измерение толщины колодок и дисков.'
      },
      {
        step: 2,
        title: 'Демонтаж компонентов',
        description: 'Снятие колес и демонтаж изношенных тормозных колодок или других компонентов.'
      },
      {
        step: 3,
        title: 'Установка новых деталей',
        description: 'Монтаж новых тормозных колодок, при необходимости замена других компонентов.'
      },
      {
        step: 4,
        title: 'Замена жидкости',
        description: 'При необходимости производится замена тормозной жидкости с полной прокачкой системы.'
      },
      {
        step: 5,
        title: 'Тестирование',
        description: 'Проверка эффективности торможения, отсутствия шумов и вибраций при движении.'
      }
    ],
    image: '/images/services/brake-service.jpg'
  },
  'battery-service': {
    id: '4',
    title: 'Работа с силовым аккумулятором',
    description: 'Профессиональное обслуживание и ремонт высоковольтной батареи электромобиля',
    fullDescription: [
      'Высоковольтная батарея является самым дорогим и сложным компонентом электромобиля, от ее состояния напрямую зависит запас хода и общая производительность автомобиля.',
      'Наш сервис предлагает полный спектр услуг по обслуживанию и ремонту аккумуляторных блоков, от замены стандартного 12В аккумулятора до полной разборки и диагностики высоковольтной батареи.',
      'Все работы выполняются сертифицированными специалистами с соблюдением всех мер безопасности и технологических требований производителя.'
    ],
    icon: 'battery',
    price: 'от 5 000 ₽',
    features: [
      'Замена аккумулятора низкого напряжения (5 000 ₽)',
      'Диагностика состояния высоковольтной батареи',
      'Разборка и сборка силового аккумуляторного блока (30 000 ₽)',
      'Замена отдельных модулей при необходимости',
      'Балансировка ячеек',
      'Восстановление емкости батареи',
      'Ремонт системы охлаждения аккумулятора'
    ],
    benefits: [
      'Увеличение запаса хода',
      'Продление срока службы батареи',
      'Экономия на покупке новой батареи',
      'Стабильная работа электроники автомобиля',
      'Восстановление первоначальных характеристик'
    ],
    faq: [
      {
        question: 'Как понять, что батарея требует обслуживания?',
        answer: 'Основные признаки: уменьшение запаса хода, дольше заряжается, перегрев батареи при зарядке, появление ошибок на приборной панели, нестабильная работа электроники автомобиля.'
      },
      {
        question: 'Сколько служит высоковольтная батарея?',
        answer: 'Срок службы обычно составляет 8-10 лет или 150-200 тыс. км пробега. Однако, правильное обслуживание и эксплуатация могут значительно продлить этот срок.'
      },
      {
        question: 'Опасно ли разбирать высоковольтную батарею?',
        answer: 'Работа с высоковольтными компонентами требует специальных знаний, оборудования и мер безопасности. Наши специалисты проходят специальное обучение и работают в соответствии со всеми требованиями безопасности.'
      },
      {
        question: 'Сколько времени занимает разборка и сборка аккумуляторного блока?',
        answer: 'Полная разборка, диагностика и сборка высоковольтной батареи обычно занимает 1-3 дня в зависимости от модели электромобиля и сложности выявленных проблем.'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Диагностика',
        description: 'Проверка состояния и параметров батареи, выявление неисправностей.'
      },
      {
        step: 2,
        title: 'Демонтаж',
        description: 'При необходимости производится демонтаж батареи из автомобиля.'
      },
      {
        step: 3,
        title: 'Разборка и ремонт',
        description: 'Разборка аккумуляторного блока, замена неисправных компонентов, балансировка ячеек.'
      },
      {
        step: 4,
        title: 'Сборка и тестирование',
        description: 'Сборка батареи, проверка всех параметров и тестирование под нагрузкой.'
      },
      {
        step: 5,
        title: 'Установка и финальная проверка',
        description: 'Установка батареи в автомобиль, проверка всех систем, тестовая поездка.'
      }
    ],
    image: '/images/services/battery-service.jpg'
  }
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<ServiceDetail | null>(null);
  
  useEffect(() => {
    // В реальном приложении здесь был бы API запрос
    if (slug && servicesData[slug]) {
      setService(servicesData[slug]);
      document.title = `${servicesData[slug].title} - АвтосервисЛюбань`;
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
          {/* Хлебные крошки */}
          <div className="mb-6">
            <div className="flex items-center text-sm">
              <Link to="/" className="text-white/70 hover:text-white transition-colors">
                Главная
              </Link>
              <svg 
                className="w-3 h-3 mx-2 text-white/40" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
              <Link to="/services" className="text-white/70 hover:text-white transition-colors">
                Услуги
              </Link>
              <svg 
                className="w-3 h-3 mx-2 text-white/40" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
              <span className="text-accent-blue/90 font-medium">
                {service.title}
              </span>
            </div>
          </div>
          
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
                  to={`/contacts?service=${slug}#form`}
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
          
          {/* Отзывы по услуге */}
          <ServiceReviews serviceName={service.title} limit={3} />
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
                to={`/contacts?service=${slug}#form`}
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