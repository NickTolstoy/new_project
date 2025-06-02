import React, { useState, useEffect, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { InputMask } from './shared/FormComponents.tsx'
import { ContactFormData } from './shared/FormComponents'
import { submitContactForm } from '../utils/contactFormService.ts'

// Создаем контекст для управления видимостью формы
type PopupFormContextType = {
  showPopupForm: () => void;
  hidePopupForm: () => void;
};

const PopupFormContext = createContext<PopupFormContextType | undefined>(undefined);

// Хук для использования контекста в других компонентах
export const usePopupForm = () => {
  const context = useContext(PopupFormContext);
  if (!context) {
    throw new Error('usePopupForm должен использоваться внутри PopupFormProvider');
  }
  return context;
};

// Компонент с анимированными частицами
const ParticlesBackground = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    speed: number;
    type: string;
    rotation: number;
    rotationSpeed: number;
  }>>([]);

  useEffect(() => {
    // Создаем частицы в виде инструментов для автосервиса
    const particlesArray = [
      // Гаечные ключи
      ...Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 3,
        color: 'rgba(200, 200, 200, 0.5)', // металлический цвет
        speed: Math.random() * 0.2 + 0.1,
        type: 'wrench',
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 1 - 0.5
      })),
      
      // Шестеренки
      ...Array.from({ length: 15 }, (_, i) => ({
        id: i + 12,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 3,
        color: 'rgba(100, 100, 100, 0.4)', // темный металл
        speed: Math.random() * 0.15 + 0.05,
        type: 'gear',
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 0.8 + 0.2 // вращение по часовой стрелке
      })),
      
      // Маленькие шестеренки
      ...Array.from({ length: 8 }, (_, i) => ({
        id: i + 27,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 2,
        color: 'rgba(150, 150, 150, 0.4)', // светлый металл
        speed: Math.random() * 0.15 + 0.05,
        type: 'small-gear',
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 0.8 - 1 // вращение против часовой стрелки
      }))
    ];
    
    setParticles(particlesArray);
    
    // Анимация частиц
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => {
          // Медленное плавное движение для всех типов частиц
          let newY = particle.y > 100 ? 0 : particle.y + particle.speed;
          let newX = particle.x + Math.sin(particle.y * 0.02) * 0.1;
          let newRotation = (particle.rotation + particle.rotationSpeed) % 360;
          
          return {
            ...particle,
            y: newY,
            x: newX,
            rotation: newRotation
          };
        })
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  // SVG для гаечного ключа
  const wrenchSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  `;
  
  // SVG для шестеренки
  const gearSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  `;
  
  // SVG для маленькой шестеренки (упрощенный вариант)
  const smallGearSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"></path>
    </svg>
  `;
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => {
        // Создаем дата-URL для SVG с нужным цветом
        let svgCode = '';
        
        if (particle.type === 'wrench') {
          svgCode = wrenchSvg.replace('currentColor', particle.color);
        } else if (particle.type === 'gear') {
          svgCode = gearSvg.replace('currentColor', particle.color);
        } else if (particle.type === 'small-gear') {
          svgCode = smallGearSvg.replace('currentColor', particle.color);
        }
        
        const svgBase64 = btoa(svgCode);
        const svgUrl = `data:image/svg+xml;base64,${svgBase64}`;
        
        return (
          <div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size * 5}px`,
              height: `${particle.size * 5}px`,
              backgroundImage: `url("${svgUrl}")`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              filter: `drop-shadow(0 0 ${particle.size / 2}px ${particle.color})`,
              transform: `rotate(${particle.rotation}deg)`,
              opacity: 0.7,
              transition: 'transform 0.1s linear'
            }}
          />
        );
      })}
    </div>
  );
}

// Провайдер контекста для PopupForm
export const PopupFormProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const showPopupForm = () => {
    setIsVisible(true);
  };
  
  const hidePopupForm = () => {
    setIsVisible(false);
  };
  
  return (
    <PopupFormContext.Provider value={{ showPopupForm, hidePopupForm }}>
      {children}
      <PopupForm isVisible={isVisible} setIsVisible={setIsVisible} />
    </PopupFormContext.Provider>
  );
};

interface PopupFormProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupForm = ({ isVisible, setIsVisible }: PopupFormProps) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('+7')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isSavedLocally, setIsSavedLocally] = useState(false)
  
  // Проверяем, была ли форма уже показана или отправлена ранее
  useEffect(() => {
    const popupFormShown = localStorage.getItem('popupFormShown')
    
    if (popupFormShown !== 'true' && !isVisible) {
      // Показать форму через 10 секунд после загрузки страницы
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 10000)
      
      return () => clearTimeout(timer)
    }
  }, [isVisible, setIsVisible])
  
  // Сбрасываем состояние формы при её закрытии
  useEffect(() => {
    if (!isVisible) {
      // Даем время на анимацию закрытия, затем сбрасываем состояние
      const timer = setTimeout(() => {
        if (!isVisible) {
          setName('');
          setPhone('+7');
          setError('');
          setIsSubmitted(false);
          setIsSavedLocally(false);
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);
  
  // Закрытие формы
  const handleClose = () => {
    console.log('PopupForm: handleClose вызван')
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
    // или равно "+7" (пользователь ничего не ввел)
    if (phone === '+7' || phone.length < 17) {
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
              className="glass-card rounded-xl overflow-hidden shadow-neon border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => {
                e.stopPropagation();
                console.log('PopupForm: Клик по карточке (propagation stopped)');
              }}
            >
              {/* Фон с частицами для всего поп-апа */}
              <ParticlesBackground />
              
              {/* Возвращаем крестик внутрь формы */}
              <div className="absolute top-4 right-4 z-30">
                <button 
                  type="button"
                  className="text-text-secondary hover:text-white p-2 rounded-full bg-bg-secondary/50 hover:bg-bg-secondary/80 transition-colors"
                  onClick={(e) => {
                    console.log('PopupForm: Клик по крестику');
                    // Важно! Останавливаем всплытие события
                    e.stopPropagation();
                    // Вызываем функцию закрытия напрямую и с задержкой
                    setTimeout(() => handleClose(), 0);
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 relative z-10">
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
                
                {/* Правая часть с преимуществами */}
                <div className="p-6 md:p-10 flex items-center">
                  <div className="backdrop-blur-md p-6 rounded-xl border border-white/10 mt-10">
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default PopupFormProvider 