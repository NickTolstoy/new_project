import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReviewForm from '../components/ReviewForm'
import { ContactFormData } from '../components/shared/FormComponents'
import { getReviews } from '../utils/reviewsService'

// Интерфейс для отзыва
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

// Категории сервисов для фильтрации
const serviceCategories = [
  'Все услуги',
  'Диагностика',
  'Ремонт батареи',
  'Ремонт электродвигателя',
  'Обновление ПО',
  'Техническое обслуживание'
];

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

const Reviews = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Все услуги');
  const [displayCount, setDisplayCount] = useState<number>(4);
  const [dbReviews, setDbReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'date' | 'rating'>('date');
  const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('desc');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  
  // Загрузка отзывов из базы данных
  useEffect(() => {
    document.title = 'Отзывы клиентов - АвтосервисЛюбань';
    window.scrollTo(0, 0);
    
    // Загрузка отзывов с сервера
    const fetchReviewsFromServer = async () => {
      try {
        setIsLoading(true);
        const serverReviews = await getReviews();
        console.log('[REVIEWS] Загружено отзывов с сервера:', serverReviews.length);
        
        if (serverReviews && serverReviews.length > 0) {
          // Преобразуем формат отзывов с сервера в формат, используемый компонентом
          const formattedReviews: Review[] = serverReviews.map(review => {
            console.log(`[REVIEWS] Обработка отзыва ID ${review.id}, verified:`, review.verified, 
              typeof review.verified);
            
            return {
              id: review.id,
              author: review.author,
              rating: review.rating,
              date: review.date,
              text: review.text,
              car: review.car || '',
              service: review.service || '',
              verified: review.verified === true // Дополнительная проверка логического значения
            };
          });
          
          console.log('[REVIEWS] Преобразованные отзывы:', formattedReviews);
          setDbReviews(formattedReviews);
          setHasError(false);
        } else {
          // Если отзывов нет, показываем пустой массив вместо демо-данных
          console.log('[REVIEWS] Нет отзывов на сервере. Отображаем пустой список.');
          setDbReviews([]);
          setHasError(false);
        }
      } catch (error) {
        console.error('[REVIEWS] Ошибка при получении отзывов с сервера:', error);
        // Удаляем использование демо-данных, показываем пустой список и ошибку
        setDbReviews([]);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReviewsFromServer();
    
    console.log('[REVIEWS] Страница отзывов загружена');
  }, []);
  
  // Обработчик успешной отправки отзыва
  const handleReviewAdded = () => {
    console.log('[REVIEWS] Отзыв был добавлен, обновляем список отзывов');
    
    // Перезагружаем отзывы с сервера
    const fetchReviewsFromServer = async () => {
      try {
        const serverReviews = await getReviews();
        
        if (serverReviews && serverReviews.length > 0) {
          // Преобразуем формат отзывов с сервера
          const formattedReviews: Review[] = serverReviews.map(review => {
            // Добавляем логи для отладки статуса верификации
            console.log(`[REVIEWS] Отзыв ${review.id}, статус верификации:`, review.verified, 
              `тип: ${typeof review.verified}`);
            
            return {
              id: review.id,
              author: review.author,
              rating: review.rating,
              date: review.date,
              text: review.text,
              car: review.car || '',
              service: review.service || '',
              verified: review.verified === true // Используем прямое сравнение с true для надежности
            };
          });
          
          console.log('[REVIEWS] Обновленные отзывы:', formattedReviews);
          setDbReviews(formattedReviews);
        } else {
          // Если отзывов нет, показываем пустой массив
          console.log('[REVIEWS] Нет отзывов на сервере после добавления. Отображаем пустой список.');
          setDbReviews([]);
        }
      } catch (error) {
        console.error('[REVIEWS] Ошибка при обновлении отзывов:', error);
      }
    };
    
    fetchReviewsFromServer();
  };
  
  // Получение отзывов (только из базы данных)
  const getAllReviews = (): Review[] => {
    // Возвращаем только верифицированные отзывы
    return dbReviews.filter(review => review.verified === true);
  };
  
  // Получение отфильтрованных и отсортированных отзывов
  const getFilteredAndSortedReviews = (): Review[] => {
    const allReviews = getAllReviews();
    
    // Фильтрация по категории
    const filteredByCategory = activeCategory === 'Все услуги'
      ? allReviews
      : allReviews.filter(review => {
          if (typeof review.service !== 'string') return false;
          return review.service.toLowerCase().includes(activeCategory.toLowerCase());
        });
    
    // Фильтрация по верификации
    const filteredByVerification = showVerifiedOnly
      ? filteredByCategory.filter(review => review.verified)
      : filteredByCategory;
    
    // Сортировка
    const sortedReviews = [...filteredByVerification].sort((a, b) => {
      if (sortBy === 'date') {
        return sortDirection === 'desc'
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return sortDirection === 'desc'
          ? b.rating - a.rating
          : a.rating - b.rating;
      }
    });
    
    return sortedReviews.slice(0, displayCount);
  };
  
  // Функция переключения сортировки
  const toggleSort = (field: 'date' | 'rating') => {
    if (sortBy === field) {
      // Если текущее поле сортировки совпадает с выбранным, меняем направление
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      // Иначе меняем поле сортировки и устанавливаем направление по умолчанию
      setSortBy(field);
      setSortDirection('desc');
    }
  };
  
  // Функция загрузки большего количества отзывов
  const loadMoreReviews = () => {
    setDisplayCount(prevCount => prevCount + 4);
  };
  
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
  
  // Добавляем функцию для расчета количества отзывов по рейтингу
  const getReviewCountByRating = (rating: number): number => {
    return getAllReviews().filter(review => review.rating === rating).length;
  };
  
  // Рассчитываем общую статистику на основе реальных отзывов
  const calculateStatistics = () => {
    // Общее количество отзывов
    const total = getAllReviews().length;
    
    // Если нет отзывов, возвращаем нулевую статистику
    if (total === 0) {
      return {
        total: 0,
        breakdown: {
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0
        },
        average: 0,
        highRatingPercent: 0,
        verifiedPercent: 0,
        professionalismPercent: 0
      };
    }
    
    // Считаем количество отзывов для каждого рейтинга
    const breakdown = {
      5: getReviewCountByRating(5),
      4: getReviewCountByRating(4),
      3: getReviewCountByRating(3),
      2: getReviewCountByRating(2),
      1: getReviewCountByRating(1)
    };
    
    // Рассчитываем средний рейтинг
    const ratingSum = getAllReviews().reduce((sum, review) => sum + review.rating, 0);
    const average = total > 0 ? ratingSum / total : 0;
    
    // Дополнительная статистика
    const highRatingPercent = total > 0 
      ? Math.round(((breakdown[5] + breakdown[4]) / total) * 100) 
      : 0;
    
    const verifiedCount = getAllReviews().filter(review => review.verified).length;
    const verifiedPercent = total > 0 ? Math.round((verifiedCount / total) * 100) : 0;
    
    // Процент отзывов с упоминанием профессионализма/качества
    const professionalismCount = getAllReviews().filter(review => 
      review.text.toLowerCase().includes('профессионал') || 
      review.text.toLowerCase().includes('качеств') ||
      review.text.toLowerCase().includes('мастер')
    ).length;
    const professionalismPercent = total > 0 ? Math.round((professionalismCount / total) * 100) : 0;
    
    return {
      total,
      breakdown,
      average,
      highRatingPercent,
      verifiedPercent,
      professionalismPercent
    };
  };
  
  // Получаем актуальную статистику
  const reviewStats = calculateStatistics();
  
  // Анимации
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };
  
  const cardHover = {
    rest: { scale: 1, boxShadow: '0 0 0 rgba(0, 183, 255, 0)' },
    hover: { 
      scale: 1.02,
      boxShadow: '0 0 20px rgba(0, 183, 255, 0.4)',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };
  
  // Компонент для отображения пустого состояния (когда нет отзывов)
  const EmptyReviews = () => (
    <div className="my-12 flex flex-col items-center text-center">
      <div className="bg-bg-secondary/70 p-10 rounded-2xl border border-white/10 shadow-lg max-w-lg w-full">
        <svg className="w-24 h-24 mx-auto text-text-secondary mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        <h3 className="text-3xl font-bold mb-4 text-white">Отзывов пока нет</h3>
        <p className="text-text-secondary mb-8 text-lg">
          Все отзывы удалены из базы данных. Будьте первым, кто оставит новый отзыв о нашем сервисе электромобилей!
        </p>
        <button 
          onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-white font-bold transition-all duration-300 hover:shadow-neon hover:scale-105"
        >
          Оставить отзыв
        </button>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-50 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-accent-blue/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-[30%] right-[5%] w-[600px] h-[600px] bg-accent-green/10 rounded-full filter blur-3xl"></div>
      </div>
      

      
      {/* Шапка страницы */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-bg-secondary/90 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Отзывы наших клиентов
            </h1>
            <p className="text-text-secondary text-lg md:text-xl">
              Мы гордимся качеством нашего обслуживания и работаем для вас.
            </p>
          </div>
        </div>
      </section>
      
      {/* Основной контент */}
      <section className="py-16 relative">
        {/* Декоративные элементы */}
        <div className="hidden md:block absolute top-20 left-10 w-64 h-64 bg-accent-blue opacity-10 rounded-full filter blur-3xl"></div>
        <div className="hidden md:block absolute bottom-40 right-10 w-80 h-80 bg-accent-green opacity-10 rounded-full filter blur-3xl"></div>
      
        <div className="container mx-auto px-4 relative z-10">
          {/* Статистика отзывов */}
          <div className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-bg-secondary rounded-xl p-6 border border-white/10 shadow-none">
              <h2 className="text-2xl font-bold mb-6 text-gradient">Рейтинг нашего сервиса</h2>
              <div className="flex items-center mb-6">
                <div className="text-4xl font-bold text-white mr-4">{reviewStats.average.toFixed(1)}</div>
                <div>
                  <div className="flex mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star} 
                        className={`w-6 h-6 ${star <= Math.round(reviewStats.average) ? 'text-yellow-400' : 'text-gray-400'}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-text-secondary text-sm">{reviewStats.total} отзывов</div>
                </div>
              </div>
              
              {/* Разбивка по рейтингам */}
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = reviewStats.breakdown[rating as keyof typeof reviewStats.breakdown];
                  const percent = reviewStats.total > 0 ? (count / reviewStats.total) * 100 : 0;
                  
                  return (
                    <div key={rating} className="flex items-center">
                      <div className="flex items-center w-24">
                        <span className="text-white mr-2">{rating}</span>
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <div className="flex-1 h-3 mx-2 bg-bg-primary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-accent-blue to-accent-green"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                      <div className="w-16 text-right text-text-secondary text-sm">
                        {count} ({Math.round(percent)}%)
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-bg-secondary rounded-xl p-6 border border-white/10 shadow-none">
              <h2 className="text-2xl font-bold mb-6 text-gradient">Что говорят клиенты</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 flex-shrink-0 bg-accent-blue/20 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-text-primary">
                      <span className="font-semibold">{reviewStats.professionalismPercent}%</span> клиентов отмечают профессионализм наших мастеров
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 flex-shrink-0 bg-accent-green/20 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-text-primary">
                      <span className="font-semibold">{reviewStats.highRatingPercent}%</span> клиентов оценивают нашу работу на 4-5 звёзд
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 flex-shrink-0 bg-accent-blue/20 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-text-primary">
                      <div className="inline-flex items-center bg-accent-green/10 px-3 py-1.5 rounded-lg">
                        <svg className="w-4 h-4 mr-1 text-accent-green" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold text-accent-green">{reviewStats.verifiedPercent}%</span> 
                        <span className="ml-1">отзывов проверены и подтверждены нашими специалистами</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-accent-blue/10 rounded-lg">
                <p className="text-text-primary text-sm italic">
                  "Мы ценим каждый отзыв и постоянно работаем над улучшением сервиса. Ваше мнение помогает нам становиться лучше!"
                </p>
                <p className="text-right text-accent-blue mt-2 font-semibold">— Команда АвтосервисЛюбань</p>
              </div>
            </div>
          </div>
          
          {/* Фильтры категорий */}
          <div className="mb-10 grid grid-cols-1 md:grid-cols-1 gap-4">
            {/* Фильтры категорий */}
            <div className="overflow-x-auto scrollbar-hide whitespace-nowrap pb-3">
              <div className="inline-flex space-x-2">
                {serviceCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      activeCategory === category 
                        ? 'bg-gradient-to-r from-accent-blue to-accent-green text-white shadow-neon' 
                        : 'bg-bg-secondary text-text-secondary hover:bg-bg-secondary/70 border border-white/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Информационная панель */}
          <div className="mb-6 p-4 bg-bg-secondary rounded-xl border border-white/10">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-accent-blue/20 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <div>
                  <p className="text-text-primary font-medium">
                    {activeCategory === 'Все услуги' 
                      ? 'Все отзывы' 
                      : `Отзывы по услуге: ${activeCategory}`}
                  </p>
                  <p className="text-text-secondary text-sm">
                    Найдено отзывов: {getFilteredAndSortedReviews().length}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center mt-2 sm:mt-0">
                <div className="flex border border-white/10 rounded-lg overflow-hidden mr-3">
                  <button 
                    onClick={() => toggleSort('date')}
                    className={`px-3 py-1.5 text-xs flex items-center ${
                      sortBy === 'date' ? 'bg-accent-blue/20 text-accent-blue' : 'bg-bg-secondary text-text-secondary'
                    }`}
                  >
                    По дате
                    {sortBy === 'date' && (
                      <svg 
                        className="w-3 h-3 ml-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d={sortDirection === 'desc' 
                            ? "M19 9l-7 7-7-7" 
                            : "M5 15l7-7 7 7"
                          } 
                        />
                      </svg>
                    )}
                  </button>
                  <button 
                    onClick={() => toggleSort('rating')}
                    className={`px-3 py-1.5 text-xs flex items-center ${
                      sortBy === 'rating' ? 'bg-accent-blue/20 text-accent-blue' : 'bg-bg-secondary text-text-secondary'
                    }`}
                  >
                    По рейтингу
                    {sortBy === 'rating' && (
                      <svg 
                        className="w-3 h-3 ml-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d={sortDirection === 'desc' 
                            ? "M19 9l-7 7-7-7" 
                            : "M5 15l7-7 7 7"
                          } 
                        />
                      </svg>
                    )}
                  </button>
                </div>
                
                <div className="flex items-center mr-3">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={showVerifiedOnly}
                        onChange={() => setShowVerifiedOnly(!showVerifiedOnly)}
                      />
                      <div className={`w-10 h-5 rounded-full transition-colors ${
                        showVerifiedOnly ? 'bg-accent-green' : 'bg-bg-secondary border border-white/10'
                      }`}></div>
                      <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                        showVerifiedOnly ? 'transform translate-x-5' : ''
                      }`}></div>
                    </div>
                    <span className="ml-2 text-xs text-text-secondary">Только проверенные</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Отзывы */}
          <motion.div 
            className="grid grid-cols-1 gap-6 mb-10 relative z-10"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {isLoading ? (
              <div className="animate-pulse flex flex-col gap-4">
                {/* Лоадеры для отзывов */}
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-bg-secondary p-6 rounded-lg border border-white/10">
                    <div className="h-6 bg-bg-primary/30 rounded-md w-1/4 mb-4"></div>
                    <div className="h-4 bg-bg-primary/20 rounded-md w-1/3 mb-2"></div>
                    <div className="h-4 bg-bg-primary/20 rounded-md w-full mb-2"></div>
                    <div className="h-4 bg-bg-primary/20 rounded-md w-5/6"></div>
                  </div>
                ))}
              </div>
            ) : hasError ? (
              <div className="flex justify-center items-center h-64 col-span-full bg-red-900/20 backdrop-blur-sm rounded-xl border border-red-500/30">
                <div className="text-center p-8">
                  <div className="text-red-500 mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Произошла ошибка при загрузке отзывов</h3>
                  <p className="text-text-secondary mb-4">
                    Пожалуйста, попробуйте обновить страницу
                  </p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-red-500/30 hover:bg-red-500/50 rounded-lg text-white transition-colors"
                  >
                    Обновить страницу
                  </button>
                </div>
              </div>
            ) : getFilteredAndSortedReviews().length > 0 ? (
              getFilteredAndSortedReviews().map((review) => (
                <motion.div
                  key={review.id}
                  className={`bg-bg-secondary p-6 rounded-lg shadow-md hover:shadow-lg transition-all border ${
                    review.verified 
                      ? 'border-accent-green/30 shadow-[0_0_15px_rgba(45,212,191,0.1)]' 
                      : 'border-white/10'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      {review.avatar ? (
                        <img
                          src={review.avatar}
                          alt={review.author}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-accent-blue text-white flex items-center justify-center text-xl font-bold mr-4">
                          {review.author.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-lg text-white">{review.author}</h4>
                        <p className="text-text-secondary text-sm">
                          {formatDate(review.date)}
                        </p>
                        {review.verified && (
                          <div className="flex items-center mt-1">
                            <span className="bg-accent-green/20 text-accent-green text-xs font-medium px-2 py-1 rounded-full flex items-center mr-2">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Подтвержденный клиент
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  
                  <p className="mb-4 text-text-primary">{review.text}</p>
                  
                  <div className="flex flex-wrap gap-2 text-sm text-text-secondary">
                    <div className="bg-gradient-to-r from-accent-blue/20 to-accent-green/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center shadow-sm border border-accent-blue/10 hover:shadow-accent-blue/10 hover:shadow-inner transition-all">
                      <div className="w-5 h-5 mr-2 rounded-full bg-accent-blue/30 flex items-center justify-center">
                        <svg className="w-3 h-3 text-accent-blue" fill="currentColor" viewBox="0 0 512 512">
                          <path d="M499.99 176h-59.87l-16.64-41.6C406.38 91.63 365.57 64 319.5 64h-127c-46.06 0-86.88 27.63-103.99 70.4L71.87 176H12.01C4.2 176-1.53 183.34.37 190.91l6 24C7.7 220.25 12.5 224 18.01 224h20.07C24.65 235.73 16 252.78 16 272v48c0 16.12 6.16 30.67 16 41.93V416c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h256v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-54.07c9.84-11.25 16-25.8 16-41.93v-48c0-19.22-8.65-36.27-22.07-48H494c5.51 0 10.31-3.75 11.64-9.09l6-24c1.89-7.57-3.84-14.91-11.65-14.91zm-352.06-17.83c7.29-18.22 24.94-30.17 44.57-30.17h127c19.63 0 37.28 11.95 44.57 30.17L384 208H128l19.93-49.83zM96 319.8c-19.2 0-32-12.76-32-31.9S76.8 256 96 256s48 28.71 48 47.85-28.8 15.95-48 15.95zm320 0c-19.2 0-48 3.19-48-15.95S396.8 256 416 256s32 12.76 32 31.9-12.8 31.9-32 31.9z"/>
                        </svg>
                      </div>
                      {review.car}
                    </div>
                    <div className="bg-bg-primary/20 px-3 py-1 rounded-full">
                      Услуга: {review.service}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              activeCategory !== 'Все услуги' || showVerifiedOnly ? (
                <div className="bg-bg-secondary p-8 rounded-lg shadow-md text-center border border-white/10">
                  <div className="text-5xl mb-4">😢</div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Отзывов не найдено</h3>
                  <p className="text-text-secondary mb-6">
                    По выбранным критериям не найдено ни одного отзыва. Попробуйте изменить параметры фильтрации.
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory('Все услуги');
                      setShowVerifiedOnly(false);
                    }}
                    className="px-4 py-2 bg-accent-blue text-white rounded-md hover:bg-accent-blue/80 transition-colors"
                  >
                    Сбросить фильтры
                  </button>
                </div>
              ) : (
                <EmptyReviews />
              )
            )}
          </motion.div>
          
          {/* Кнопка показать больше */}
          {displayCount < getAllReviews().length && (
            <div className="text-center mb-16">
              <motion.button
                onClick={loadMoreReviews}
                className="mt-8 px-6 py-3 bg-bg-secondary border border-accent-blue text-accent-blue rounded-md hover:bg-accent-blue hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Показать больше отзывов
              </motion.button>
            </div>
          )}
          
          {/* Форма для отзыва */}
          <div className="mt-16 relative z-10">
            <div className="hidden md:block absolute -top-20 -right-20 w-96 h-96 bg-accent-blue/10 rounded-full filter blur-3xl pointer-events-none"></div>
            <div className="hidden md:block absolute -bottom-10 -left-10 w-64 h-64 bg-accent-green/10 rounded-full filter blur-3xl pointer-events-none"></div>
            
            <div className="bg-bg-secondary/60 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-none mb-6">
              <h2 className="text-2xl font-bold mb-4 text-white">Поделитесь своим опытом</h2>
              <p className="text-text-secondary mb-8">
                Ваше мнение помогает нам становиться лучше. Расскажите об опыте обслуживания вашего электромобиля в нашем сервисе.
              </p>
              <ReviewForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Reviews 