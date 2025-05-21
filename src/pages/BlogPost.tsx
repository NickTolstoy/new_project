import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Интерфейс для статьи блога
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  category: string;
  tags: string[];
  image: string;
  relatedPosts?: string[];
}

// Пример данных блога (в реальном проекте будет API запрос)
const blogData: Record<string, BlogPost> = {
  'how-to-extend-ev-battery-life': {
    id: '1',
    slug: 'how-to-extend-ev-battery-life',
    title: 'Как продлить срок службы батареи электромобиля',
    excerpt: 'Советы по эксплуатации, которые помогут увеличить ресурс высоковольтной батареи вашего электромобиля и сохранить ее емкость на долгие годы.',
    content: [
      'Батарея — самый дорогой компонент электромобиля, и от ее состояния зависит не только запас хода, но и стоимость автомобиля на вторичном рынке. В этой статье мы расскажем о проверенных способах продления срока службы батареи и сохранения ее емкости.',
      '## Оптимальный уровень заряда\n\nБольшинство производителей рекомендуют поддерживать уровень заряда батареи в диапазоне 20-80%. Постоянная зарядка до 100% и эксплуатация с минимальным зарядом ускоряют деградацию батареи. Используйте настройки ограничения заряда в автомобиле, если такая функция доступна.',
      '## Избегайте экстремальных температур\n\nВысокие и низкие температуры негативно влияют на батарею. По возможности паркуйте автомобиль в тени летом и в отапливаемом гараже зимой. Многие современные электромобили имеют системы термоконтроля батареи, которые работают даже при выключенном автомобиле, для поддержания оптимальной температуры.',
      '## Используйте умеренную скорость зарядки\n\nСверхбыстрая зарядка удобна в поездках, но регулярное использование быстрых зарядных станций (DC) ускоряет старение батареи. Для повседневной зарядки предпочтительнее использовать домашние зарядные устройства (AC).',
      '## Избегайте глубоких разрядов\n\nНе допускайте полного разряда батареи. Планируйте поездки так, чтобы всегда оставался запас хода минимум 10-15%. Современные литий-ионные аккумуляторы не имеют "эффекта памяти", поэтому можно заряжать их при любом уровне заряда.',
      '## Плавный стиль вождения\n\nРезкие ускорения и торможения требуют большого тока от батареи, что повышает ее температуру и ускоряет износ. Плавный стиль вождения не только увеличит запас хода, но и продлит срок службы батареи.',
      '## Правильное хранение при длительном простое\n\nЕсли вы не планируете использовать электромобиль длительное время, оставьте уровень заряда около 50% (не 100% и не 0%). По возможности подключите автомобиль к зарядному устройству с настройкой ограничения заряда или периодически проверяйте и поддерживайте этот уровень.',
      '## Регулярное обслуживание\n\nПроходите регулярное техническое обслуживание и диагностику батареи. Специализированные сервисы могут выявить проблемы на ранней стадии и рекомендовать меры по продлению срока службы батареи.',
      'Соблюдение этих рекомендаций поможет сохранить емкость батареи вашего электромобиля на долгие годы и избежать дорогостоящего ремонта или замены. Помните, что фактический срок службы батареи зависит от множества факторов, включая модель автомобиля, условия эксплуатации и качество изготовления самой батареи.'
    ],
    date: '2023-10-10',
    author: 'Антон Гришин',
    authorRole: 'Инженер по обслуживанию электромобилей',
    authorAvatar: '/images/avatars/anton.jpg',
    category: 'Обслуживание',
    tags: ['батарея', 'советы', 'эксплуатация'],
    image: '/images/blog/battery-life.jpg',
    relatedPosts: ['ev-winter-driving-tips', 'ev-battery-recycling']
  },
  'ev-winter-driving-tips': {
    id: '2',
    slug: 'ev-winter-driving-tips',
    title: 'Особенности эксплуатации электромобиля зимой',
    excerpt: 'Подготовка электромобиля к зимнему сезону. Как сохранить запас хода в холодное время года и избежать проблем с зарядкой.',
    content: [
      'Зима — сложный период для электромобилей. Низкие температуры влияют на производительность батареи, запас хода и скорость зарядки. Но при правильном подходе можно минимизировать эти проблемы и комфортно использовать электромобиль даже в холодное время года.',
      '## Снижение запаса хода зимой\n\nПри отрицательных температурах запас хода электромобиля может снижаться на 20-40%. Это происходит по нескольким причинам: батарея работает менее эффективно на холоде, требуется дополнительная энергия для обогрева салона и батареи, повышается сопротивление качению на заснеженной дороге.',
      '## Предварительный прогрев\n\nИспользуйте функцию предварительного прогрева автомобиля, пока он подключен к зарядному устройству. Это позволит прогреть салон и батарею за счет электросети, а не заряда батареи. Многие электромобили поддерживают удаленный запуск прогрева через мобильное приложение.',
      '## Использование сидений и руля с подогревом\n\nОбогрев сидений и руля потребляет значительно меньше энергии, чем обогрев всего салона. Отдавайте предпочтение этим системам обогрева, когда возможно.',
      '## Правильная парковка\n\nПо возможности паркуйте автомобиль в отапливаемом гараже или хотя бы в закрытом помещении. Если это невозможно, старайтесь не оставлять автомобиль на сильном ветру или в местах, где скапливается снег.',
      '## Особенности зарядки\n\nСкорость зарядки на холоде может снизиться, особенно на быстрых зарядных станциях. Планируйте больше времени на зарядку зимой. Если возможно, заряжайте автомобиль сразу после поездки, когда батарея еще теплая.',
      '## Поддержание заряда\n\nСтарайтесь не допускать глубокого разряда батареи зимой. При низком заряде системы подогрева батареи могут отключиться, что приведет к еще большему снижению производительности и возможным проблемам при зарядке.',
      '## Контроль давления в шинах\n\nРегулярно проверяйте давление в шинах, так как оно может снижаться при холодной погоде. Пониженное давление увеличивает сопротивление качению и снижает запас хода.',
      '## Плавный стиль вождения\n\nЗимой особенно важно избегать резких ускорений и торможений. Используйте режим рекуперации для плавного замедления и подзарядки батареи.',
      'Применение этих рекомендаций поможет вам комфортно использовать электромобиль зимой и минимизировать снижение запаса хода. Помните, что некоторые современные модели электромобилей имеют усовершенствованные системы терморегуляции батареи, что снижает влияние низких температур на их производительность.'
    ],
    date: '2023-09-25',
    author: 'Мария Климова',
    authorRole: 'Консультант по эксплуатации электромобилей',
    authorAvatar: '/images/avatars/maria.jpg',
    category: 'Эксплуатация',
    tags: ['зима', 'советы', 'зарядка'],
    image: '/images/blog/winter-ev.jpg',
    relatedPosts: ['how-to-extend-ev-battery-life', 'common-ev-myths-debunked']
  }
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  
  useEffect(() => {
    // В реальном приложении здесь был бы API запрос
    if (slug && blogData[slug]) {
      setPost(blogData[slug]);
      document.title = `${blogData[slug].title} - АвтосервисЛюбань`;
      
      // Загрузка связанных статей
      if (blogData[slug].relatedPosts && blogData[slug].relatedPosts.length > 0) {
        const related = blogData[slug].relatedPosts
          .map(relatedSlug => blogData[relatedSlug])
          .filter(Boolean);
        setRelatedPosts(related);
      }
    }
    
    window.scrollTo(0, 0);
  }, [slug]);
  
  // Форматирование даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };
  
  // Разделение текста на абзацы и заголовки (простая markdown-подобная обработка)
  const formatContent = (content: string) => {
    if (content.startsWith('## ')) {
      // Это заголовок
      return (
        <h2 className="text-2xl font-bold my-6">
          {content.replace('## ', '')}
        </h2>
      );
    }
    
    // Обычный абзац
    return <p className="text-text-secondary my-4">{content}</p>;
  };
  
  if (!post) {
    return (
      <div className="container py-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Статья не найдена</h2>
          <p className="text-text-secondary mb-6">
            Запрашиваемая статья не найдена или была удалена.
          </p>
          <Link 
            to="/blog" 
            className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold transition-all duration-300 hover:shadow-neon inline-block"
          >
            Вернуться к блогу
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
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-text-secondary hover:text-accent-blue mb-4 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Вернуться к блогу
            </Link>
            
            <span className="bg-accent-blue/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
              {post.category}
            </span>
            
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center text-text-secondary mb-6">
              <span>{formatDate(post.date)}</span>
              <span className="mx-3">•</span>
              <span>Автор: {post.author}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blog?tag=${tag}`}
                  className="bg-bg-secondary/70 hover:bg-bg-secondary border border-white/10 rounded-full px-3 py-1 text-sm transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Основное содержимое */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Изображение статьи */}
                <div className="rounded-xl overflow-hidden mb-8">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-auto"
                  />
                </div>
                
                {/* Содержимое статьи */}
                <div className="glass-card p-8 rounded-xl">
                  <div className="prose prose-invert max-w-none">
                    {post.content.map((paragraph, index) => (
                      <div key={index}>
                        {paragraph.split('\n\n').map((text, i) => (
                          <React.Fragment key={i}>
                            {formatContent(text)}
                          </React.Fragment>
                        ))}
                      </div>
                    ))}
                  </div>
                  
                  {/* Автор */}
                  <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                        <img 
                          src={post.authorAvatar || '/images/avatars/default.jpg'} 
                          alt={post.author} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{post.author}</h3>
                        {post.authorRole && (
                          <p className="text-text-secondary">{post.authorRole}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Связанные статьи */}
                {relatedPosts.length > 0 && (
                  <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-6">Похожие статьи</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost.id}
                          to={`/blog/${relatedPost.slug}`}
                          className="glass-card p-6 rounded-xl flex hover:shadow-neon transition-all duration-300"
                        >
                          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 mr-4">
                            <img 
                              src={relatedPost.image} 
                              alt={relatedPost.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold hover:text-accent-blue transition-colors line-clamp-2 mb-2">
                              {relatedPost.title}
                            </h3>
                            <span className="text-text-secondary text-sm">
                              {formatDate(relatedPost.date)}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Блок с призывом к действию */}
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">Есть вопросы?</h3>
                  <p className="text-text-secondary mb-6">
                    Наши специалисты готовы проконсультировать вас по всем вопросам, связанным с обслуживанием электромобилей.
                  </p>
                  <Link 
                    to="/contacts" 
                    className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold transition-all duration-300 hover:shadow-neon text-center block"
                  >
                    Связаться с нами
                  </Link>
                </div>
                
                {/* Популярные статьи */}
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">Популярные статьи</h3>
                  <ul className="space-y-4">
                    {Object.values(blogData)
                      .filter(blogPost => blogPost.slug !== post.slug)
                      .slice(0, 3)
                      .map((blogPost) => (
                        <li key={blogPost.id}>
                          <Link 
                            to={`/blog/${blogPost.slug}`}
                            className="flex items-start hover:text-accent-blue transition-colors"
                          >
                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 mr-3">
                              <img 
                                src={blogPost.image} 
                                alt={blogPost.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium line-clamp-2">{blogPost.title}</h4>
                              <span className="text-text-secondary text-xs">
                                {formatDate(blogPost.date)}
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                  </ul>
                  <Link 
                    to="/blog" 
                    className="text-accent-blue hover:text-accent-green transition-colors mt-4 inline-block"
                  >
                    Все статьи
                  </Link>
                </div>
                
                {/* Категории */}
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">Категории</h3>
                  <ul className="space-y-2">
                    {Array.from(new Set(Object.values(blogData).map(post => post.category))).map((category) => (
                      <li key={category}>
                        <Link
                          to={`/blog?category=${category}`}
                          className={`block py-2 px-3 rounded-lg transition-colors hover:bg-bg-secondary ${
                            category === post.category ? 'bg-accent-blue/20 text-accent-blue' : ''
                          }`}
                        >
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Призыв к действию */}
      <section className="py-16 bg-bg-secondary">
        <div className="container">
          <div className="glass-card p-8 md:p-12 rounded-xl bg-gradient-to-r from-accent-blue/10 to-accent-green/10 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Нужна консультация специалиста?
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-3xl mx-auto">
              Наши эксперты готовы ответить на ваши вопросы и помочь с обслуживанием вашего электромобиля.
              Запишитесь на консультацию или диагностику уже сегодня!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contacts" 
                className="px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold transition-all duration-300 hover:shadow-neon hover:scale-105 text-center"
              >
                Записаться на консультацию
              </Link>
              <Link 
                to="/services" 
                className="px-8 py-4 rounded-full bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary font-semibold transition-all duration-300 hover:border-accent-blue/80 hover:shadow-neon text-center"
              >
                Услуги сервиса
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogPostPage 