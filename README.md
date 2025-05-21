# АвтосервисЛюбань

Сайт для сервиса электромобилей с темной темой, разработанный на React, TypeScript и Tailwind CSS.

## Структура папок для изображений

Для хранения и организации изображений на сайте используйте следующую структуру папок в директории `/public/images/`:

- `/hero/` - изображения для главного слайдера на главной странице
  - Рекомендуемый размер: 1920x1080px
  - Формат: JPG и WebP (две версии одного изображения)
  - Примеры файлов: `slide1.jpg`, `slide1.webp`, `slide2.jpg`, `slide2.webp`

- `/offers/` - изображения для слайдера спецпредложений
  - Рекомендуемый размер: 800x600px
  - Формат: JPG и WebP
  - Примеры файлов: `diagnostics.jpg`, `diagnostics.webp`, `software.jpg`, `software.webp`

- `/brands/` - логотипы брендов электромобилей
  - Рекомендуемый размер: 200x200px
  - Формат: PNG или SVG
  - Названия файлов должны соответствовать названиям брендов (например, `tesla.svg`, `nissan.svg`)

- `/services/` - изображения для страницы услуг
  - Рекомендуемый размер: 600x400px
  - Формат: JPG и WebP

- `/team/` - фотографии команды сервиса
  - Рекомендуемый размер: 400x400px
  - Формат: JPG и WebP

- `/blog/` - изображения для блога
  - Рекомендуемый размер: 1200x800px для заглавных изображений
  - Формат: JPG и WebP

- `/logo/` - логотипы и фирменная символика компании
  - Формат: SVG или PNG

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
git clone https://github.com/NickTolstoy/new_project.git
cd new_project

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшн
npm run build

# Предпросмотр сборки
npm run preview
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
