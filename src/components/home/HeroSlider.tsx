import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface SlideImage {
  src: string;
  webp: string;
  alt: string;
}

const slides: SlideImage[] = [
  {
    src: '/images/hero/slide1.jpg',
    webp: '/images/hero/slide1.webp',
    alt: 'Электромобиль на зарядке'
  },
  {
    src: '/images/hero/slide2.jpg',
    webp: '/images/hero/slide2.webp',
    alt: 'Сервисное обслуживание электромобиля'
  }
];

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Автоматическая смена слайдов
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Обработка свайпов на мобильных
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // Если свайп достаточно большой
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Свайп влево - следующий слайд
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        // Свайп вправо - предыдущий слайд
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }
  };

  // Предзагрузка изображений для улучшения LCP
  useEffect(() => {
    const preloadImages = async () => {
      const promises = slides.map((slide) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = slide.src;
          img.onload = () => resolve();
        });
      });
      
      await Promise.all(promises);
      setIsLoaded(true);
    };
    
    preloadImages();
  }, []);

  return (
    <section 
      className="relative h-[90vh] min-h-[600px] overflow-hidden" 
      ref={sliderRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Hero-слайдер"
    >
      {/* Фоновый слайдер */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/80 to-bg-primary/60 z-10"></div>
        
        <AnimatePresence mode="wait">
          {slides.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={`slide-${index}`}
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
                style={{ 
                  willChange: 'opacity',
                  height: '100%', 
                  width: '100%' 
                }}
              >
                <picture className="h-full w-full">
                  <source srcSet={slide.webp} type="image/webp" />
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      objectPosition: 'center' 
                    }}
                  />
                </picture>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
      
      {/* Контент */}
      <div className="container relative z-20 h-full flex flex-col justify-center items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Профессиональный сервис электромобилей в Москве
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-100 mb-8 drop-shadow-md">
            Диагностика, ремонт и обслуживание электромобилей любых марок с гарантией результата
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/services" 
              className="px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold transition-all duration-300 hover:shadow-neon hover:scale-105 text-center"
            >
              Наши услуги
            </Link>
            <Link 
              to="/contacts" 
              className="px-8 py-4 rounded-full bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary font-semibold transition-all duration-300 hover:border-accent-blue/80 hover:shadow-neon text-center"
            >
              Записаться на сервис
            </Link>
          </div>
        </motion.div>
        
        {/* Всплывающие преимущества */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-10 left-0 right-0"
        >
          <div className="container grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="glass-card px-4 py-6 flex flex-col items-center text-center">
              <span className="text-accent-blue text-xl font-bold mb-2">5+</span>
              <span className="text-text-secondary text-sm">лет опыта ремонта</span>
            </div>
            <div className="glass-card px-4 py-6 flex flex-col items-center text-center">
              <span className="text-accent-blue text-xl font-bold mb-2">15+</span>
              <span className="text-text-secondary text-sm">опытных инженеров</span>
            </div>
            <div className="glass-card px-4 py-6 flex flex-col items-center text-center">
              <span className="text-accent-blue text-xl font-bold mb-2">24/7</span>
              <span className="text-text-secondary text-sm">техподдержка</span>
            </div>
            <div className="glass-card px-4 py-6 flex flex-col items-center text-center">
              <span className="text-accent-blue text-xl font-bold mb-2">500+</span>
              <span className="text-text-secondary text-sm">успешных ремонтов</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSlider 