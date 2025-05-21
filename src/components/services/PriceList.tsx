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
    { id: 'maintenance', name: 'Техобслуживание' },
    { id: 'brakes', name: 'Тормозная система' },
    { id: 'engine', name: 'Двигатель и трансмиссия' },
    { id: 'bodywork', name: 'Кузовные работы' },
    { id: 'electrical', name: 'Электрика' }
  ];
  
  // Данные о ценах на услуги
  const priceItems: PriceItem[] = [
    {
      id: '1',
      name: 'Замена масляного фильтра',
      price: '8 000 ₽',
      description: 'Диагностика и замена масляного фильтра с использованием качественных материалов',
      category: 'maintenance',
      popular: true
    },
    {
      id: '2',
      name: 'Замена масла в заднем мосту',
      price: '4 000 ₽',
      description: 'Замена трансмиссионного масла в заднем мосту электромобиля',
      category: 'engine'
    },
    {
      id: '3',
      name: 'Замена свечи зажигания',
      price: '4 000 ₽',
      description: 'Диагностика и замена свечей зажигания для гибридных моделей',
      category: 'engine'
    },
    {
      id: '4',
      name: 'Сопоставление смарт-ключа',
      price: '20 000 ₽',
      description: 'Программирование и сопоставление нового смарт-ключа с системой электромобиля',
      category: 'electrical',
      popular: true
    },
    {
      id: '5',
      name: 'Замена задних тормозных колодок',
      price: '6 000 ₽',
      description: 'Замена задних тормозных колодок с проверкой тормозной системы',
      category: 'brakes'
    },
    {
      id: '6',
      name: 'Замена передних тормозных колодок',
      price: '4 000 ₽',
      description: 'Замена передних тормозных колодок с диагностикой тормозной системы',
      category: 'brakes',
      popular: true
    },
    {
      id: '7',
      name: 'Компьютерная диагностика',
      price: '4 000 ₽',
      description: 'Полная компьютерная диагностика всех систем электромобиля',
      category: 'diagnostics',
      popular: true
    },
    {
      id: '8',
      name: 'Замена масла в редукторе переднего моста',
      price: '10 000 ₽',
      description: 'Замена трансмиссионного масла в редукторе переднего моста',
      category: 'engine'
    },
    {
      id: '9',
      name: 'Замена датчика давления в шинах',
      price: '10 000 ₽',
      description: 'Замена и программирование датчиков давления в шинах (TPMS)',
      category: 'electrical'
    },
    {
      id: '10',
      name: 'Снятие и сборка переднего бампера',
      price: '8 000 ₽',
      description: 'Демонтаж, ремонт и установка переднего бампера',
      category: 'bodywork'
    },
    {
      id: '11',
      name: 'Замена аккумулятора низкого напряжения',
      price: '5 000 ₽',
      description: 'Диагностика и замена 12В аккумулятора электромобиля',
      category: 'electrical'
    },
    {
      id: '12',
      name: 'Замена тормозной жидкости',
      price: '8 000 ₽',
      description: 'Полная замена тормозной жидкости с прокачкой системы',
      category: 'brakes'
    },
    {
      id: '13',
      name: 'Замена антифриза',
      price: '8 000 ₽',
      description: 'Замена охлаждающей жидкости в системе термоменеджмента',
      category: 'maintenance'
    },
    {
      id: '14',
      name: 'Разборка и сборка силового аккумуляторного блока',
      price: '30 000 ₽',
      description: 'Полная разборка, диагностика и сборка высоковольтной батареи',
      category: 'electrical',
      popular: true
    },
    {
      id: '15',
      name: 'Замена трансмиссионного масла',
      price: '10 000 ₽',
      description: 'Замена трансмиссионного масла в редукторе электродвигателя',
      category: 'engine'
    },
    {
      id: '16',
      name: 'Удаление и добавление хладагента кондиционера',
      price: '10 000 ₽',
      description: 'Обслуживание системы кондиционирования с заменой хладагента',
      category: 'maintenance'
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