import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import FAQ from '../components/services/FAQ'
import { faqItems } from '../components/services/FAQ'

const FAQPage = () => {
  useEffect(() => {
    document.title = 'Часто задаваемые вопросы - АвтосервисЛюбань'
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <>
      {/* Шапка страницы */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-bg-secondary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Часто задаваемые вопросы
            </h1>
            <p className="text-text-secondary text-lg md:text-xl">
              Ответы на популярные вопросы об обслуживании электромобилей, 
              нашем сервисе и услугах.
            </p>
          </div>
        </div>
      </section>
      
      {/* Основной контент */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <FAQ 
                items={faqItems} 
                title="Общие вопросы о сервисе"
              />
              
              <div className="mt-10">
                <div className="glass-card p-8 rounded-xl">
                  <h2 className="text-2xl font-bold mb-6">Не нашли ответ на свой вопрос?</h2>
                  <p className="text-text-secondary mb-6">
                    Если вы не нашли ответ на интересующий вас вопрос, свяжитесь с нами любым удобным способом.
                    Наши специалисты с радостью проконсультируют вас и предоставят всю необходимую информацию.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      to="/contacts" 
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold transition-all duration-300 hover:shadow-neon hover:scale-105 inline-block text-center"
                    >
                      Связаться с нами
                    </Link>
                    <a 
                      href="tel:+78001234567" 
                      className="px-6 py-3 rounded-full bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary font-semibold transition-all duration-300 hover:border-accent-blue/80 hover:shadow-neon text-center"
                    >
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        8 (800) 123-45-67
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:sticky lg:top-24 h-max">
              <div className="glass-card p-8 rounded-xl mb-8">
                <h3 className="text-xl font-bold mb-4">Категории вопросов</h3>
                
                <ul className="space-y-2">
                  <li>
                    <a href="#general" className="flex items-center py-2 px-3 rounded-lg bg-bg-secondary/50 hover:bg-bg-secondary/80 transition-colors">
                      <svg className="w-5 h-5 mr-3 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Общие вопросы
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="flex items-center py-2 px-3 rounded-lg bg-bg-secondary/50 hover:bg-bg-secondary/80 transition-colors">
                      <svg className="w-5 h-5 mr-3 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Услуги и цены
                    </a>
                  </li>
                  <li>
                    <a href="#battery" className="flex items-center py-2 px-3 rounded-lg bg-bg-secondary/50 hover:bg-bg-secondary/80 transition-colors">
                      <svg className="w-5 h-5 mr-3 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Батареи и зарядка
                    </a>
                  </li>
                  <li>
                    <a href="#diagnostics" className="flex items-center py-2 px-3 rounded-lg bg-bg-secondary/50 hover:bg-bg-secondary/80 transition-colors">
                      <svg className="w-5 h-5 mr-3 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Диагностика
                    </a>
                  </li>
                  <li>
                    <a href="#warranty" className="flex items-center py-2 px-3 rounded-lg bg-bg-secondary/50 hover:bg-bg-secondary/80 transition-colors">
                      <svg className="w-5 h-5 mr-3 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Гарантия и сервис
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="glass-card p-8 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Мы всегда на связи</h3>
                <p className="text-text-secondary mb-6">
                  Наша служба поддержки работает ежедневно с 9:00 до 21:00 и готова ответить 
                  на любые ваши вопросы.
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:+78001234567" className="hover:text-accent-blue transition-colors">
                      8 (800) 123-45-67
                    </a>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:info@electro-service.ru" className="hover:text-accent-blue transition-colors">
                      info@electro-service.ru
                    </a>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Москва, ул. Автомобильная, 42</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default FAQPage 