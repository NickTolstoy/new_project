import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Импорт компонента маски телефона и типа данных формы
import { InputMask, ContactFormData } from './shared/FormComponents'
import { submitReview, checkDatabaseConnection } from '../utils/reviewsService'

// Список доступных услуг (такой же как на странице отзывов)
const serviceOptions = [
  'Компьютерная диагностика',
  'Замена масляного фильтра',
  'Обслуживание тормозной системы',
  'Работа с силовым аккумулятором',
  'Обслуживание трансмиссии',
  'Обслуживание кондиционера',
  'Кузовные работы',
  'Замена антифриза',
  'Другое'
]

const ReviewForm = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('+7')
  const [email, setEmail] = useState('')
  const [rating, setRating] = useState(5)
  const [message, setMessage] = useState('')
  const [carModel, setCarModel] = useState('')
  const [serviceType, setServiceType] = useState(serviceOptions[0])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [dbConnected, setDbConnected] = useState(false)
  const [isSavedLocally, setIsSavedLocally] = useState(false)
  
  // Проверяем подключение к базе данных при загрузке компонента
  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await checkDatabaseConnection();
      setDbConnected(isConnected);
      console.log('Подключение к БД:', isConnected ? 'Активно' : 'Отсутствует');
    };
    
    checkConnection();
  }, []);
  
  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Базовая валидация
    if (!name.trim()) {
      setError('Укажите ваше имя')
      return
    }
    
    if (!message.trim()) {
      setError('Пожалуйста, напишите текст отзыва')
      return
    }
    
    if (!serviceType) {
      setError('Выберите услугу, о которой оставляете отзыв')
      return
    }
    
    // Проверка телефона - должно быть не менее 17 символов в маске +7 (999) 999-99-99
    if (phone && (phone === '+7' || phone.length < 17)) {
      setError('Укажите корректный номер телефона')
      return
    }
    
    setError('')
    setIsSubmitting(true)
    
    // Подготавливаем данные отзыва
    const reviewData = {
      name,
      phone,
      email,
      carModel: carModel || '',
      service: serviceType,
      message,
      rating,
      formType: 'review' as 'review' // Явно указываем тип формы
    };
    
    try {
      // Отправляем отзыв на сервер если есть подключение,
      // иначе сохраняем локально (submitReview делает это автоматически)
      const result = await submitReview(reviewData);
      
      console.log('Результат отправки отзыва:', result);
      
      if (result.success) {
        // Показываем сообщение об успехе
        setIsSubmitting(false);
        setIsSubmitted(true);
        setIsSavedLocally(!!result.isOffline);
        
        // Отправляем событие для обновления списка отзывов
        const reviewAddedEvent = new CustomEvent('reviewAdded', { 
          detail: { source: 'api' },
          bubbles: true 
        });
        window.dispatchEvent(reviewAddedEvent);
        
        // Сбрасываем форму через 3 секунды после успешной отправки
        setTimeout(() => {
          setName('')
          setPhone('')
          setEmail('')
          setMessage('')
          setCarModel('')
          setServiceType(serviceOptions[0])
          setRating(5)
          setIsSubmitted(false)
        }, 3000);
      } else {
        setError(result.message || 'Произошла ошибка при отправке отзыва.');
        setIsSubmitting(false);
      }
    } catch (error: any) {
      console.error('Ошибка при отправке отзыва:', error);
      setError(error.message || 'Произошла ошибка при отправке отзыва. Пожалуйста, попробуйте еще раз.');
      setIsSubmitting(false);
    }
  }
  
  // Компонент звездного рейтинга
  const StarRating = () => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg 
              className={`w-8 h-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </motion.button>
        ))}
      </div>
    )
  }
  
  return (
    <motion.div 
      className="glass-card rounded-xl border border-white/10 p-6 md:p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-text-primary mb-2 font-medium">Ваше имя <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-bg-secondary/70 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent-blue/50 text-text-primary"
                placeholder="Иван Петров"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-text-primary mb-2 font-medium">Номер телефона</label>
              <InputMask value={phone} onChange={setPhone} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-text-primary mb-2 font-medium">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg-secondary/70 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent-blue/50 text-text-primary"
                placeholder="example@mail.com"
              />
            </div>
            
            <div>
              <label htmlFor="carModel" className="block text-text-primary mb-2 font-medium">Модель вашего электромобиля</label>
              <input
                type="text"
                id="carModel"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                className="w-full bg-bg-secondary/70 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent-blue/50 text-text-primary"
                placeholder="Tesla Model 3, Nissan Leaf, ..."
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="serviceType" className="block text-text-primary mb-2 font-medium">Услуга <span className="text-red-500">*</span></label>
              <select
                id="serviceType"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full bg-bg-secondary/70 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent-blue/50 text-text-primary"
                required
              >
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-text-primary mb-2 font-medium">Оценка <span className="text-red-500">*</span></label>
              <StarRating />
            </div>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-text-primary mb-2 font-medium">Ваш отзыв <span className="text-red-500">*</span></label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-bg-secondary/70 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent-blue/50 text-text-primary min-h-[120px]"
              placeholder="Поделитесь своими впечатлениями о сервисе..."
              required
            ></textarea>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg">
              {error}
            </div>
          )}
          
          {!dbConnected && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 p-3 rounded-lg">
              Отсутствует подключение к базе данных. Ваш отзыв будет сохранен локально и отправлен позже.
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-white font-bold transition-all duration-300 hover:shadow-neon hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Отправка...
              </span>
            ) : 'Отправить отзыв'}
          </button>
        </form>
      ) : (
        <motion.div 
          className="flex flex-col items-center justify-center py-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-20 h-20 bg-gradient-to-r from-accent-blue to-accent-green rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2 text-white">Спасибо за ваш отзыв!</h3>
          <p className="text-text-secondary max-w-md">
            {isSavedLocally
              ? 'Ваш отзыв сохранен локально и будет отправлен, когда появится соединение с сервером.'
              : 'Ваш отзыв успешно опубликован. Спасибо, что помогаете нам становиться лучше!'}
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ReviewForm 