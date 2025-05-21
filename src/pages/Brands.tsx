import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import BrandCards from '../components/services/BrandCards'
import { faqItems } from '../components/services/FAQ'
import FAQ from '../components/services/FAQ'

const Brands = () => {
  useEffect(() => {
    document.title = 'Бренды электромобилей - АвтосервисЛюбань'
    window.scrollTo(0, 0)
  }, [])
  
  // Фильтруем только FAQ вопросы, относящиеся к брендам
  const brandFaqItems = faqItems.filter(item => 
    item.question.includes('марки') || 
    item.question.includes('производител')
  );
  
  return (
    <>
      {/* Шапка страницы */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-bg-secondary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Обслуживаемые бренды электромобилей
            </h1>
            <p className="text-text-secondary text-lg md:text-xl">
              Наш сервис специализируется на обслуживании и ремонте электромобилей всех популярных марок.
              Наши специалисты прошли обучение и имеют сертификаты от ведущих производителей.
            </p>
          </div>
        </div>
      </section>
      
      {/* Список брендов */}
      <section className="py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Все бренды</h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              Мы постоянно расширяем список обслуживаемых марок и моделей электромобилей,
              следя за новинками и тенденциями рынка. Наши специалисты регулярно проходят 
              обучение для работы с новыми моделями.
            </p>
          </div>
          
          <BrandCards />
        </div>
      </section>
      
      {/* Информация о сервисном обслуживании */}
      <section className="py-16 bg-bg-secondary">
        <div className="container">
          <div className="glass-card p-8 md:p-12 rounded-xl bg-gradient-to-r from-accent-blue/10 to-accent-green/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Обслуживание с учетом особенностей вашего электромобиля
                </h2>
                <p className="text-text-secondary mb-6">
                  Каждый бренд электромобилей имеет свои уникальные особенности и требования к обслуживанию.
                  Наши специалисты учитывают специфику каждой марки и модели, используя специализированные 
                  инструменты и диагностическое оборудование.
                </p>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-accent-green mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Фирменное диагностическое оборудование для всех брендов</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-accent-green mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Сертифицированные специалисты с опытом работы с конкретными марками</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-accent-green mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Оригинальные и сертифицированные запчасти для каждой марки</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-accent-green mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Соблюдение всех технических протоколов производителей</span>
                  </li>
                </ul>
                
                <Link 
                  to="/services" 
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold transition-all duration-300 hover:shadow-neon hover:scale-105 inline-block"
                >
                  Посмотреть услуги
                </Link>
              </div>
              
              <div className="hidden lg:block">
                <img 
                  src="/images/brands-service.jpg" 
                  alt="Обслуживание электромобилей" 
                  className="rounded-xl shadow-neon"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ секция */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Часто задаваемые вопросы</h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              Ответы на популярные вопросы об обслуживании разных марок электромобилей
            </p>
          </div>
          
          <FAQ items={brandFaqItems.length > 0 ? brandFaqItems : faqItems.slice(0, 4)} />
        </div>
      </section>
      
      {/* Призыв к действию */}
      <section className="py-16 bg-bg-secondary">
        <div className="container">
          <div className="glass-card p-8 md:p-12 rounded-xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Не нашли свой электромобиль?
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-3xl mx-auto">
              Свяжитесь с нами для получения консультации по обслуживанию вашей марки и модели электромобиля.
              Мы постоянно расширяем список обслуживаемых брендов.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contacts" 
                className="px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold transition-all duration-300 hover:shadow-neon hover:scale-105 text-center"
              >
                Связаться с нами
              </Link>
              <a 
                href="tel:+78001234567" 
                className="px-8 py-4 rounded-full bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary font-semibold transition-all duration-300 hover:border-accent-blue/80 hover:shadow-neon text-center"
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
      </section>
    </>
  )
}

export default Brands 