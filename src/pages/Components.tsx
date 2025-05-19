import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Components = () => {
  useEffect(() => {
    document.title = 'UI Компоненты - ЭлектроСервис'
    window.scrollTo(0, 0)
  }, [])
  
  // Анимации
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <>
      {/* Шапка страницы */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-bg-secondary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              UI Компоненты
            </h1>
            <p className="text-text-secondary text-lg md:text-xl">
              Набор компонентов, используемых в дизайн-системе сайта. 
              Страница для внутреннего использования.
            </p>
          </div>
        </div>
      </section>
      
      {/* Цвета */}
      <section className="py-16">
        <div className="container">
          <div className="glass-card p-8 rounded-xl mb-12">
            <h2 className="text-3xl font-bold mb-6">Цветовая палитра</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Основная палитра</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="h-24 bg-bg-primary rounded-lg mb-2"></div>
                  <div className="font-medium">bg-primary</div>
                  <div className="text-text-secondary text-sm">Основной фон</div>
                </div>
                <div>
                  <div className="h-24 bg-bg-secondary rounded-lg mb-2"></div>
                  <div className="font-medium">bg-secondary</div>
                  <div className="text-text-secondary text-sm">Вторичный фон</div>
                </div>
                <div>
                  <div className="h-24 bg-text-primary rounded-lg mb-2"></div>
                  <div className="font-medium">text-primary</div>
                  <div className="text-text-secondary text-sm">Основной текст</div>
                </div>
                <div>
                  <div className="h-24 bg-text-secondary rounded-lg mb-2"></div>
                  <div className="font-medium">text-secondary</div>
                  <div className="text-text-secondary text-sm">Вторичный текст</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Акцентные цвета</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="h-24 bg-accent-blue rounded-lg mb-2"></div>
                  <div className="font-medium">accent-blue</div>
                  <div className="text-text-secondary text-sm">#00B7FF</div>
                </div>
                <div>
                  <div className="h-24 bg-accent-green rounded-lg mb-2"></div>
                  <div className="font-medium">accent-green</div>
                  <div className="text-text-secondary text-sm">#00E38C</div>
                </div>
                <div>
                  <div className="h-24 bg-gradient-to-r from-accent-blue to-accent-green rounded-lg mb-2"></div>
                  <div className="font-medium">gradient</div>
                  <div className="text-text-secondary text-sm">from-accent-blue to-accent-green</div>
                </div>
                <div>
                  <div className="h-24 bg-yellow-400 rounded-lg mb-2"></div>
                  <div className="font-medium">yellow-400</div>
                  <div className="text-text-secondary text-sm">Рейтинг</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Типографика */}
      <section className="py-8">
        <div className="container">
          <div className="glass-card p-8 rounded-xl mb-12">
            <h2 className="text-3xl font-bold mb-6">Типографика</h2>
            
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl font-bold mb-2">Заголовок H1</h1>
                <div className="text-text-secondary">text-5xl font-bold</div>
              </div>
              
              <div>
                <h2 className="text-4xl font-bold mb-2">Заголовок H2</h2>
                <div className="text-text-secondary">text-4xl font-bold</div>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold mb-2">Заголовок H3</h3>
                <div className="text-text-secondary">text-3xl font-bold</div>
              </div>
              
              <div>
                <h4 className="text-2xl font-bold mb-2">Заголовок H4</h4>
                <div className="text-text-secondary">text-2xl font-bold</div>
              </div>
              
              <div>
                <h5 className="text-xl font-bold mb-2">Заголовок H5</h5>
                <div className="text-text-secondary">text-xl font-bold</div>
              </div>
              
              <div>
                <p className="text-lg mb-2">Большой параграф текста. Используется для важной информации.</p>
                <div className="text-text-secondary">text-lg</div>
              </div>
              
              <div>
                <p className="mb-2">Обычный параграф текста. Стандартный размер для основного контента страницы.</p>
                <div className="text-text-secondary">base размер</div>
              </div>
              
              <div>
                <p className="text-sm mb-2">Мелкий текст используется для дополнительной информации, метаданных и подписей.</p>
                <div className="text-text-secondary">text-sm</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Кнопки */}
      <section className="py-8">
        <div className="container">
          <div className="glass-card p-8 rounded-xl mb-12">
            <h2 className="text-3xl font-bold mb-6">Кнопки</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Основные кнопки</h3>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold transition-all duration-300 hover:shadow-neon hover:scale-105">
                  Основная кнопка
                </button>
                
                <button className="px-6 py-3 rounded-full bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary font-semibold transition-all duration-300 hover:border-accent-blue/80 hover:shadow-neon">
                  Вторичная кнопка
                </button>
                
                <button className="px-6 py-3 rounded-full bg-bg-secondary/70 hover:bg-bg-secondary border border-white/10 transition-all duration-300">
                  Третичная кнопка
                </button>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Размеры кнопок</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold">
                  Большая кнопка
                </button>
                
                <button className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold">
                  Средняя кнопка
                </button>
                
                <button className="px-4 py-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold text-sm">
                  Маленькая кнопка
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Кнопки с иконками</h3>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold transition-all duration-300 hover:shadow-neon flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Записаться
                </button>
                
                <button className="px-6 py-3 rounded-full bg-bg-secondary/70 hover:bg-bg-secondary border border-white/10 transition-all duration-300 flex items-center">
                  Подробнее
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Карточки и контейнеры */}
      <section className="py-8">
        <div className="container">
          <div className="glass-card p-8 rounded-xl mb-12">
            <h2 className="text-3xl font-bold mb-6">Карточки и контейнеры</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Стандартная карточка</h3>
                <p className="text-text-secondary mb-4">
                  Это пример стандартной карточки с классом glass-card. Используется для большинства контейнеров на сайте.
                </p>
                <button className="px-4 py-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold text-sm">
                  Подробнее
                </button>
              </div>
              
              <div className="glass-card p-6 rounded-xl bg-gradient-to-r from-accent-blue/10 to-accent-green/10">
                <h3 className="text-xl font-bold mb-4">Карточка с градиентом</h3>
                <p className="text-text-secondary mb-4">
                  Карточка с градиентным фоном для выделения важных секций и призывов к действию.
                </p>
                <button className="px-4 py-2 rounded-full bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary font-semibold transition-all duration-300 hover:border-accent-blue/80">
                  Узнать больше
                </button>
              </div>
              
              <div className="glass-card p-6 rounded-xl hover:shadow-neon transition-all duration-300">
                <h3 className="text-xl font-bold mb-4">Интерактивная карточка</h3>
                <p className="text-text-secondary mb-4">
                  При наведении эта карточка подсвечивается неоновым свечением благодаря классу hover:shadow-neon.
                </p>
                <div className="text-accent-blue font-medium flex items-center">
                  Узнать больше
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Формы */}
      <section className="py-8">
        <div className="container">
          <div className="glass-card p-8 rounded-xl mb-12">
            <h2 className="text-3xl font-bold mb-6">Элементы форм</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-text-primary mb-2 font-medium">Текстовое поле</label>
                  <input
                    type="text"
                    placeholder="Введите ваше имя"
                    className="w-full bg-bg-secondary/70 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent-blue/50"
                  />
                </div>
                
                <div>
                  <label className="block text-text-primary mb-2 font-medium">Текстовая область</label>
                  <textarea
                    placeholder="Введите ваше сообщение"
                    rows={4}
                    className="w-full bg-bg-secondary/70 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent-blue/50"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-text-primary mb-2 font-medium">Выпадающий список</label>
                  <select className="w-full bg-bg-secondary/70 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent-blue/50">
                    <option value="">Выберите услугу</option>
                    <option value="diagnostic">Диагностика</option>
                    <option value="repair">Ремонт</option>
                    <option value="maintenance">Техобслуживание</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-text-primary mb-2 font-medium">Чекбоксы</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="checkbox1"
                        className="w-5 h-5 rounded border-white/10 bg-bg-secondary/70 text-accent-blue focus:ring-accent-blue/50"
                      />
                      <label htmlFor="checkbox1" className="ml-2">Вариант 1</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="checkbox2"
                        className="w-5 h-5 rounded border-white/10 bg-bg-secondary/70 text-accent-blue focus:ring-accent-blue/50"
                      />
                      <label htmlFor="checkbox2" className="ml-2">Вариант 2</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-text-primary mb-2 font-medium">Радио-кнопки</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="radio1"
                        name="radio-group"
                        className="w-5 h-5 border-white/10 bg-bg-secondary/70 text-accent-blue focus:ring-accent-blue/50"
                      />
                      <label htmlFor="radio1" className="ml-2">Вариант A</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="radio2"
                        name="radio-group"
                        className="w-5 h-5 border-white/10 bg-bg-secondary/70 text-accent-blue focus:ring-accent-blue/50"
                      />
                      <label htmlFor="radio2" className="ml-2">Вариант B</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-text-primary mb-2 font-medium">Поле с иконкой</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Поиск..."
                      className="w-full bg-bg-secondary/70 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-accent-blue/50"
                    />
                    <svg 
                      className="absolute left-3 top-3 w-5 h-5 text-text-secondary" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Навигация обратно */}
      <section className="py-8">
        <div className="container text-center">
          <Link 
            to="/" 
            className="px-6 py-3 rounded-full bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary font-semibold transition-all duration-300 hover:border-accent-blue/80 hover:shadow-neon inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Вернуться на главную
          </Link>
        </div>
      </section>
    </>
  )
}

export default Components 