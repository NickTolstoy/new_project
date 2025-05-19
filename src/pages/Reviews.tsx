import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Интерфейс для отзыва
interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
  car: string;
  service: string;
  verified: boolean;
}

// Пример данных отзывов (в реальном проекте будет API запрос)
const reviewsData: Review[] = [
  {
    id: '1',
    author: 'Алексей К.',
    avatar: '/images/avatars/user1.jpg',
    rating: 5,
    date: '2023-10-15',
    text: 'Обращался по вопросу диагностики батареи Tesla Model 3. Специалисты быстро выявили проблему и устранили ее в тот же день. Очень профессиональный подход и внимание к деталям. Особенно понравилось то, что все этапы работы детально объяснили и показали, что именно было неисправно.',
    car: 'Tesla Model 3',
    service: 'Диагностика батареи',
    verified: true
  },
  {
    id: '2',
    author: 'Марина С.',
    avatar: '/images/avatars/user2.jpg',
    rating: 4,
    date: '2023-09-25',
    text: 'Обслуживаю свой Nissan Leaf уже второй год в этом сервисе. Всегда оперативно и качественно. В этот раз была небольшая проблема с зарядным портом, решили за пару часов. Единственный минус - иногда приходится ждать, так как много клиентов, но качество обслуживания того стоит.',
    car: 'Nissan Leaf',
    service: 'Ремонт зарядного порта',
    verified: true
  },
  {
    id: '3',
    author: 'Дмитрий Н.',
    rating: 5,
    date: '2023-09-10',
    text: 'Проходил плановое ТО для BMW i3. Мастера выполнили все работы точно в срок, дали полезные рекомендации по эксплуатации в зимний период. Цены адекватные, а главное - видно, что люди действительно разбираются в электромобилях, а не просто делают вид. Буду обращаться снова!',
    car: 'BMW i3',
    service: 'Техническое обслуживание',
    verified: true
  },
  {
    id: '4',
    author: 'Елена В.',
    avatar: '/images/avatars/user3.jpg',
    rating: 5,
    date: '2023-08-27',
    text: 'Обращалась по поводу обновления программного обеспечения в Audi e-tron. Все сделали быстро, плюс бесплатно проверили состояние батареи и дали рекомендации по зарядке. Очень приятно, когда к клиентам относятся с таким вниманием. Сервис на высшем уровне!',
    car: 'Audi e-tron',
    service: 'Обновление ПО',
    verified: true
  },
  {
    id: '5',
    author: 'Игорь П.',
    rating: 3,
    date: '2023-08-15',
    text: 'Обратился для диагностики странного шума в электродвигателе. Диагностику провели быстро, но на ремонт пришлось ожидать запчасти около недели. В целом работой доволен, но хотелось бы больше оперативности с запчастями. Понимаю, что для некоторых моделей это проблема, но всё же.',
    car: 'Hyundai Kona Electric',
    service: 'Ремонт электродвигателя',
    verified: true
  },
  {
    id: '6',
    author: 'Анна М.',
    avatar: '/images/avatars/user4.jpg',
    rating: 5,
    date: '2023-07-30',
    text: 'Великолепный сервис! Обратилась с проблемой резкого снижения запаса хода на моем Jaguar I-Pace. Мастера провели полную диагностику, выявили и устранили программный сбой в системе управления батареей. Запас хода восстановился полностью! Очень благодарна за профессионализм и честный подход.',
    car: 'Jaguar I-Pace',
    service: 'Диагностика и ремонт BMS',
    verified: true
  },
  {
    id: '7',
    author: 'Сергей К.',
    rating: 4,
    date: '2023-07-19',
    text: 'Ремонтировал высоковольтную батарею на Volkswagen ID.4. Работу выполнили качественно, подробно объяснили, что было сделано. Цена соответствует заявленной, без скрытых доплат. Единственное - пришлось ждать 2 дня, хотя изначально обещали сделать за один день.',
    car: 'Volkswagen ID.4',
    service: 'Ремонт высоковольтной батареи',
    verified: true
  },
  {
    id: '8',
    author: 'Олег В.',
    avatar: '/images/avatars/user5.jpg',
    rating: 5,
    date: '2023-07-05',
    text: 'Регулярно обслуживаю свою Tesla Model Y в этом сервисе и всегда остаюсь доволен. В этот раз была замена подшипников электродвигателя. Работа выполнена быстро и профессионально. Отдельное спасибо за систему уведомлений о статусе ремонта - очень удобно отслеживать процесс.',
    car: 'Tesla Model Y',
    service: 'Замена подшипников электродвигателя',
    verified: true
  }
];

// Данные о рейтингах сервиса
const serviceRatings = {
  average: 4.5,
  total: 127,
  breakdown: {
    5: 76,
    4: 38,
    3: 10,
    2: 2,
    1: 1
  }
};

// Категории сервисов для фильтрации
const serviceCategories = [
  'Все услуги',
  'Диагностика',
  'Ремонт батареи',
  'Ремонт электродвигателя',
  'Обновление ПО',
  'Техническое обслуживание'
];

const Reviews = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Все услуги');
  const [displayCount, setDisplayCount] = useState<number>(4);
  
  useEffect(() => {
    document.title = 'Отзывы клиентов - ЭлектроСервис'
    window.scrollTo(0, 0)
  }, []);
  
  // Фильтрация отзывов по категории
  const filteredReviews = activeCategory === 'Все услуги'
    ? reviewsData
    : reviewsData.filter(review => review.service.includes(activeCategory));
  
  // Отображаемые отзывы с учетом ограничения количества
  const displayedReviews = filteredReviews.slice(0, displayCount);
  
  // Функция для загрузки дополнительных отзывов
  const loadMoreReviews = () => {
    setDisplayCount(prev => prev + 4);
  };
  
  // Функция для отображения звездного рейтинга
  const renderStars = (rating: number) => {
    const stars: JSX.Element[] = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Заполненная звезда
        stars.push(
          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        // Незаполненная звезда
        stars.push(
          <svg key={i} className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      }
    }
    return stars;
  };
  
  // Функция для форматирования даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };
  
  // Рассчет процента для прогресс-баров
  const calculatePercentage = (count: number) => {
    return (count / serviceRatings.total) * 100;
  };
  
  // Анимации
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <>
      {/* Шапка страницы */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-bg-secondary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Отзывы наших клиентов
            </h1>
            <p className="text-text-secondary text-lg md:text-xl">
              Мнения владельцев электромобилей о качестве нашего обслуживания, 
              ремонта и сервиса.
            </p>
          </div>
        </div>
      </section>
      
      {/* Общая статистика рейтингов */}
      <section className="py-16">
        <div className="container">
          <div className="glass-card p-8 rounded-xl mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {renderStars(Math.round(serviceRatings.average))}
                </div>
                <div className="text-4xl font-bold">{serviceRatings.average.toFixed(1)}</div>
                <p className="text-text-secondary">Средняя оценка</p>
              </div>
              
              <div className="md:col-span-2">
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <div className="flex-shrink-0 w-8 text-text-secondary">
                        {rating} ★
                      </div>
                      <div className="w-full mx-3 bg-bg-secondary/50 rounded-full h-3 overflow-hidden">
                        <motion.div 
                          className="h-full bg-accent-blue"
                          initial={{ width: 0 }}
                          animate={{ width: `${calculatePercentage(serviceRatings.breakdown[rating as keyof typeof serviceRatings.breakdown])}%` }}
                          transition={{ duration: 1 }}
                        ></motion.div>
                      </div>
                      <div className="flex-shrink-0 w-12 text-right text-text-secondary">
                        {serviceRatings.breakdown[rating as keyof typeof serviceRatings.breakdown]}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-text-secondary text-right mt-2">
                  Всего отзывов: {serviceRatings.total}
                </p>
              </div>
            </div>
          </div>
          
          {/* Фильтр категорий */}
          <div className="mb-8 overflow-x-auto hide-scrollbar">
            <div className="flex space-x-2 min-w-max">
              {serviceCategories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-accent-blue to-accent-green text-text-primary shadow-neon'
                      : 'bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary hover:border-accent-blue/80'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Список отзывов */}
          <motion.div
            className="space-y-6"
            variants={container}
            initial="hidden"
            animate="show"
            key={activeCategory} // Ключ для пересоздания анимации при смене категории
          >
            {displayedReviews.length > 0 ? (
              displayedReviews.map((review) => (
                <motion.div
                  key={review.id}
                  variants={item}
                  className="glass-card p-6 rounded-xl"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      {review.avatar ? (
                        <img 
                          src={review.avatar} 
                          alt={review.author} 
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-accent-blue/30 flex items-center justify-center">
                          <span className="text-xl font-bold">{review.author.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="font-bold">{review.author}</h3>
                          <div className="flex items-center mb-1">
                            <div className="flex mr-2">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-text-secondary text-sm">
                              {formatDate(review.date)}
                            </span>
                          </div>
                        </div>
                        
                        {review.verified && (
                          <div className="flex items-center text-accent-green text-sm mt-2 sm:mt-0">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Проверенный клиент
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3 mt-2">
                        <span className="inline-flex items-center bg-bg-secondary/50 rounded-full px-3 py-1 text-sm">
                          <svg className="w-4 h-4 mr-1 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          {review.car}
                        </span>
                        <span className="inline-flex items-center bg-bg-secondary/50 rounded-full px-3 py-1 text-sm">
                          <svg className="w-4 h-4 mr-1 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {review.service}
                        </span>
                      </div>
                      
                      <p className="text-text-secondary">{review.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="glass-card p-8 rounded-xl text-center">
                <svg className="w-16 h-16 text-text-secondary/50 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold mb-2">Отзывы не найдены</h3>
                <p className="text-text-secondary mb-4">
                  В выбранной категории пока нет отзывов. Попробуйте выбрать другую категорию.
                </p>
                <button 
                  className="text-accent-blue hover:text-accent-green transition-colors"
                  onClick={() => setActiveCategory('Все услуги')}
                >
                  Показать все отзывы
                </button>
              </div>
            )}
          </motion.div>
          
          {/* Кнопка "Показать больше" */}
          {displayedReviews.length < filteredReviews.length && (
            <div className="mt-10 text-center">
              <button
                onClick={loadMoreReviews}
                className="px-6 py-3 rounded-full bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary font-semibold transition-all duration-300 hover:border-accent-blue/80 hover:shadow-neon"
              >
                Показать больше отзывов
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Добавить отзыв */}
      <section className="py-16 bg-bg-secondary">
        <div className="container">
          <div className="glass-card p-8 md:p-12 rounded-xl bg-gradient-to-r from-accent-blue/10 to-accent-green/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Поделитесь своим опытом
                </h2>
                <p className="text-text-secondary mb-6">
                  Ваши отзывы помогают нам становиться лучше и дают другим клиентам представление о качестве наших услуг.
                  Если вы уже пользовались нашими услугами, мы будем рады узнать ваше мнение.
                </p>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-accent-green mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Нам важен каждый отзыв</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-accent-green mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Мы учитываем все предложения по улучшению сервиса</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-accent-green mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Ваш отзыв поможет и другим владельцам электромобилей</span>
                  </li>
                </ul>
                
                <Link 
                  to="/contacts#review-form" 
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold transition-all duration-300 hover:shadow-neon hover:scale-105 inline-block"
                >
                  Оставить отзыв
                </Link>
              </div>
              
              <div className="hidden lg:block">
                <img 
                  src="/images/review-image.jpg" 
                  alt="Оставить отзыв о сервисе" 
                  className="rounded-xl shadow-neon"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Reviews 