import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface PriceCategory {
  id: string;
  title: string;
  items: PriceItem[];
}

interface PriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
  popular?: boolean;
}

const priceData: PriceCategory[] = [
  {
    id: 'diagnostics',
    title: 'Диагностика',
    items: [
      {
        id: '1',
        name: 'Компьютерная диагностика',
        price: '3 500 ₽',
        description: 'Полная диагностика электронных систем с выдачей отчета',
        popular: true
      },
      {
        id: '2',
        name: 'Диагностика высоковольтной батареи',
        price: '5 000 ₽',
        description: 'Проверка состояния и емкости батареи'
      },
      {
        id: '3',
        name: 'Диагностика электродвигателя',
        price: '4 000 ₽',
        description: 'Проверка работоспособности и параметров мотора'
      },
      {
        id: '4',
        name: 'Диагностика систем безопасности',
        price: '2 500 ₽',
        description: 'Проверка подушек безопасности, ABS, ESP и других систем'
      },
      {
        id: '5',
        name: 'Диагностика системы рекуперации',
        price: '3 000 ₽',
        description: 'Проверка работы системы рекуперативного торможения'
      }
    ]
  },
  {
    id: 'battery',
    title: 'Обслуживание батареи',
    items: [
      {
        id: '6',
        name: 'Ремонт высоковольтной батареи',
        price: 'от 15 000 ₽',
        description: 'Ремонт и восстановление работоспособности батареи',
        popular: true
      },
      {
        id: '7',
        name: 'Замена модуля батареи',
        price: 'от 10 000 ₽',
        description: 'Замена отдельного модуля/ячейки высоковольтной батареи'
      },
      {
        id: '8',
        name: 'Балансировка ячеек батареи',
        price: '8 000 ₽',
        description: 'Выравнивание заряда между ячейками для увеличения ресурса'
      },
      {
        id: '9',
        name: 'Ремонт BMS',
        price: 'от 12 000 ₽',
        description: 'Ремонт системы управления батареей'
      },
      {
        id: '10',
        name: 'Восстановление емкости',
        price: 'от 20 000 ₽',
        description: 'Комплексное восстановление емкости батареи'
      }
    ]
  },
  {
    id: 'motor',
    title: 'Ремонт двигателя и трансмиссии',
    items: [
      {
        id: '11',
        name: 'Ремонт электродвигателя',
        price: 'от 20 000 ₽',
        description: 'Ремонт тягового электродвигателя',
        popular: true
      },
      {
        id: '12',
        name: 'Замена подшипников мотора',
        price: 'от 12 000 ₽',
        description: 'Замена вышедших из строя подшипников'
      },
      {
        id: '13',
        name: 'Ремонт инвертора',
        price: 'от 15 000 ₽',
        description: 'Ремонт силового преобразователя'
      },
      {
        id: '14',
        name: 'Ремонт редуктора',
        price: 'от 10 000 ₽',
        description: 'Ремонт одноступенчатого редуктора'
      },
      {
        id: '15',
        name: 'Замена охлаждающей жидкости',
        price: '4 500 ₽',
        description: 'Замена охлаждающей жидкости силовой установки'
      }
    ]
  },
  {
    id: 'software',
    title: 'Программное обеспечение',
    items: [
      {
        id: '16',
        name: 'Обновление ПО',
        price: '5 000 ₽',
        description: 'Обновление программного обеспечения до новейшей версии',
        popular: true
      },
      {
        id: '17',
        name: 'Разблокировка функций',
        price: 'от 8 000 ₽',
        description: 'Активация дополнительных функций'
      },
      {
        id: '18',
        name: 'Устранение ошибок ПО',
        price: 'от 3 000 ₽',
        description: 'Диагностика и исправление программных ошибок'
      },
      {
        id: '19',
        name: 'Настройка системы ADAS',
        price: '7 000 ₽',
        description: 'Настройка систем помощи водителю'
      },
      {
        id: '20',
        name: 'Кастомизация интерфейса',
        price: 'от 3 500 ₽',
        description: 'Персонализация пользовательского интерфейса'
      }
    ]
  },
  {
    id: 'service',
    title: 'Техническое обслуживание',
    items: [
      {
        id: '21',
        name: 'ТО базовое',
        price: '7 000 ₽',
        description: 'Базовый комплекс технического обслуживания',
        popular: true
      },
      {
        id: '22',
        name: 'ТО расширенное',
        price: '15 000 ₽',
        description: 'Расширенный комплекс обслуживания с проверкой всех систем'
      },
      {
        id: '23',
        name: 'Замена фильтров салона',
        price: '1 500 ₽',
        description: 'Замена воздушных фильтров салона'
      },
      {
        id: '24',
        name: 'Обслуживание кондиционера',
        price: 'от 3 000 ₽',
        description: 'Обслуживание системы кондиционирования'
      },
      {
        id: '25',
        name: 'Проверка и регулировка подвески',
        price: '4 000 ₽',
        description: 'Диагностика и регулировка подвески'
      }
    ]
  }
];

const Pricing = () => {
  const [activeCategory, setActiveCategory] = useState<string>(priceData[0].id)
  
  useEffect(() => {
    document.title = 'Цены на услуги - ЭлектроСервис'
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <>
      {/* Шапка страницы */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-bg-secondary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Цены на обслуживание электромобилей
            </h1>
            <p className="text-text-secondary text-lg md:text-xl">
              Прозрачная система ценообразования без скрытых платежей.
              Фиксированные цены на стандартные услуги и индивидуальный расчет для сложных работ.
            </p>
          </div>
        </div>
      </section>
      
      {/* Основное содержимое */}
      <section className="py-16">
        <div className="container">
          {/* Табы с категориями */}
          <div className="mb-12 overflow-x-auto hide-scrollbar">
            <div className="flex space-x-2 min-w-max mx-auto justify-center">
              {priceData.map((category) => (
                <button
                  key={category.id}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-accent-blue to-accent-green text-text-primary shadow-neon'
                      : 'bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary hover:border-accent-blue/80'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
          
          {/* Таблица цен */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-bg-secondary/50">
                  <tr>
                    <th className="text-left py-4 px-6 font-bold">Услуга</th>
                    <th className="text-center py-4 px-6 font-bold w-40">Цена</th>
                    <th className="text-left py-4 px-6 font-bold">Описание</th>
                    <th className="text-center py-4 px-6 font-bold w-32">Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {priceData.find(cat => cat.id === activeCategory)?.items.map((item, index) => (
                    <motion.tr 
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className={`border-t border-white/5 ${item.popular ? 'bg-accent-blue/5' : ''}`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          {item.popular && (
                            <span className="bg-accent-blue text-text-primary text-xs px-2 py-1 rounded-full mr-2">
                              Популярно
                            </span>
                          )}
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="font-bold text-accent-blue">{item.price}</span>
                      </td>
                      <td className="py-4 px-6 text-text-secondary">
                        {item.description}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <Link 
                          to="/contacts#form" 
                          className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary text-sm font-semibold transition-all duration-300 hover:border-accent-blue/80 hover:shadow-neon"
                        >
                          Заказать
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          
          {/* Дополнительная информация */}
          <div className="mt-12 p-6 glass-card rounded-xl bg-gradient-to-r from-accent-blue/5 to-accent-green/5">
            <h3 className="text-xl font-bold mb-4">Примечания к ценам</h3>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-accent-green mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Указанные цены действительны на текущий момент и могут изменяться в зависимости от модели автомобиля.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-accent-green mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>В стоимость не включена цена запчастей, которые могут потребоваться для ремонта.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-accent-green mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Для получения точной стоимости сложных работ необходима предварительная диагностика.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-accent-green mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>При выполнении нескольких услуг одновременно предоставляется скидка до 15%.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-accent-green mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Выезд специалиста оплачивается отдельно и зависит от расстояния.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Блок с призывом к действию */}
      <section className="py-16 bg-bg-secondary">
        <div className="container">
          <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                Нужны особые условия или индивидуальный расчет?
              </h2>
              <p className="text-text-secondary text-lg mb-8 max-w-3xl mx-auto">
                Свяжитесь с нами для получения индивидуального коммерческого предложения или запишитесь 
                на бесплатную консультацию со специалистом.
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
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Pricing 