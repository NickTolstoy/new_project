import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Интерфейс для статьи блога
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
}

// Пример данных блога (в реальном проекте будет API запрос)
const blogData: BlogPost[] = [
  {
    id: '1',
    slug: 'how-to-extend-ev-battery-life',
    title: 'Как продлить срок службы батареи электромобиля',
    excerpt: 'Советы по эксплуатации, которые помогут увеличить ресурс высоковольтной батареи вашего электромобиля и сохранить ее емкость на долгие годы.',
    date: '2023-10-10',
    author: 'Антон Гришин',
    category: 'Обслуживание',
    tags: ['батарея', 'советы', 'эксплуатация'],
    image: '/images/blog/battery-life.jpg'
  },
  {
    id: '2',
    slug: 'ev-winter-driving-tips',
    title: 'Особенности эксплуатации электромобиля зимой',
    excerpt: 'Подготовка электромобиля к зимнему сезону. Как сохранить запас хода в холодное время года и избежать проблем с зарядкой.',
    date: '2023-09-25',
    author: 'Мария Климова',
    category: 'Эксплуатация',
    tags: ['зима', 'советы', 'зарядка'],
    image: '/images/blog/winter-ev.jpg'
  },
  {
    id: '3',
    slug: 'comparing-tesla-charging-options',
    title: 'Сравнение вариантов зарядки Tesla',
    excerpt: 'Обзор различных способов зарядки автомобилей Tesla: домашняя зарядка, Supercharger, общественные зарядные станции. Плюсы и минусы каждого варианта.',
    date: '2023-09-15',
    author: 'Павел Строгов',
    category: 'Зарядка',
    tags: ['Tesla', 'зарядка', 'сравнение'],
    image: '/images/blog/tesla-charging.jpg'
  },
  {
    id: '4',
    slug: 'common-ev-myths-debunked',
    title: 'Развенчиваем мифы об электромобилях',
    excerpt: 'Анализ распространенных заблуждений об электромобилях: дальность хода, время зарядки, стоимость обслуживания и экологичность.',
    date: '2023-08-30',
    author: 'Антон Гришин',
    category: 'Образование',
    tags: ['мифы', 'факты', 'новичкам'],
    image: '/images/blog/ev-myths.jpg'
  },
  {
    id: '5',
    slug: 'ev-battery-recycling',
    title: 'Утилизация и переработка батарей электромобилей',
    excerpt: 'Что происходит с аккумуляторами электромобилей после окончания срока службы? Современные технологии утилизации и вторичного использования.',
    date: '2023-08-15',
    author: 'Мария Климова',
    category: 'Экология',
    tags: ['батарея', 'утилизация', 'экология'],
    image: '/images/blog/battery-recycling.jpg'
  },
  {
    id: '6',
    slug: 'new-ev-technologies-2023',
    title: 'Новые технологии в электромобилях 2023 года',
    excerpt: 'Обзор инновационных решений в электромобилях нового модельного года: батареи, моторы, автопилот и другие системы.',
    date: '2023-07-20',
    author: 'Павел Строгов',
    category: 'Технологии',
    tags: ['инновации', 'технологии', '2023'],
    image: '/images/blog/new-technologies.jpg'
  }
];

// Уникальные категории для фильтрации
const categories = Array.from(new Set(blogData.map(post => post.category)));

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  useEffect(() => {
    document.title = 'Блог - АвтосервисЛюбань'
    window.scrollTo(0, 0)
  }, []);
  
  // Фильтрация постов по категории и поисковому запросу
  const filteredPosts = blogData.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
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
              Блог о электромобилях
            </h1>
            <p className="text-text-secondary text-lg md:text-xl">
              Полезные статьи, советы по эксплуатации, новости индустрии и обзоры 
              новейших технологий в мире электротранспорта.
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
                      placeholder="Поиск статей..."
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
                        Все статьи
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
                
                {/* Популярные теги */}
                <div className="glass-card p-6 rounded-xl">
                  <h2 className="text-xl font-bold mb-4">Популярные теги</h2>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(blogData.flatMap(post => post.tags))).map((tag) => (
                      <button
                        key={tag}
                        className="bg-bg-secondary/70 hover:bg-bg-secondary border border-white/10 rounded-full px-3 py-1 text-sm transition-colors"
                        onClick={() => setSearchTerm(tag)}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Список статей */}
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
              
              {filteredPosts.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {filteredPosts.map((post) => (
                    <motion.article
                      key={post.id}
                      variants={item}
                      className="glass-card rounded-xl overflow-hidden hover:shadow-neon transition-all duration-300"
                    >
                      <Link to={`/blog/${post.slug}`} className="block">
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-accent-blue/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center text-text-secondary text-sm mb-3">
                            <span>{formatDate(post.date)}</span>
                            <span className="mx-2">•</span>
                            <span>{post.author}</span>
                          </div>
                          
                          <h2 className="text-xl font-bold mb-3 hover:text-accent-blue transition-colors">
                            {post.title}
                          </h2>
                          
                          <p className="text-text-secondary mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-text-secondary text-xs px-2 py-1 bg-bg-secondary/50 rounded-full"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            
                            <span className="text-accent-blue font-medium flex items-center">
                              Читать
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </motion.div>
              ) : (
                <div className="glass-card p-8 rounded-xl text-center">
                  <svg className="w-16 h-16 text-text-secondary/50 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-bold mb-2">Статьи не найдены</h3>
                  <p className="text-text-secondary mb-4">
                    По вашему запросу не найдено статей. Попробуйте изменить критерии поиска.
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
              )}
              
              {/* Пагинация */}
              {filteredPosts.length > 0 && (
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
                to="/faq" 
                className="px-8 py-4 rounded-full bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary font-semibold transition-all duration-300 hover:border-accent-blue/80 hover:shadow-neon text-center"
              >
                Часто задаваемые вопросы
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Blog 