/**
 * Скрипт для настройки базы данных
 * 
 * Использование:
 * node setup-db.js 
 * 
 * Переменные окружения:
 * DB_HOST - хост базы данных (по умолчанию: localhost)
 * DB_USER - имя пользователя (по умолчанию: root)
 * DB_PASSWORD - пароль (по умолчанию: пустая строка)
 * DB_NAME - имя базы данных (по умолчанию: autoservice_db)
 */

import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Конфигурация подключения
const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true
};

async function setupDatabase() {
  let connection;

  try {
    console.log('Настройка базы данных...');
    console.log('Подключение к MySQL...');
    
    // Подключение к MySQL
    connection = await mysql.createConnection(config);
    console.log('Подключено к MySQL!');
    
    // Чтение SQL файла
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    console.log(`Чтение файла схемы: ${schemaPath}`);
    
    const schemaSql = await fs.readFile(schemaPath, 'utf8');
    
    // Выполнение SQL запросов
    console.log('Выполнение SQL-скрипта...');
    await connection.query(schemaSql);
    console.log('SQL-скрипт успешно выполнен!');
    
    // Проверка подключения к созданной базе данных
    const dbName = process.env.DB_NAME || 'autoservice_db';
    await connection.query(`USE ${dbName}`);
    
    console.log(`Подключение к базе данных ${dbName}...`);
    const [rows] = await connection.query('SHOW TABLES');
    
    console.log(`Создано таблиц: ${rows.length}`);
    console.log('Список таблиц:');
    
    // Вывод списка созданных таблиц
    rows.forEach((row) => {
      const tableName = row[`Tables_in_${dbName}`];
      console.log(`- ${tableName}`);
    });
    
    console.log('\nБаза данных успешно настроена!');
    console.log('\nРекомендации по использованию:');
    console.log('1. Запустите сервер: npm run server');
    console.log('2. Отправляйте запросы к API: http://localhost:5000/api');
    
  } catch (error) {
    console.error('Ошибка при настройке базы данных:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Соединение с MySQL закрыто');
    }
  }
}

setupDatabase(); 