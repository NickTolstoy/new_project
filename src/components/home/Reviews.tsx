import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getReviews } from '../../utils/reviewsService'

interface Review {
  id: string;
  author: string;
  car: string;
  service: string;
  text: string;
  rating: number;
  date: string;
  verified: boolean;
}

const Reviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Загрузка отзывов с сервера при монтировании компонента
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const serverReviews = await getReviews();
        
        if (serverReviews && serverReviews.length > 0) {
          // Преобразуем данные в нужный формат
          const formattedReviews = serverReviews.map(review => ({
            id: String(review.id),
            author: review.author,
            car: review.car,
            service: review.service,
            text: review.text,
            rating: review.rating,
            date: review.date,
            verified: true // Все отзывы с сервера уже верифицированы
          }));
          
          setReviews(formattedReviews);
        } else {
          // Если отзывов нет или произошла ошибка, показываем пустой массив
          setReviews([]);
        }
      } catch (error) {
        console.error('Ошибка при получении отзывов:', error);
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReviews();
  }, []);
  
  const nextReview = () => {
    if (reviews.length > 0) {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }
  };
  
  const prevReview = () => {
    if (reviews.length > 0) {
      setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    }
  };
  
  useEffect(() => {
    if (reviews.length > 0) {
      const interval = setInterval(() => {
        nextReview();
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [reviews.length]);
  
  // Функция для отображения звезд рейтинга
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'text-accent-blue' : 'text-gray-600'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };
  
  // Показываем загрузку, если данные еще не получены
  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-bg-secondary">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Отзывы клиентов</h2>
            <p className="text-text-secondary text-lg max-w-3xl mx-auto">
              Загрузка отзывов...
            </p>
          </div>
        </div>
      </section>
    );
  }
  
  // Если отзывов нет, показываем специальное сообщение
  if (reviews.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-bg-secondary">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Отзывы клиентов</h2>
            <p className="text-text-secondary text-lg max-w-3xl mx-auto">
              Мы работаем над тем, чтобы собрать отзывы наших клиентов. Скоро здесь будут опубликованы реальные истории.
            </p>
          </div>
          <div className="text-center mt-8">
            <Link 
              to="/reviews" 
              className="px-8 py-4 rounded-full bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary font-semibold transition-all duration-300 hover:border-accent-blue/80 hover:shadow-neon inline-flex items-center"
            >
              Оставить отзыв
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-16 md:py-24 bg-bg-secondary">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Отзывы клиентов</h2>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto">
            Нам доверяют владельцы электромобилей. Более 97% клиентов оставляют положительные отзывы.
          </p>
        </div>
        
        <div className="relative" ref={containerRef}>
          {/* Стрелки для навигации */}
          <button 
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-bg-primary/30 backdrop-blur-glass text-white hover:bg-accent-blue/20 transition-colors"
            aria-label="Предыдущий отзыв"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-bg-primary/30 backdrop-blur-glass text-white hover:bg-accent-blue/20 transition-colors"
            aria-label="Следующий отзыв"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Карусель отзывов */}
          <div className="overflow-hidden mx-12">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <div 
                  key={review.id} 
                  className="w-full flex-shrink-0 px-4"
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card p-8 rounded-xl"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold">{review.author}</h3>
                        <p className="text-text-secondary">
                          {review.car} • {review.service}
                        </p>
                      </div>
                      <div className="flex mt-2 md:mt-0">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    
                    <blockquote className="text-lg mb-4">
                      "{review.text}"
                    </blockquote>
                    
                    <p className="text-text-secondary text-right">{review.date}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Индикаторы */}
          <div className="flex justify-center mt-8 space-x-2">
            {reviews.map((_, index) => (
              <button 
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-accent-blue' : 'bg-text-secondary/30'
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Отзыв ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/reviews" 
            className="px-8 py-4 rounded-full bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary font-semibold transition-all duration-300 hover:border-accent-blue/80 hover:shadow-neon inline-flex items-center"
          >
            Все отзывы
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Reviews 