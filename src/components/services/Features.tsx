import React from 'react'
import { motion } from 'framer-motion'

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface FeaturesProps {
  title?: string;
  description?: string;
}

// Данные о преимуществах
const features: Feature[] = [
  {
    id: '1',
    title: 'Сертифицированные специалисты',
    description: 'Все наши инженеры прошли специальное обучение и имеют сертификаты производителей электромобилей.',
    icon: 'certificate'
  },
  {
    id: '2',
    title: 'Современное оборудование',
    description: 'Используем специализированное диагностическое оборудование и фирменные инструменты для всех марок.',
    icon: 'tools'
  },
  {
    id: '3',
    title: 'Гарантия на работы',
    description: 'Предоставляем гарантию на все виды работ от 6 месяцев до 2 лет в зависимости от типа обслуживания.',
    icon: 'shield'
  },
  {
    id: '4',
    title: 'Оригинальные запчасти',
    description: 'Работаем только с оригинальными запчастями и проверенными аналогами от надежных производителей.',
    icon: 'parts'
  },
  {
    id: '5',
    title: 'Прозрачное ценообразование',
    description: 'Никаких скрытых платежей. Стоимость обслуживания согласовывается до начала работ.',
    icon: 'money'
  },
  {
    id: '6',
    title: 'Оперативное обслуживание',
    description: 'Минимальные сроки диагностики и ремонта благодаря эффективной организации рабочих процессов.',
    icon: 'clock'
  }
];

// Компонент иконок
const FeatureIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'certificate':
      return (
        <svg className="w-10 h-10 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case 'tools':
      return (
        <svg className="w-10 h-10 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 'shield':
      return (
        <svg className="w-10 h-10 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case 'parts':
      return (
        <svg className="w-10 h-10 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      );
    case 'money':
      return (
        <svg className="w-10 h-10 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'clock':
      return (
        <svg className="w-10 h-10 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return null;
  }
};

// Анимация для контейнера
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Анимация для элементов
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Features: React.FC<FeaturesProps> = ({ 
  title = 'Наши преимущества',
  description = 'Мы стремимся обеспечить наилучший сервис и заботу о вашем электромобиле'
}) => {
  return (
    <div className="glass-card p-8 rounded-xl">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-text-secondary max-w-3xl mx-auto">{description}</p>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            variants={item}
            className="flex flex-col items-center text-center"
          >
            <div className="bg-bg-secondary/50 rounded-full w-20 h-20 flex items-center justify-center mb-4">
              <FeatureIcon type={feature.icon} />
            </div>
            
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-text-secondary">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Features 