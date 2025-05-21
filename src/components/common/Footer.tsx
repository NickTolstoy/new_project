import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-bg-secondary py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">АвтосервисЛюбань</h3>
            <p className="text-text-secondary mb-4">
              Профессиональное обслуживание и ремонт электромобилей в Любани и Ленинградской области
            </p>
            <div className="flex space-x-4">
              <a href="https://vk.com" target="_blank" rel="noopener noreferrer" aria-label="Вконтакте" className="text-text-secondary hover:text-accent-blue transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.579 6.855c.14-.465 0-.806-.666-.806h-2.2c-.56 0-.817.29-.956.61 0 0-1.12 2.72-2.695 4.488-.512.513-.745.675-1.023.675-.14 0-.352-.162-.352-.627V6.855c0-.558-.159-.806-.618-.806H9.642c-.348 0-.557.26-.557.504 0 .528.791.65.872 2.138v3.228c0 .707-.128.836-.41.836-.745 0-2.558-2.729-3.629-5.853-.21-.607-.42-.846-.983-.846h-2.2c-.624 0-.75.29-.75.61 0 .571.745 3.405 3.472 7.153 1.816 2.558 4.376 3.943 6.707 3.943 1.395 0 1.567-.313 1.567-.853v-1.966c0-.628.133-.753.576-.753.326 0 .887.164 2.195 1.421 1.495 1.495 1.743 2.168 2.584 2.168h2.2c.624 0 .936-.313.757-.93-.197-.613-.905-1.499-1.844-2.552-.512-.604-1.279-1.254-1.51-1.579-.326-.418-.233-.604 0-.975.001 0 2.672-3.763 2.95-5.04z" />
                </svg>
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="text-text-secondary hover:text-accent-blue transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0Zm0 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 11.944 2ZM8.67 7.867l6.214 3.28a.5.5 0 0 1 0 .866l-6.214 3.281a.5.5 0 0 1-.724-.447V8.314a.5.5 0 0 1 .724-.447Z" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Youtube" className="text-text-secondary hover:text-accent-blue transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
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
              <p className="text-text-secondary mb-2">Любань, Ленинградское шоссе, 118</p>
              <a href="tel:+78123456789" className="text-text-secondary hover:text-accent-blue transition-colors block mb-2">
                8 (812) 345-67-89
              </a>
              <a href="mailto:info@autoservice-luban.ru" className="text-text-secondary hover:text-accent-blue transition-colors block mb-2">
                info@autoservice-luban.ru
              </a>
              <p className="text-text-secondary">Ежедневно с 8:00 до 20:00</p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-text-secondary text-sm">
          <p>© {new Date().getFullYear()} АвтосервисЛюбань. Все права защищены.</p>
        </div>
      </div>
      
      {/* Мобильная кнопка "Позвонить" */}
      <div className="fixed bottom-4 left-0 right-0 z-40 md:hidden flex justify-center">
        <a 
          href="tel:+78123456789" 
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