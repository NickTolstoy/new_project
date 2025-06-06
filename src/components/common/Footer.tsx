import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-bg-secondary py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">АвтосервисЛубань</h3>
            <p className="text-text-secondary mb-4">
              Профессиональное обслуживание и ремонт электромобилей в Москве
            </p>
            <div className="flex space-x-4">
              <a href="https://t.me/luban_autoservice" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="text-text-secondary hover:text-accent-blue transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0Zm0 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 11.944 2ZM8.67 7.867l6.214 3.28a.5.5 0 0 1 0 .866l-6.214 3.281a.5.5 0 0 1-.724-.447V8.314a.5.5 0 0 1 .724-.447Z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Услуги</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/battery-repair" className="text-text-secondary hover:text-accent-blue transition-colors">
                  Ремонт батареи
                </Link>
              </li>
              <li>
                <Link to="/services/diagnostics" className="text-text-secondary hover:text-accent-blue transition-colors">
                  Диагностика
                </Link>
              </li>
              <li>
                <Link to="/services/software" className="text-text-secondary hover:text-accent-blue transition-colors">
                  Обновление ПО
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-text-secondary hover:text-accent-blue transition-colors">
                  Все услуги
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Информация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-text-secondary hover:text-accent-blue transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-text-secondary hover:text-accent-blue transition-colors">
                  Блог
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-text-secondary hover:text-accent-blue transition-colors">
                  Новости
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-text-secondary hover:text-accent-blue transition-colors">
                  Часто задаваемые вопросы
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-text-secondary hover:text-accent-blue transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Контакты</h3>
            <address className="not-italic">
              <p className="text-text-secondary mb-2">Шипиловская ул., 28Б, стр. 2, Москва</p>
              <a href="tel:+79267980666" className="text-text-secondary hover:text-accent-blue transition-colors block mb-2">
                +7 (926) 798-06-66
              </a>
              <a href="mailto:info@lubanservice.ru" className="text-text-secondary hover:text-accent-blue transition-colors block mb-2">
                info@lubanservice.ru
              </a>
              <p className="text-text-secondary">Ежедневно с 10:00 до 20:00</p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-text-secondary text-sm">
          <p>© {new Date().getFullYear()} АвтосервисЛубань. Все права защищены.</p>
        </div>
      </div>
      
      {/* Мобильная кнопка "Позвонить" */}
      <div className="fixed bottom-4 left-0 right-0 z-40 md:hidden flex justify-center">
        <a 
          href="tel:+79267980666" 
          className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold flex items-center space-x-2 transition-all duration-300 hover:shadow-neon hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>Позвонить</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer 