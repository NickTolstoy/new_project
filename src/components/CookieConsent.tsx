import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Проверяем, было ли уже получено согласие
    const hasConsent = localStorage.getItem('cookieConsent');
    
    // Если согласия еще нет, показываем уведомление через 1 секунду
    if (!hasConsent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const acceptCookies = () => {
    // Сохраняем согласие в localStorage
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="max-w-4xl mx-auto bg-bg-secondary/80 backdrop-blur-md rounded-lg shadow-xl border border-white/10 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="mb-4 sm:mb-0 sm:mr-8">
                <h3 className="text-lg font-semibold mb-2">Мы используем cookie</h3>
                <p className="text-text-secondary text-sm">
                  Этот сайт использует cookies для улучшения пользовательского опыта и сбора аналитических данных. 
                  Продолжая использовать этот сайт, вы соглашаетесь с нашей политикой использования cookies.
                </p>
              </div>
              <div className="flex flex-shrink-0">
                <button
                  onClick={acceptCookies}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-white font-semibold transition-all duration-300 hover:shadow-neon hover:scale-105"
                >
                  Принять
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent; 