import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useAnimation } from 'framer-motion'

// Интерфейс для предложения
interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  price: string;
  oldPrice?: string;
  imageSrc: string;
  imageWebp: string;
  link: string;
  badge?: string;
}

// Демо-данные для спецпредложений (10 элементов)
const offers: SpecialOffer[] = [
  {
    id: 'offer1',
    title: 'Комплексная диагностика',
    description: 'Полная проверка состояния всех систем электромобиля с выдачей подробного отчета',
    price: '4 900 ₽',
    oldPrice: '7 500 ₽',
    imageSrc: '/images/offers/diagnostics.jpg',
    imageWebp: '/images/offers/diagnostics.webp',
    link: '/contacts#form',
    badge: 'Популярно'
  },
  {
    id: 'offer2',
    title: 'Обновление ПО',
    description: 'Установка последних версий программного обеспечения с активацией дополнительных функций',
    price: '3 900 ₽',
    oldPrice: '5 000 ₽',
    imageSrc: '/images/offers/software.jpg',
    imageWebp: '/images/offers/software.webp',
    link: '/contacts#form',
    badge: 'Скидка 20%'
  },
  {
    id: 'offer3',
    title: 'Комплексное ТО',
    description: 'Полное техническое обслуживание с заменой всех необходимых расходников',
    price: '7 900 ₽',
    oldPrice: '12 000 ₽',
    imageSrc: '/images/offers/maintenance.jpg',
    imageWebp: '/images/offers/maintenance.webp',
    link: '/contacts#form',
    badge: 'Выгодно'
  },
  {
    id: 'offer4',
    title: 'Замена тормозных колодок',
    description: 'Замена тормозных колодок на передней и задней оси с диагностикой тормозной системы',
    price: '5 000 ₽',
    oldPrice: '6 500 ₽',
    imageSrc: '/images/offers/brakes.jpg',
    imageWebp: '/images/offers/brakes.webp',
    link: '/contacts#form',
    badge: 'Акция'
  },
  {
    id: 'offer5',
    title: 'Диагностика батареи',
    description: 'Детальная проверка состояния высоковольтной батареи с оценкой остаточной емкости',
    price: '3 500 ₽',
    oldPrice: '4 500 ₽',
    imageSrc: '/images/offers/battery.jpg',
    imageWebp: '/images/offers/battery.webp',
    link: '/contacts#form',
    badge: 'Скидка 15%'
  },
  {
    id: 'offer6',
    title: 'Установка зарядной станции',
    description: 'Подбор, доставка и монтаж домашней зарядной станции с подключением к электросети',
    price: '15 000 ₽',
    oldPrice: '20 000 ₽',
    imageSrc: '/images/offers/charger.jpg',
    imageWebp: '/images/offers/charger.webp',
    link: '/contacts#form',
    badge: 'Комплекс'
  },
  {
    id: 'offer7',
    title: 'Сезонная подготовка',
    description: 'Комплексная подготовка электромобиля к зимнему или летнему сезону',
    price: '5 500 ₽',
    oldPrice: '8 000 ₽',
    imageSrc: '/images/offers/seasonal.jpg',
    imageWebp: '/images/offers/seasonal.webp',
    link: '/contacts#form',
    badge: 'Сезонно'
  },
  {
    id: 'offer8',
    title: 'Восстановление батареи',
    description: 'Восстановление емкости и устранение дисбаланса в ячейках высоковольтной батареи',
    price: '25 000 ₽',
    oldPrice: '35 000 ₽',
    imageSrc: '/images/offers/battery-repair.jpg',
    imageWebp: '/images/offers/battery-repair.webp',
    link: '/contacts#form',
    badge: 'Эксклюзив'
  },
  {
    id: 'offer9',
    title: 'Полная полировка',
    description: 'Устранение царапин и восстановление глянца кузова с нанесением защитного покрытия',
    price: '12 000 ₽',
    oldPrice: '16 000 ₽',
    imageSrc: '/images/offers/polish.jpg',
    imageWebp: '/images/offers/polish.webp',
    link: '/contacts#form',
    badge: 'Детейлинг'
  },
  {
    id: 'offer10',
    title: 'Комплект зимних колёс',
    description: 'Подбор и установка комплекта зимних шин с хранением летнего комплекта',
    price: '45 000 ₽',
    oldPrice: '55 000 ₽',
    imageSrc: '/images/offers/wheels.jpg',
    imageWebp: '/images/offers/wheels.webp',
    link: '/contacts#form',
    badge: 'Комплект'
  }
];

const SpecialOffers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const progressAnimation = useAnimation();
  
  const totalItems = offers.length;
  const visibleItems = 4; // Количество видимых элементов
  const maxIndex = totalItems - visibleItems;
  
  // Автоматическая смена слайдов
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        if (currentIndex < maxIndex) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setCurrentIndex(0);
        }
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused, maxIndex]);
  
  // Обновление линии-индикатора
  useEffect(() => {
    const progress = (currentIndex / maxIndex) * 100;
    progressAnimation.start({
      width: `${progress}%`,
      transition: { duration: 0.3 }
    });
  }, [currentIndex, progressAnimation, maxIndex]);
  
  // Обработка свайпов
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isPaused) return;
    setIsPaused(true);
  };
  
  const handleTouchEnd = () => {
    setIsPaused(false);
  };
  
  return (
    <section className="py-12 md:pb-0 overflow-hidden">
      <div className="container">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Специальные предложения
          </h2>
        </div>
      </div>
      
      {/* Полноэкранная карусель без контейнера, чтобы избежать конфликтов отступов */}
      <div className="relative py-10 mb-0 mt-6">
        {/* Карусель */}
        <div 
          className="relative mx-auto"
          style={{ 
            width: 'calc(100% - 40px)',
            maxWidth: '1280px', 
            paddingTop: '15px',
            paddingBottom: '15px'
          }}
          ref={carouselRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden">
            <motion.div 
              className="flex justify-center"
              style={{
                width: `${totalItems * 25}%`,
                transform: `translateX(-${currentIndex * (100 / totalItems)}%)`
              }}
              animate={{ x: `-${currentIndex * (100 / totalItems)}%` }}
              transition={{ type: "tween", duration: 0.5 }}
            >
              {offers.map((offer) => (
                <div 
                  key={offer.id} 
                  style={{ width: `${100 / totalItems}%` }}
                  className="flex-shrink-0 px-4"
                >
                  <div 
                    className="glass-card h-full rounded-xl overflow-hidden hover:shadow-neon hover:scale-105 transition-all duration-300 shadow-lg"
                    style={{ 
                      transform: 'scale(1.0)',
                      transformOrigin: 'center',
                      margin: '0 auto',
                      height: 'calc(100% - 20px)'
                    }}
                  >
                    <div className="relative overflow-hidden aspect-video">
                      <picture>
                        <source srcSet={offer.imageWebp} type="image/webp" />
                        <img
                          src={offer.imageSrc}
                          alt={offer.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          loading="lazy"
                        />
                      </picture>
                      {offer.badge && (
                        <span className="absolute top-3 right-3 bg-accent-blue text-text-primary text-xs px-3 py-1 rounded-full shadow-md">
                          {offer.badge}
                        </span>
                      )}
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-lg font-bold mb-2">
                        {offer.title}
                      </h3>
                      
                      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                        {offer.description}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-lg font-bold text-accent-blue block">
                            {offer.price}
                          </span>
                          {offer.oldPrice && (
                            <span className="text-text-secondary text-sm line-through">
                              {offer.oldPrice}
                            </span>
                          )}
                        </div>
                        
                        <Link 
                          to={offer.link} 
                          className="text-accent-blue hover:text-accent-green transition-colors font-medium hover:underline"
                        >
                          Заказать
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Кнопки навигации */}
          <button 
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center glass-card border border-white/10 text-text-primary z-10 hover:bg-accent-blue/20 transition-colors shadow-lg"
            aria-label="Предыдущие предложения"
            disabled={currentIndex === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={() => setCurrentIndex(prev => Math.min(maxIndex, prev + 1))}
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center glass-card border border-white/10 text-text-primary z-10 hover:bg-accent-blue/20 transition-colors shadow-lg"
            aria-label="Следующие предложения"
            disabled={currentIndex === maxIndex}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Контейнер для индикатора */}
        <div className="container mt-2">
          {/* Линия-индикатор */}
          <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden max-w-4xl mx-auto">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-blue to-accent-green rounded-full"
              animate={progressAnimation}
            />
          </div>
          
          <div className="flex justify-center mt-4">
            <span className="text-sm text-text-secondary">
              {currentIndex + 1} - {Math.min(currentIndex + visibleItems, totalItems)} из {totalItems}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers; 