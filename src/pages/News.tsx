import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import NewsletterForm from '../components/NewsletterForm'

// Интерфейс для новости
interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  link?: string; // Опциональная внешняя ссылка на полную новость
}

// Пример данных новостей (в реальном проекте будет API запрос)
const newsData: NewsItem[] = [
  {
    id: '1',
    title: 'Открытие нового диагностического центра в Любани',
    excerpt: 'Мы рады сообщить об открытии нового диагностического центра для электромобилей в Любани, оснащенного современным оборудованием.',
    date: '2023-11-15',
    category: 'Компания',
    image: '/images/blog/tesla-charging.webp'
  },
  {
    id: '2',
    title: 'Запуск программы лояльности для постоянных клиентов',
    excerpt: 'С 1 декабря 2023 года мы запускаем программу лояльности для постоянных клиентов с накопительной системой скидок и специальными предложениями.',
    date: '2023-11-10',
    category: 'Акции',
    image: '/images/blog/battery-life.webp'
  },
  {
    id: '3',
    title: 'Расширение линейки поддерживаемых моделей электромобилей',
    excerpt: 'Наш сервис теперь предоставляет полное обслуживание для новых моделей электромобилей BYD, NIO и Rivian.',
    date: '2023-10-28',
    category: 'Услуги',
    image: '/images/blog/myths.webp'
  },
  {
    id: '4',
    title: 'Рост продаж электромобилей в Ленинградской области на 35%',
    excerpt: 'По данным статистики, в 2023 году продажи электромобилей в Ленинградской области выросли на 35% по сравнению с предыдущим годом.',
    date: '2023-10-15',
    category: 'Тренды',
    image: '/images/blog/winter-driving.webp',
    link: 'https://example.com/news/ev-sales-growth'
  },
  {
    id: '5',
    title: 'Мастер-класс по эксплуатации электромобилей зимой',
    excerpt: 'Приглашаем всех владельцев электромобилей на бесплатный мастер-класс по подготовке и эксплуатации электротранспорта в зимний период.',
    date: '2023-10-05',
    category: 'События',
    image: '/images/blog/winter-driving.webp'
  },
  {
    id: '6',
    title: 'Новое оборудование для быстрой диагностики высоковольтных батарей',
    excerpt: 'Наш автосервис приобрел инновационное оборудование, позволяющее проводить быструю и точную диагностику высоковольтных батарей всех типов.',
    date: '2023-09-20',
    category: 'Технологии',
    image: '/images/blog/battery-life.webp'
  },
  {
    id: '7',
    title: 'Строительство сети быстрых зарядных станций в регионе',
    excerpt: 'Началось строительство сети быстрых зарядных станций на основных магистралях Ленинградской области. Первые станции заработают уже в декабре.',
    date: '2023-09-12',
    category: 'Инфраструктура',
    image: '/images/blog/tesla-charging.webp',
    link: 'https://example.com/news/charging-network-construction'
  },
  {
    id: '8',
    title: 'Скидка 20% на комплексную диагностику электромобилей',
    excerpt: 'До конца ноября действует специальное предложение: скидка 20% на комплексную диагностику любого электромобиля.',
    date: '2023-09-01',
    category: 'Акции',
    image: '/images/blog/myths.webp'
  }
];

// Уникальные категории для фильтрации
const categories = Array.from(new Set(newsData.map(item => item.category)));

const News = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  useEffect(() => {
    document.title = 'Новости - АвтосервисЛюбань'
    window.scrollTo(0, 0)
  }, []);
  
  // Фильтрация новостей по категории и поисковому запросу
  const filteredNews = newsData.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  // Форматирование даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };
  
  // Анимации для контейнера и элементов
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
              Новости компании и индустрии
            </h1>
            <p className="text-text-secondary text-lg md:text-xl">
              Актуальные новости нашего сервиса, мероприятия, акции и важные события 
              в мире электротранспорта
            </p>
          </div>
        </div>
      </section>
      
      {/* Основной контент */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Сайдбар */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Поиск */}
                <div className="glass-card p-6 rounded-xl">
                  <h2 className="text-xl font-bold mb-4">Поиск</h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Поиск новостей..."
                      className="w-full bg-bg-secondary/70 border border-white/10 rounded-full py-2 px-4 pl-10 focus:outline-none focus:border-accent-blue/50"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg 
                      className="absolute left-3 top-2.5 w-5 h-5 text-text-secondary" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                
                {/* Категории */}
                <div className="glass-card p-6 rounded-xl">
                  <h2 className="text-xl font-bold mb-4">Категории</h2>
                  <ul className="space-y-2">
                    <li>
                      <button
                        className={`w-full text-left py-2 px-3 rounded-lg transition-colors ${
                          activeCategory === 'all' ? 'bg-accent-blue/20 text-accent-blue' : 'hover:bg-bg-secondary'
                        }`}
                        onClick={() => setActiveCategory('all')}
                      >
                        Все новости
                      </button>
                    </li>
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          className={`w-full text-left py-2 px-3 rounded-lg transition-colors ${
                            activeCategory === category ? 'bg-accent-blue/20 text-accent-blue' : 'hover:bg-bg-secondary'
                          }`}
                          onClick={() => setActiveCategory(category)}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Подписка на новости */}
                <div className="glass-card p-6 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-green/20">
                  <h2 className="text-xl font-bold mb-4">Подписка на новости</h2>
                  <p className="text-text-secondary mb-4">
                    Получайте последние новости и специальные предложения на вашу почту
                  </p>
                  <NewsletterForm />
                </div>
              </div>
            </div>
            
            {/* Список новостей */}
            <div className="lg:col-span-3">
              {searchTerm && (
                <div className="mb-6 p-4 bg-bg-secondary/30 rounded-lg">
                  <p>
                    Результаты поиска по запросу: <span className="font-semibold">"{searchTerm}"</span>
                    <button 
                      className="ml-2 text-accent-blue hover:text-accent-green transition-colors"
                      onClick={() => setSearchTerm('')}
                    >
                      Сбросить
                    </button>
                  </p>
                </div>
              )}
              
              {/* Топ новость (первая новость отображается крупнее) */}
              {filteredNews.length > 0 && (
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="glass-card rounded-xl overflow-hidden hover:shadow-neon transition-all duration-300">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative h-64 md:h-full overflow-hidden">
                        <img 
                          src={filteredNews[0].image} 
                          alt={filteredNews[0].title} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-accent-blue/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                            {filteredNews[0].category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6 flex flex-col justify-between">
                        <div>
                          <div className="text-text-secondary text-sm mb-3">
                            {formatDate(filteredNews[0].date)}
                          </div>
                          
                          <h2 className="text-2xl font-bold mb-4 hover:text-accent-blue transition-colors">
                            {filteredNews[0].title}
                          </h2>
                          
                          <p className="text-text-secondary mb-6">
                            {filteredNews[0].excerpt}
                          </p>
                        </div>
                        
                        <div>
                          {filteredNews[0].link ? (
                            <a 
                              href={filteredNews[0].link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-accent-blue font-medium hover:text-accent-green transition-colors"
                            >
                              Читать на источнике
                              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          ) : (
                            <span className="text-accent-blue font-medium flex items-center">
                              Подробнее
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Остальные новости */}
              {filteredNews.length > 1 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {filteredNews.slice(1).map((newsItem) => (
                    <motion.article
                      key={newsItem.id}
                      variants={item}
                      className="glass-card rounded-xl overflow-hidden hover:shadow-neon transition-all duration-300"
                    >
                      <div>
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={newsItem.image} 
                            alt={newsItem.title} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-accent-blue/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                              {newsItem.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="text-text-secondary text-sm mb-3">
                            {formatDate(newsItem.date)}
                          </div>
                          
                          <h2 className="text-xl font-bold mb-3 hover:text-accent-blue transition-colors">
                            {newsItem.title}
                          </h2>
                          
                          <p className="text-text-secondary mb-4 line-clamp-3">
                            {newsItem.excerpt}
                          </p>
                          
                          <div className="flex justify-end">
                            {newsItem.link ? (
                              <a 
                                href={newsItem.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-accent-blue font-medium hover:text-accent-green transition-colors"
                              >
                                Читать на источнике
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            ) : (
                              <span className="text-accent-blue font-medium flex items-center">
                                Подробнее
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              ) : filteredNews.length === 0 ? (
                <div className="glass-card p-8 rounded-xl text-center">
                  <svg className="w-16 h-16 text-text-secondary/50 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-bold mb-2">Новости не найдены</h3>
                  <p className="text-text-secondary mb-4">
                    По вашему запросу не найдено новостей. Попробуйте изменить критерии поиска.
                  </p>
                  <button 
                    className="text-accent-blue hover:text-accent-green transition-colors"
                    onClick={() => {
                      setSearchTerm('');
                      setActiveCategory('all');
                    }}
                  >
                    Сбросить все фильтры
                  </button>
                </div>
              ) : null}
              
              {/* Пагинация */}
              {filteredNews.length > 0 && (
                <div className="mt-10 flex justify-center">
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 rounded-lg bg-bg-secondary/70 hover:bg-bg-secondary border border-white/10">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-accent-blue/20 text-accent-blue border border-accent-blue/30">1</button>
                    <button className="px-4 py-2 rounded-lg bg-bg-secondary/70 hover:bg-bg-secondary border border-white/10">2</button>
                    <button className="px-4 py-2 rounded-lg bg-bg-secondary/70 hover:bg-bg-secondary border border-white/10">3</button>
                    <button className="px-4 py-2 rounded-lg bg-bg-secondary/70 hover:bg-bg-secondary border border-white/10">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Призыв к действию */}
      <section className="py-16 bg-bg-secondary">
        <div className="container">
          <div className="glass-card p-8 md:p-12 rounded-xl bg-gradient-to-r from-accent-blue/10 to-accent-green/10 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Остались вопросы?
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-3xl mx-auto">
              Наши специалисты готовы проконсультировать вас по любым вопросам, связанным с обслуживанием 
              и ремонтом электромобилей. Запишитесь на консультацию уже сегодня!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contacts" 
                className="px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold transition-all duration-300 hover:shadow-neon hover:scale-105 text-center"
              >
                Связаться с нами
              </Link>
              <Link 
                to="/services" 
                className="px-8 py-4 rounded-full bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary font-semibold transition-all duration-300 hover:border-accent-blue/80 hover:shadow-neon text-center"
              >
                Наши услуги
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default News 