import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

const FAQ: React.FC<FAQProps> = ({ items, title = 'Часто задаваемые вопросы' }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const toggleItem = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };
  
  return (
    <div className="glass-card p-8 rounded-xl">
      <h2 className="text-2xl font-bold mb-8">{title}</h2>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div 
            key={item.id} 
            className={`border border-white/10 rounded-xl transition-all duration-300 overflow-hidden ${
              activeId === item.id ? 'shadow-neon border-accent-blue/30' : ''
            }`}
          >
            <button
              className="w-full text-left p-5 flex items-center justify-between focus:outline-none"
              onClick={() => toggleItem(item.id)}
              aria-expanded={activeId === item.id}
            >
              <h3 className="text-lg font-semibold pr-4">{item.question}</h3>
              <div className="flex-shrink-0">
                <svg 
                  className={`w-5 h-5 transition-transform duration-300 ${
                    activeId === item.id ? 'transform rotate-180 text-accent-blue' : 'text-text-secondary'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            <AnimatePresence>
              {activeId === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-5 pb-5 pt-0 border-t border-white/10">
                    <p className="text-text-secondary">{item.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

// Примеры часто задаваемых вопросов (для демонстрации компонента)
export const faqItems: FAQItem[] = [
  {
    id: '1',
    question: 'Какие марки электромобилей вы обслуживаете?',
    answer: 'Мы обслуживаем все популярные марки электромобилей, включая Tesla, Nissan, BMW, Audi, Jaguar, BYD, Porsche, NIO, Mercedes-Benz, Volkswagen, Hyundai, Kia и другие. Наши специалисты регулярно проходят обучение и имеют опыт работы с моделями всех ведущих производителей.'
  },
  {
    id: '2',
    question: 'Сколько времени занимает диагностика электромобиля?',
    answer: 'Время диагностики зависит от модели автомобиля и сложности проблемы. Базовая диагностика обычно занимает 1-2 часа. Полная комплексная диагностика может занять до 4 часов. По результатам вы получите подробный отчет о состоянии автомобиля и рекомендации по устранению выявленных проблем.'
  },
  {
    id: '3',
    question: 'Предоставляете ли вы гарантию на выполненные работы?',
    answer: 'Да, мы предоставляем гарантию на все виды выполненных работ. Срок гарантии зависит от типа обслуживания: от 6 месяцев до 2 лет. Детали гарантийных обязательств фиксируются в договоре и подтверждаются гарантийным талоном.'
  },
  {
    id: '4',
    question: 'Можно ли отремонтировать высоковольтную батарею вместо замены?',
    answer: 'В большинстве случаев да. Мы специализируемся на восстановлении и ремонте высоковольтных батарей. Часто проблема связана с отдельными модулями или ячейками, которые можно заменить без замены всей батареи. Это значительно снижает стоимость ремонта. После диагностики мы предложим наиболее оптимальное и экономичное решение.'
  },
  {
    id: '5',
    question: 'Как часто нужно обслуживать электромобиль?',
    answer: 'Рекомендуемая периодичность технического обслуживания для большинства электромобилей — раз в год или каждые 15 000 км пробега (что наступит раньше). Однако эти интервалы могут отличаться в зависимости от модели и рекомендаций производителя. При активной эксплуатации рекомендуется проводить промежуточные проверки каждые 6 месяцев.'
  },
  {
    id: '6',
    question: 'Можно ли обновить программное обеспечение старых моделей электромобилей?',
    answer: 'Да, для большинства моделей электромобилей возможно обновление программного обеспечения, включая достаточно старые модели. Мы используем как официальные обновления от производителей, так и проверенные альтернативные решения, которые могут улучшить производительность и расширить функциональность автомобиля.'
  },
  {
    id: '7',
    question: 'Нужно ли мне присутствовать при обслуживании?',
    answer: 'Это необязательно, но при желании вы можете присутствовать при выполнении работ. После завершения диагностики или обслуживания наши специалисты подробно расскажут о проделанной работе, выявленных проблемах и дадут рекомендации по дальнейшей эксплуатации автомобиля.'
  }
];

export default FAQ 