import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import apiRoutes from './src/server/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

// Настройка CORS с детальными опциями
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:5173', 'http://localhost:8000'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Парсинг JSON и URL-encoded тел запросов
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API маршруты
app.use('/api', apiRoutes);

// Раздача статических файлов из директории dist
app.use(express.static(join(__dirname, 'dist')));

// Маршрут для админки
app.get('/admin', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'admin.html'));
});

// Для всех остальных запросов возвращаем index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
}); 