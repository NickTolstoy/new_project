import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface PriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
  category: string;
  popular?: boolean;
}

interface PriceListProps {
  initialCategory?: string;
}

const PriceList: React.FC<PriceListProps> = ({ initialCategory = 'all' }) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  
  // Все категории услуг
  const categories = [
    { id: 'all', name: 'Все услуги' },
    { id: 'diagnostics', name: 'Диагностика' },
    { id: 'battery', name: 'Батарея' },
    { id: 'motor', name: 'Двигатель' },
    { id: 'software', name: 'Программное обеспечение' },
    { id: 'service', name: 'Техобслуживание' }
  ];
  
  // Данные о ценах на услуги
  const priceItems: PriceItem[] = [
    {
      id: '1',
      name: 'Компьютерная диагностика',
      price: '3 500 ₽',
      description: 'Полная диагностика электронных систем с выдачей отчета',
      category: 'diagnostics',
      popular: true
    },
    {
      id: '2',
      name: 'Диагностика высоковольтной батареи',
      price: '5 000 ₽',
      description: 'Проверка состояния и емкости батареи',
      category: 'diagnostics'
    },
    {
      id: '3',
      name: 'Диагностика электродвигателя',
      price: '4 000 ₽',
      description: 'Проверка работоспособности и параметров мотора',
      category: 'diagnostics'
    },
    {
      id: '4',
      name: 'Ремонт высоковольтной батареи',
      price: 'от 15 000 ₽',
      description: 'Ремонт и восстановление работоспособности батареи',
      category: 'battery',
      popular: true
    },
    {
      id: '5',
      name: 'Замена модуля батареи',
      price: 'от 10 000 ₽',
      description: 'Замена отдельного модуля/ячейки высоковольтной батареи',
      category: 'battery'
    },
    {
      id: '6',
      name: 'Балансировка ячеек батареи',
      price: '8 000 ₽',
      description: 'Выравнивание заряда между ячейками для увеличения ресурса',
      category: 'battery'
    },
    {
      id: '7',
      name: 'Ремонт электродвигателя',
      price: 'от 20 000 ₽',
      description: 'Ремонт тягового электродвигателя',
      category: 'motor',
      popular: true
    },
    {
      id: '8',
      name: 'Замена подшипников мотора',
      price: 'от 12 000 ₽',
      description: 'Замена вышедших из строя подшипников',
      category: 'motor'
    },
    {
      id: '9',
      name: 'Ремонт инвертора',
      price: 'от 15 000 ₽',
      description: 'Ремонт силового преобразователя',
      category: 'motor'
    },
    {
      id: '10',
      name: 'Обновление ПО',
      price: '5 000 ₽',
      description: 'Обновление программного обеспечения до новейшей версии',
      category: 'software',
      popular: true
    },
    {
      id: '11',
      name: 'Разблокировка функций',
      price: 'от 8 000 ₽',
      description: 'Активация дополнительных функций',
      category: 'software'
    },
    {
      id: '12',
      name: 'Устранение ошибок ПО',
      price: 'от 3 000 ₽',
      description: 'Диагностика и исправление программных ошибок',
      category: 'software'
    },
    {
      id: '13',
      name: 'ТО базовое',
      price: '7 000 ₽',
      description: 'Базовый комплекс технического обслуживания',
      category: 'service',
      popular: true
    },
    {
      id: '14',
      name: 'ТО расширенное',
      price: '15 000 ₽',
      description: 'Расширенный комплекс обслуживания с проверкой всех систем',
      category: 'service'
    },
    {
      id: '15',
      name: 'Замена фильтров салона',
      price: '1 500 ₽',
      description: 'Замена воздушных фильтров салона',
      category: 'service'
    }
  ];
  
  // Фильтрация элементов по активной категории
  const filteredItems = activeCategory === 'all' 
    ? priceItems 
    : priceItems.filter(item => item.category === activeCategory);
  
  // Анимация для элементов списка
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div>
      {/* Фильтр категорий */}
      <div className="mb-8 overflow-x-auto hide-scrollbar">
        <div className="flex space-x-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-accent-blue to-accent-green text-text-primary shadow-neon'
                  : 'bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary hover:border-accent-blue/80'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Список цен */}
      <motion.ul
        className="space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
        key={activeCategory} // Ключ для пересоздания анимации при смене категории
      >
        {filteredItems.map((priceItem) => (
          <motion.li
            key={priceItem.id}
            variants={item}
            className={`glass-card p-5 rounded-xl transition-all duration-300 hover:shadow-neon ${
              priceItem.popular ? 'border border-accent-blue/30' : ''
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center">
                  {priceItem.popular && (
                    <span className="bg-accent-blue/20 text-accent-blue text-xs px-2 py-1 rounded-full mr-2">
                      Популярно
                    </span>
                  )}
                  <h3 className="font-bold">{priceItem.name}</h3>
                </div>
                {priceItem.description && (
                  <p className="text-text-secondary text-sm mt-1">
                    {priceItem.description}
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <span className="font-bold text-accent-blue text-xl whitespace-nowrap">
                  {priceItem.price}
                </span>
                <Link 
                  to="/contacts#form" 
                  className="px-4 py-2 rounded-full text-sm bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary font-semibold transition-all duration-300 hover:border-accent-blue/80 hover:shadow-neon whitespace-nowrap"
                >
                  Заказать
                </Link>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
      
      {/* Сообщение, если нет элементов */}
      {filteredItems.length === 0 && (
        <div className="text-center py-8">
          <p className="text-text-secondary">
            В выбранной категории нет доступных услуг.
          </p>
        </div>
      )}
    </div>
  )
}

export default PriceList 