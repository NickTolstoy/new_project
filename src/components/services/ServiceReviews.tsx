import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getReviews } from '../../utils/reviewsService';
import { Link } from 'react-router-dom';

interface Review {
  id: string | number;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
  car: string;
  service: string;
  verified: boolean;
}

interface ServiceReviewsProps {
  serviceName: string;
  limit?: number;
}

const ServiceReviews: React.FC<ServiceReviewsProps> = ({ serviceName, limit = 3 }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const allReviews = await getReviews();
        
        console.log('[SERVICE_REVIEWS] Получены отзывы от API:', allReviews);
        
        // Фильтруем отзывы по услуге (включая частичное совпадение)
        const filteredReviews = allReviews
          .map(review => ({
            ...review,
            verified: review.verified === true // Преобразуем в boolean тип
          }))
          .filter(review => {
            console.log(`[SERVICE_REVIEWS] Проверка отзыва:`, review);
            console.log(`[SERVICE_REVIEWS] Проверка совпадения: "${review.service?.toLowerCase()}" vs "${serviceName.toLowerCase()}"`);
            return review.service?.toLowerCase().includes(serviceName.toLowerCase()) ||
                  serviceName.toLowerCase().includes(review.service?.toLowerCase());
          })
          .filter(review => review.verified === true); // Показываем только верифицированные отзывы
        
        console.log('[SERVICE_REVIEWS] Отфильтрованные отзывы:', filteredReviews);
        setReviews(filteredReviews.slice(0, limit));
        setHasError(false);
      } catch (error) {
        console.error('[SERVICE_REVIEWS] Ошибка при загрузке отзывов:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [serviceName, limit]);

  // Форматирование даты
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    const date = new Date(dateString);
    
    // Проверка на валидность даты
    if (isNaN(date.getTime())) {
      return 'Недавно';
    }
    
    return date.toLocaleDateString('ru-RU', options);
  };

  // Компонент для отображения звездного рейтинга
  const StarRating = ({ rating }: { rating: number }) => {
    const stars = [];
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
    return <div className="flex items-center">{stars}</div>;
  };

  if (isLoading) {
    return (
      <div className="mt-10 bg-bg-secondary rounded-xl p-6 border border-white/10">
        <h2 className="text-2xl font-bold mb-4 text-white">Отзывы клиентов</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="bg-bg-primary/20 p-4 rounded-lg">
              <div className="h-4 bg-bg-primary/30 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-bg-primary/30 rounded w-1/2 mb-3"></div>
              <div className="h-3 bg-bg-primary/30 rounded w-full mb-1"></div>
              <div className="h-3 bg-bg-primary/30 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="mt-10 bg-bg-secondary rounded-xl p-6 border border-red-500/20">
        <h2 className="text-2xl font-bold mb-4 text-white">Отзывы клиентов</h2>
        <div className="p-4 bg-red-500/10 rounded-lg text-text-secondary">
          Не удалось загрузить отзывы. Пожалуйста, попробуйте позже.
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return null; // Не показываем блок отзывов, если их нет
  }

  return (
    <div className="mt-10 bg-bg-secondary rounded-xl p-6 border border-white/10">
      <h2 className="text-2xl font-bold mb-4 text-white">Отзывы клиентов об услуге</h2>
      
      <div className="space-y-4 mb-6">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            className="bg-bg-primary/20 p-4 rounded-lg border border-white/5 hover:border-accent-blue/30 transition-all"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                {review.avatar ? (
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-accent-blue text-white flex items-center justify-center text-lg font-bold mr-3">
                    {review.author.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-white">{review.author}</h4>
                  <p className="text-text-secondary text-xs">
                    {formatDate(review.date)}
                  </p>
                </div>
              </div>
              <StarRating rating={review.rating} />
            </div>
            
            <p className="text-text-primary text-sm mb-2">{review.text}</p>
            
            <div className="flex flex-wrap gap-2 text-xs text-text-secondary">
              <div className="bg-gradient-to-r from-accent-blue/20 to-accent-green/20 backdrop-blur-sm px-2 py-1 rounded-full flex items-center shadow-sm border border-accent-blue/10">
                <div className="w-4 h-4 mr-1 rounded-full bg-accent-blue/30 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-accent-blue" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M499.99 176h-59.87l-16.64-41.6C406.38 91.63 365.57 64 319.5 64h-127c-46.06 0-86.88 27.63-103.99 70.4L71.87 176H12.01C4.2 176-1.53 183.34.37 190.91l6 24C7.7 220.25 12.5 224 18.01 224h20.07C24.65 235.73 16 252.78 16 272v48c0 16.12 6.16 30.67 16 41.93V416c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h256v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-54.07c9.84-11.25 16-25.8 16-41.93v-48c0-19.22-8.65-36.27-22.07-48H494c5.51 0 10.31-3.75 11.64-9.09l6-24c1.89-7.57-3.84-14.91-11.65-14.91zm-352.06-17.83c7.29-18.22 24.94-30.17 44.57-30.17h127c19.63 0 37.28 11.95 44.57 30.17L384 208H128l19.93-49.83zM96 319.8c-19.2 0-32-12.76-32-31.9S76.8 256 96 256s48 28.71 48 47.85-28.8 15.95-48 15.95zm320 0c-19.2 0-48 3.19-48-15.95S396.8 256 416 256s32 12.76 32 31.9-12.8 31.9-32 31.9z"/>
                  </svg>
                </div>
                {review.car}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center">
        <Link 
          to="/reviews" 
          className="inline-flex items-center text-accent-blue hover:text-accent-green transition-colors"
        >
          <span>Смотреть все отзывы</span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ServiceReviews; 