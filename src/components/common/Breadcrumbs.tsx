import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Тип структуры для маршрутов с человекочитаемыми названиями
type RouteMap = {
  [key: string]: {
    name: string;
    parent?: string;
  };
};

// Карта маршрутов сайта с названиями для хлебных крошек
const routes: RouteMap = {
  '/': { name: 'Главная' },
  '/services': { name: 'Услуги', parent: '/' },
  '/services/diagnostic': { name: 'Диагностика электромобилей', parent: '/services' },
  '/services/battery-repair': { name: 'Ремонт батарей', parent: '/services' },
  '/services/motor-repair': { name: 'Ремонт электродвигателя', parent: '/services' },
  '/services/software-update': { name: 'Обновление ПО', parent: '/services' },
  '/services/maintenance': { name: 'Техническое обслуживание', parent: '/services' },
  '/pricing': { name: 'Цены', parent: '/' },
  '/about': { name: 'О нас', parent: '/' },
  '/reviews': { name: 'Отзывы', parent: '/' },
  '/faq': { name: 'FAQ', parent: '/' },
  '/blog': { name: 'Блог', parent: '/' },
  '/contacts': { name: 'Контакты', parent: '/' },
};

// Функция для получения пути без параметров
const getPathWithoutParams = (path: string): string => {
  const segmentMatch = /^(\/[^\/]+)/.exec(path);
  return segmentMatch ? segmentMatch[1] : path;
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  
  // Если мы на главной странице, не отображаем хлебные крошки
  if (location.pathname === '/') {
    return null;
  }
  
  // Получаем компоненты пути
  const pathnames = location.pathname.split('/').filter(x => x);
  
  // Строим путь хлебных крошек
  let breadcrumbs = [{ name: 'Главная', path: '/' }];
  let currentPath = '';
  
  // Для каждого сегмента пути ищем соответствующее название в маршрутах
  for (let i = 0; i < pathnames.length; i++) {
    currentPath += `/${pathnames[i]}`;
    
    // Ищем точное соответствие в маршрутах
    if (routes[currentPath]) {
      breadcrumbs.push({
        name: routes[currentPath].name,
        path: currentPath
      });
    } 
    // Если это страница деталей (динамический маршрут)
    else if (i === 1 && pathnames[0] === 'services') {
      // Для услуг с динамическим slug
      breadcrumbs.push({
        name: decodeURIComponent(pathnames[i].replace(/-/g, ' ')),
        path: currentPath
      });
    } 
    else if (i === 1 && pathnames[0] === 'blog') {
      // Для блога с динамическим slug
      breadcrumbs.push({
        name: 'Статья',
        path: currentPath
      });
    }
    else {
      // Для других страниц можем использовать сегмент пути как имя
      breadcrumbs.push({
        name: pathnames[i].charAt(0).toUpperCase() + pathnames[i].slice(1).replace(/-/g, ' '),
        path: currentPath
      });
    }
  }
  
  return (
    <nav className="container mx-auto px-4 py-3 text-sm">
      <ol className="flex flex-wrap items-center">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li key={crumb.path} className="flex items-center">
              {index > 0 && (
                <svg 
                  className="w-3 h-3 mx-2 text-white/40" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              )}
              
              {isLast ? (
                <span className="text-accent-blue/90 font-medium">{crumb.name}</span>
              ) : (
                <Link 
                  to={crumb.path} 
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs; 