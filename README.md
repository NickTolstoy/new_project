# Сайт сервиса электромобилей

Корпоративный сайт компании, специализирующейся на обслуживании и ремонте электромобилей в России и СНГ. Адаптивный дизайн с темной темой и современными UI-компонентами.

## Технологический стек

- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer-motion
- **UI-компоненты**: Headless UI, Heroicons, Simple-Icons
- **Сборка**: Vite
- **Контейнеризация**: Docker, Docker Compose
- **CI/CD**: GitHub Actions
- **Веб-сервер**: Nginx + Certbot (для SSL)
- **API (опционально)**: Express.js + Prisma + PostgreSQL

## Локальная разработка

### Предварительные требования

- Node.js 18 LTS
- npm или yarn

### Установка и запуск

```bash
# Клонирование репозитория
git clone https://github.com/your-username/ev-service-site.git
cd ev-service-site

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev
```

### Доступные скрипты

- `npm run dev` - запуск в режиме разработки
- `npm run build` - сборка проекта
- `npm run preview` - предварительный просмотр сборки
- `npm run lint` - проверка кода линтером
- `npm run format` - форматирование кода
- `npm run test` - запуск тестов

## Структура проекта

```
├── .github/workflows/   # CI/CD конфигурация
├── public/              # Статические файлы
├── src/                 # Исходный код
│   ├── assets/          # Графика, иконки
│   ├── components/      # Компоненты React
│   ├── layouts/         # Шаблоны страниц
│   ├── pages/           # Страницы
│   └── styles/          # CSS-стили
├── docker-compose.yml   # Настройка Docker Compose
├── Dockerfile           # Инструкции для сборки образа
└── nginx.conf           # Конфигурация Nginx
```

## Переменные окружения

Создайте файл `.env` в корне проекта со следующими переменными:

```
# База данных
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ev_service"

# API
API_SECRET="your-api-secret"

# Окружение
NODE_ENV="development"
```

## Деплой

### С использованием Docker (рекомендуется)

```bash
# Сборка и запуск контейнеров
docker-compose up -d
```

### На VPS/виртуальный хостинг

1. Настройте Nginx согласно `nginx.conf`
2. Установите certbot для SSL-сертификата
3. Клонируйте репозиторий и запустите:

```bash
npm install
npm run build
```

4. Настройте автоматическое обновление через хуки GitHub или CI/CD

## Поддерживаемые браузеры

- Chrome/Edge/Opera (последние 2 версии)
- Firefox (последние 2 версии)
- Safari (последние 2 версии)

## Лицензия

Все права защищены, 2024. 