import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { InputMask, ContactFormData } from './shared/FormComponents'
import { submitContactForm } from '../utils/contactFormService'

const PopupForm = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isSavedLocally, setIsSavedLocally] = useState(false)
  
  // Проверяем, была ли форма уже показана или отправлена ранее
  useEffect(() => {
    const popupFormShown = localStorage.getItem('popupFormShown')
    
    if (popupFormShown !== 'true') {
      // Показать форму через 10 секунд после загрузки страницы
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 10000)
      
      return () => clearTimeout(timer)
    }
  }, [])
  
  // Закрытие формы
  const handleClose = () => {
    setIsVisible(false)
    // Запоминаем, что форма была закрыта и больше не показываем
    localStorage.setItem('popupFormShown', 'true')
  }
  
  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Базовая валидация
    if (!name.trim()) {
      setError('Укажите ваше имя')
      return
    }
    
    // Проверка телефона - должно быть не менее 17 символов в маске +7 (999) 999-99-99
    if (phone.length < 17) {
      setError('Укажите корректный номер телефона')
      return
    }
    
    setError('')
    setIsSubmitting(true)
    
    try {
      // Подготавливаем данные формы
      const formData: Partial<ContactFormData> = {
        name,
        phone,
        message: 'Запрос обратного звонка из всплывающей формы',
        service: 'popup',
        formType: 'popup'
      }
      
      // Отправляем форму на сервер через сервис
      const result = await submitContactForm(formData);
      
      if (result.success) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setIsSavedLocally(!!result.isOffline);
        
        // Запоминаем, что форма была отправлена и больше не показываем
        localStorage.setItem('popupFormShown', 'true');
        
        // Закрытие формы через 3 секунды после успешной отправки
        setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      } else {
        setError(result.message || 'Ошибка при отправке заявки');
        setIsSubmitting(false);
      }
    } catch (error: any) {
      console.error('Ошибка при отправке заявки:', error);
      setError(error.message || 'Произошла ошибка при отправке заявки');
      setIsSubmitting(false);
    }
  }
  
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Затемненный размытый фон */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-md bg-black/60 z-40"
            onClick={handleClose}
          />
          
          {/* Модальное окно */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 w-full p-4"
            onClick={handleClose}
          >
            <div 
              className="glass-card rounded-xl overflow-hidden shadow-neon border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 right-4">
                <button 
                  className="text-text-secondary hover:text-white p-2 rounded-full bg-bg-secondary/50 hover:bg-bg-secondary/80 transition-colors"
                  onClick={handleClose}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Левая часть с формой */}
                <div className="p-6 md:p-10">
                  {!isSubmitted ? (
                    <>
                      <h2 className="text-3xl font-bold mb-3 text-gradient">Нужна консультация?</h2>
                      <p className="text-text-secondary mb-6">
                        Оставьте свой номер телефона, и наш специалист свяжется с вами в ближайшее время для консультации по обслуживанию вашего электромобиля.
                      </p>
                      
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-text-primary mb-2 font-medium">Ваше имя</label>
                          <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-bg-secondary/70 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent-blue/50"
                            placeholder="Иван Петров"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-text-primary mb-2 font-medium">Номер телефона</label>
                          <InputMask value={phone} onChange={setPhone} />
                        </div>
                        
                        {error && (
                          <div className="text-red-500 text-sm">{error}</div>
                        )}
                        
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-white font-bold transition-all duration-300 hover:shadow-neon hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Отправка...
                            </span>
                          ) : 'Перезвонить мне'}
                        </button>
                        
                        <p className="text-text-secondary text-xs text-center mt-4">
                          Нажимая на кнопку, вы соглашаетесь с <span className="underline cursor-pointer">политикой конфиденциальности</span>
                        </p>
                      </form>
                    </>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center py-10">
                      <div className="text-accent-green mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Заявка отправлена!</h3>
                      <p className="text-text-secondary text-center">
                        {isSavedLocally 
                          ? 'Заявка сохранена локально и будет отправлена, когда появится соединение с сервером.'
                          : 'Спасибо за обращение! Наш специалист свяжется с вами в ближайшее время.'}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Правая часть с изображением */}
                <div className="hidden md:block bg-gradient-to-r from-accent-blue/10 to-accent-green/10 relative h-full">
                  <img 
                    src="/images/support-team.webp" 
                    alt="Служба поддержки" 
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center p-10">
                    <div className="bg-bg-primary/50 backdrop-blur-md p-6 rounded-xl border border-white/10">
                      <h3 className="text-xl font-semibold mb-3 text-gradient">Почему стоит обратиться к нам?</h3>
                      <ul className="space-y-2 text-text-primary">
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-accent-green mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Специализируемся на электромобилях всех марок
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-accent-green mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Сертифицированные специалисты
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-accent-green mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Оригинальные запчасти и программное обеспечение
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-accent-green mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Гарантия на все виды работ
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default PopupForm 