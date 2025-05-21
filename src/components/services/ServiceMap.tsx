import React from 'react'
import { motion } from 'framer-motion'

interface ServiceArea {
  id: string;
  name: string;
  description: string;
  coords: string; // SVG координаты для полигона
  fillColor: string;
}

interface ServiceMapProps {
  title?: string;
  description?: string;
}

// Данные о зонах обслуживания
const serviceAreas: ServiceArea[] = [
  {
    id: 'zone1',
    name: 'Центральный район',
    description: 'Приоритетная зона обслуживания. Выезд в течение 1-2 часов. Ремонт на месте или эвакуация в сервис.',
    coords: '200,60 250,90 230,160 180,170 150,120',
    fillColor: 'rgba(0, 183, 255, 0.4)'
  },
  {
    id: 'zone2',
    name: 'Северный район',
    description: 'Стандартная зона обслуживания. Выезд в течение 2-3 часов в рабочее время.',
    coords: '200,20 250,50 250,90 200,60 150,70 150,30',
    fillColor: 'rgba(0, 183, 255, 0.25)'
  },
  {
    id: 'zone3',
    name: 'Западный район',
    description: 'Стандартная зона обслуживания. Выезд в течение 2-3 часов в рабочее время.',
    coords: '100,70 150,30 150,70 150,120 100,150 80,120',
    fillColor: 'rgba(0, 183, 255, 0.25)'
  },
  {
    id: 'zone4',
    name: 'Восточный район',
    description: 'Стандартная зона обслуживания. Выезд в течение 2-3 часов в рабочее время.',
    coords: '250,50 300,30 320,90 280,130 250,90',
    fillColor: 'rgba(0, 183, 255, 0.25)'
  },
  {
    id: 'zone5',
    name: 'Южный район',
    description: 'Стандартная зона обслуживания. Выезд в течение 2-3 часов в рабочее время.',
    coords: '180,170 230,160 280,130 320,170 250,220 180,200',
    fillColor: 'rgba(0, 183, 255, 0.25)'
  },
  {
    id: 'zone6',
    name: 'Загородная зона',
    description: 'Расширенная зона обслуживания. Выезд по предварительной записи.',
    coords: '100,150 180,170 180,200 250,220 320,170 350,220 350,280 290,320 180,320 70,280 50,200 80,120',
    fillColor: 'rgba(0, 227, 140, 0.2)'
  }
];

const ServiceMap: React.FC<ServiceMapProps> = ({ 
  title = 'Зоны обслуживания',
  description = 'Выезжаем на место поломки или проводим обслуживание в нашем автосервисе. Работаем по всей Москве и области с оперативным выездом.'
}) => {
  const [selectedArea, setSelectedArea] = React.useState<string | null>(null);
  
  const handleMouseEnter = (areaId: string) => {
    setSelectedArea(areaId);
  };
  
  const handleMouseLeave = () => {
    setSelectedArea(null);
  };
  
  return (
    <div className="glass-card p-8 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-text-secondary mb-8">{description}</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Карта */}
        <div className="relative max-w-full mx-auto">
          <svg 
            viewBox="0 0 400 350" 
            className="w-full h-auto border border-white/10 rounded-lg bg-bg-secondary/30"
          >
            {/* Фоновая подложка */}
            <rect x="0" y="0" width="400" height="350" fill="rgba(0,0,0,0.1)" />
            
            {/* Отрисовка зон обслуживания */}
            {serviceAreas.map((area) => (
              <motion.polygon
                key={area.id}
                points={area.coords}
                fill={area.fillColor}
                stroke={selectedArea === area.id ? "#00E38C" : "rgba(255,255,255,0.3)"}
                strokeWidth={selectedArea === area.id ? "2" : "1"}
                initial={{ opacity: 0.5 }}
                animate={{ 
                  opacity: selectedArea === area.id ? 0.9 : 0.5,
                  scale: selectedArea === area.id ? 1.01 : 1
                }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => handleMouseEnter(area.id)}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: 'pointer' }}
              />
            ))}
            
            {/* Центральная точка - местоположение сервиса */}
            <motion.circle
              cx="200"
              cy="120"
              r="6"
              fill="#00E38C"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Кольцо вокруг центральной точки */}
            <motion.circle
              cx="200"
              cy="120"
              r="10"
              fill="none"
              stroke="#00E38C"
              strokeWidth="2"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Названия районов */}
            <text x="200" y="120" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">
              АвтосервисЛюбань
            </text>
          </svg>
        </div>
        
        {/* Информация о зонах обслуживания */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Информация о зонах обслуживания</h3>
          
          <div className="space-y-4">
            {serviceAreas.map((area) => (
              <motion.div
                key={area.id}
                className={`p-4 rounded-lg transition-all duration-300 ${
                  selectedArea === area.id 
                    ? 'bg-bg-secondary/80 shadow-neon' 
                    : 'bg-bg-secondary/30 hover:bg-bg-secondary/50'
                }`}
                onMouseEnter={() => handleMouseEnter(area.id)}
                onMouseLeave={handleMouseLeave}
                whileHover={{ x: 5 }}
                style={{ cursor: 'pointer' }}
              >
                <h4 className="font-semibold mb-1 flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ background: area.fillColor.replace(/[^,]+\)/, '1)') }}
                  ></div>
                  {area.name}
                </h4>
                <p className="text-text-secondary text-sm">{area.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-bg-secondary/30 rounded-lg">
            <p className="text-sm text-text-secondary">
              <span className="font-semibold text-accent-green">Примечание:</span> Точные сроки выезда могут различаться в зависимости от загруженности сервиса и дорожной ситуации. Для удаленных районов рекомендуется предварительная запись.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceMap 